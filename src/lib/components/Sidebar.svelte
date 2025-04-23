<script>
    import { ELEMENT_TYPES } from '../utils/elementTypes';
    import { addElement } from '../stores/formStore';
  
    const elementTypes = Object.values(ELEMENT_TYPES);
  
    /**
	 * @param {DragEvent & { currentTarget: EventTarget & HTMLButtonElement; }} event
	 * @param {{ type: string; label: string; component: string; defaultStyles: { width: string; padding: string; 'border-radius': string; border: string; }; } | { type: string; label: string; component: string; defaultStyles: { width: string; padding: string; 'border-radius': string; border: string; 'background-color': string; color: string; cursor: string; }; } | { type: string; label: string; component: string; defaultStyles: { width: string; height: string; }; } | { type: string; label: string; component: string; defaultStyles: { width: string; padding: string; 'background-color': string; 'border-radius': string; }; } | { type: string; label: string; component: string; defaultStyles: { width: string; padding: string; 'background-color': string; 'border-radius': string; }; }} elementType
	 */
    function handleDragStart(event, elementType) {
      // @ts-ignore
      event.dataTransfer.setData('text/plain', JSON.stringify(elementType));
    }
  </script>
  
  <div class="w-64 h-full bg-gray-100 p-4 overflow-y-auto">
    <h2 class="text-xl font-bold mb-4">Form Elements</h2>
    
    <div class="space-y-2 flex flex-wrap gap-4">
      {#each elementTypes as elementType}
        <button
          class="p-3 bg-white rounded shadow cursor-move hover:bg-gray-50"
          draggable="true"
          on:dragstart={(e) => handleDragStart(e, elementType)}
          on:click={() => addElement(elementType)}
          on:keydown={(e) => (e.key === 'Enter' || e.key === ' ') && addElement(elementType)}
          aria-label={`Add ${elementType.label}`}
        >
          <span>
            <svelte:component this={elementType.svg} />
          </span>
        </button>
      {/each}
    </div>
  </div>