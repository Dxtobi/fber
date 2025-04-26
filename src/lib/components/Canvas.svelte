<script>
  //@ts-nocheck
  import { formStore, updateElement, selectElement, deleteElement, selectedElement } from '$lib/stores/formStore';
  import { ELEMENT_TYPES } from '../utils/elementTypes';
  import TextInput from './FormElements/TextInput.svelte';
  import Button from './FormElements/Button.svelte';
  import VotingComponent from './VotingComponent.svelte';
  import TestComponent from './TestComponent.svelte';
  import TextComponent from './FormElements/TextComponent.svelte';
  import FormPreview from './FormPreview.svelte';
  import DatePicker from "./FormElements/DatePicker.svelte"

  import { onMount, onDestroy } from 'svelte';
	import FileUpload from './FormElements/FileUpload.svelte';
	import MultiStepContainer from './FormElements/MultiStepContainer.svelte';

  // Component Map
  const components = {
    TextInput,
    Button,
    VotingComponent,
    TestComponent,
    TextComponent,
    DatePicker,
    FileUpload,
    MultiStepContainer,
  };

  // Editor State
  export let gridSize = 40; // Grid size in pixels
  let viewMode = 'editor'; // 'editor' or 'preview'
  let canvasRef;
  let canvasBounds = { width: 0, height: 0, left: 0, top: 0 }; // Pixel dimensions and position
  let draggingInfo = null; // { elementId: number, offset: {x: number, y: number}, elementPixelW: number, elementPixelH: number } | null
  let resizeObserver;

  // Helper Functions
  function snapToGrid(value) {
    if (gridSize <= 0) return value;
    return Math.round(value / gridSize) * gridSize;
  }

  function isOccupied(targetPixelX, targetPixelY, elementIdToExclude) {
    const elementPixelW = gridSize;
    const elementPixelH = gridSize;
    const targetRight = targetPixelX + elementPixelW;
    const targetBottom = targetPixelY + elementPixelH;
    for (const el of $formStore.elements) {
      if (el.id === elementIdToExclude) continue;
      if (!el.position || typeof el.position.x !== 'number' || typeof el.position.y !== 'number') continue;
      const elPixelX = snapToGrid(el.position.x);
      const elPixelY = snapToGrid(el.position.y);
      const elRight = elPixelX + elementPixelW;
      const elBottom = elPixelY + elementPixelH;
      const horizontalOverlap = targetPixelX < elRight && targetRight > elPixelX;
      const verticalOverlap = targetPixelY < elBottom && targetBottom > elPixelY;
      if (horizontalOverlap && verticalOverlap) {
        return true;
      }
    }
    return false;
  }

  // Event Handlers
  function handlePointerDown(event, element) {
    if (viewMode !== 'editor') return;
    if (event.button !== 0 && event.pointerType === 'mouse') return;
    event.stopPropagation();
    selectElement(element.id);
    const pointerPosition = { x: event.clientX, y: event.clientY };
    const offset = {
      x: pointerPosition.x - canvasBounds.left - element.position.x,
      y: pointerPosition.y - canvasBounds.top - element.position.y,
    };
    const elementPixelW = gridSize;
    const elementPixelH = gridSize;
    draggingInfo = { elementId: element.id, offset, elementPixelW, elementPixelH };
    document.body.style.cursor = 'move';
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerUp);
  }

  function handlePointerMove(event) {
    if (!draggingInfo || viewMode !== 'editor') return;
    event.preventDefault();
    const { elementId, offset, elementPixelW, elementPixelH } = draggingInfo;
    const pointerPosition = { x: event.clientX, y: event.clientY };
    const rawPixelX = pointerPosition.x - canvasBounds.left - offset.x;
    const rawPixelY = pointerPosition.y - canvasBounds.top - offset.y;
    let snappedPixelX = snapToGrid(rawPixelX);
    let snappedPixelY = snapToGrid(rawPixelY);
    snappedPixelX = Math.max(0, Math.min(snappedPixelX, canvasBounds.width - elementPixelW));
    snappedPixelY = Math.max(0, Math.min(snappedPixelY, canvasBounds.height - elementPixelH));
    const currentElement = $formStore.elements.find(el => el.id === elementId);
    const currentX = currentElement ? snapToGrid(currentElement.position.x) : -Infinity;
    const currentY = currentElement ? snapToGrid(currentElement.position.y) : -Infinity;
    if (snappedPixelX !== currentX || snappedPixelY !== currentY) {
      if (!isOccupied(snappedPixelX, snappedPixelY, elementId)) {
        updateElement(elementId, {
          position: { x: snappedPixelX, y: snappedPixelY },
        });
      }
    }
  }

  function handlePointerUp(event) {
    if (!draggingInfo) return;
    draggingInfo = null;
    document.body.style.cursor = '';
    window.removeEventListener('pointermove', handlePointerMove);
    window.removeEventListener('pointerup', handlePointerUp);
    window.removeEventListener('pointercancel', handlePointerUp);
  }

  // Lifecycle & Resize
  function updateCanvasBounds() {
    const container = canvasRef;
    if (container) {
      const rect = container.getBoundingClientRect();
      canvasBounds = {
        width: container.offsetWidth,
        height: container.offsetHeight,
        left: rect.left,
        top: rect.top,
      };
    }
  }

  onMount(() => {
    const mainContainer = document.getElementById('editor-preview-container');
    if (mainContainer) {
      resizeObserver = new ResizeObserver(() => {
        updateCanvasBounds();
      });
      resizeObserver.observe(mainContainer);
      requestAnimationFrame(updateCanvasBounds);
    }
    return () => {
      if (resizeObserver && mainContainer) {
        resizeObserver.unobserve(mainContainer);
      }
      resizeObserver = null;
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);
      document.body.style.cursor = '';
    };
  });

  // Editor Element Style Calculation
  function getEditorElementStyle(element) {
    const elementPixelW = gridSize;
    const elementPixelH = gridSize;
    const posX = element.position?.x ?? 0;
    const posY = element.position?.y ?? 0;
    const snappedX = snapToGrid(posX);
    const snappedY = snapToGrid(posY);
    const clampedX = Math.max(0, Math.min(snappedX, (canvasBounds.width || Number.MAX_SAFE_INTEGER) - elementPixelW));
    const clampedY = Math.max(0, Math.min(snappedY, (canvasBounds.height || Number.MAX_SAFE_INTEGER) - elementPixelH));
    const isDragging = draggingInfo?.elementId === element.id;
    const isSelected = $formStore.selectedElementId === element.id;
    return `
      position: absolute;
      left: ${clampedX}px;
      top: ${clampedY}px;
      width: ${elementPixelW}px;
      height: ${elementPixelH}px;
      touch-action: none;
      border: 1px solid transparent;
      transition: transform 50ms ease-out, box-shadow 150ms ease-out, border-color 150ms ease-out;
      z-index: ${isDragging ? 30 : (isSelected ? 25 : 20)};
      ${isDragging ? 'box-shadow: 0 4px 8px rgba(0,0,0,0.2); transform: scale(1.02);' : ''}
      ${isSelected ? 'border-color: #3b82f6; border-width: 2px; margin: -1px;' : ''}
      cursor: move;
    `;
  }

 

