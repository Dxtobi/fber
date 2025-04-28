<script>
  import { ELEMENT_TYPES } from '$lib/elementTypes';

  // Function to handle drag start
  // @ts-ignore
  function handleDragStart(event, elementType) {
    event.dataTransfer.setData('text/plain', elementType); // Pass the element type as data
    event.dataTransfer.effectAllowed = 'move'; // Set drag effect
  }
</script>

<div class="w-64 bg-gray-100 p-4 shadow-md h-screen">
  <h2 class="text-lg font-semibold text-gray-800 mb-4">Form Elements</h2>
  <div class="space-y-2">
    {#each Object.values(ELEMENT_TYPES) as element}
      <div
        class="flex items-center space-x-2 p-2 rounded cursor-grab hover:bg-gray-200 transition-colors"
        role="button"
        tabindex="0"
        draggable="true"
        on:dragstart={(e) => handleDragStart(e, element.type)}
      >
        <svelte:component this={element.svg}  />
        <span class="text-sm text-gray-700">{element.label}</span>
      </div>
    {/each}
  </div>
</div>