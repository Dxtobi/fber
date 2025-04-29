<!-- src/components/canvas/Canvas.svelte -->
<script>
// @ts-nocheck

  import { ELEMENT_TYPES } from '$lib/elementTypes';
	import { onMount } from 'svelte';
  import { formStore } from '../../stores/formStore';
  import { selectedElementStore } from '../../stores/uiStore';
  import * as FormElements from "../form-elements/index";
  onMount(()=>{
    console.log(FormElements)
  })
  
  let elements = [];
  let draggedElement = null;

  // Subscribe to the form store
  formStore.subscribe((value) => {
    elements = value;
  });

  // Handle dropping an element onto the canvas
  function handleDrop(event) {
    event.preventDefault();
    const type = event.dataTransfer.getData('text/plain');
    const elementType = ELEMENT_TYPES[type];
    console.log(FormElements[elementType.component], $formStore, elementType, type) 
    
    if (elementType) {
      const newElement = {
        id: Date.now(), // Unique ID
        type: elementType.type,
        component: elementType.component,
        styles: { ...elementType.defaultStyles },
        properties: elementType.editableProperties.reduce((acc, prop) => {
          acc[prop.property] = prop.defaultValue;
          return acc;
        }, {}),
      };

      formStore.update((currentElements) => [...currentElements, newElement]);
    
    }
  }

  // Handle selecting an element
  function selectElement(element) {
    selectedElementStore.set(element);
  }
</script>

<div
 tabindex="0"
 role="button"
  class="canvas w-[100%] flex flex-col"
  on:dragover={(e) => e.preventDefault()}
  on:drop={handleDrop}
>
  {#each elements as element (element.id)}
  {console.log(element)}
    <a
      href={'#'}
      class="form-element"
     
      on:click={() => selectElement(element)}
      role='button'
      tabindex='0'
    >
      <svelte:component this={FormElements[element.component]} element={element} />
    </a>
  {/each}
</div>

<style>
  .canvas {
    
    border: 1px solid #ccc;
    padding: 16px;
    background-color: #f9f9f9;
  }
  .form-element {
    margin-bottom: 8px;
    cursor: pointer;
  }
</style>