</script>

<!-- Main Layout -->
<div class="flex flex-col h-full w-[90%] relative">
  <!-- View Mode Toggle -->
  <div class="flex justify-center p-2 border-b bg-gray-50 rounded-t-lg">
    <button
      class="px-4 py-1 text-sm rounded-l-md transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1"
      class:bg-blue-600={viewMode === 'editor'}
      class:text-white={viewMode === 'editor'}
      class:bg-white={viewMode !== 'editor'}
      class:text-gray-700={viewMode !== 'editor'}
      class:hover:bg-gray-100={viewMode !== 'editor'}
      class:border={viewMode !== 'editor'}
      class:border-r-0={viewMode !== 'editor'}
      on:click={() => viewMode = 'editor'}
    >
      Editor
    </button>
    <button
      class="px-4 py-1 text-sm rounded-r-md transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1"
      class:bg-blue-600={viewMode === 'preview'}
      class:text-white={viewMode === 'preview'}
      class:bg-white={viewMode !== 'preview'}
      class:text-gray-700={viewMode !== 'preview'}
      class:hover:bg-gray-100={viewMode !== 'preview'}
      class:border={viewMode !== 'preview'}
      on:click={() => viewMode = 'preview'}
    >
      Preview
    </button>
  </div>

  <!-- Container for Editor Canvas OR Preview Area -->
  <div id="editor-preview-container" class="flex-1 relative overflow-auto border-l border-r border-b border-gray-300 rounded-b-lg">
    {#if viewMode === 'editor'}
      <!-- EDITOR VIEW -->
      <div
        class="editor-canvas min-h-full min-w-full bg-gray-50 relative"
        bind:this={canvasRef}
        style="touch-action: none;"
        on:pointerdown={() => selectElement(null)}
      >
        <!-- Grid Visualization -->
        <div class="absolute inset-0 pointer-events-none z-0">
          <div
            class="absolute inset-0"
            style="
              background-size: {gridSize}px {gridSize}px;
              background-image: linear-gradient(to right, #e5e7eb 1px, transparent 1px),
                                linear-gradient(to bottom, #e5e7eb 1px, transparent 1px);
              background-position: -1px -1px;
            "
          ></div>
        </div>

        <!-- Draggable Elements -->
        {#each $formStore.elements as element (element.id)}
          {@const Comp = components[element.component]}
          {#if Comp}
            <div
              class="editor-element-wrapper hover:outline-1"
              style={getEditorElementStyle(element)}
              on:pointerdown|stopPropagation={(e) => handlePointerDown(e, element)}
              data-element-id={element.id}
              role="button"
              tabindex="0"
              aria-grabbed={draggingInfo?.elementId === element.id}
              title={`ID: ${element.id} Pos: (${element.position?.x ?? 'N/A'}, ${element.position?.y ?? 'N/A'})`}
            >
              <div class="w-full h-full pointer-events-none relative hover:outline-2 hover:outline-blue-300 hover:outline-offset-[-1px] border">
                <svelte:component
                  this={Comp}
                  {element}
                  props={element.props || {}}
                  styles={element.styles || {}}
                  isDisabled={true}
                  class="w-full h-full object-cover opacity-70"
                />
              </div>
            </div>
          {:else}
            <div style={getEditorElementStyle(element)} class="flex items-center justify-center bg-red-100 border border-red-400 text-xs text-red-700 p-1">
              Unknown: {element.component || 'N/A'}
            </div>
          {/if}
        {/each}
      </div>
    {/if}

    {#if viewMode === 'preview'}
      <!-- PREVIEW VIEW -->
      <FormPreview />
    {/if}
  </div>
</div>




<style>
  /* Styles specific to the editor view elements */
  .editor-element-wrapper {
    box-sizing: border-box;
  }

  /* Hover style applied via inner div's hover pseudo-class */
  .editor-element-wrapper[style*="border-color: #3b82f6"] .hover\:outline {
    outline: none !important;
  }

  /* Ensure dragging element has no hover outline on inner div */
  .editor-element-wrapper[style*="z-index: 30"] .hover\:outline {
    outline: none !important;
  }

  /* General container style if needed */
  #editor-preview-container {
    background-color: #f9fafb; /* Light bg for the container */
  }
</style>