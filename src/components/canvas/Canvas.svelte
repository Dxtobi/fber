<script>
// @ts-nocheck

  import { ELEMENT_TYPES } from '$lib/elementTypes';
	import { onMount } from 'svelte';
  import { formStore } from '../../stores/formStore';
  import { selectedElementStore } from '../../stores/uiStore';
  import * as FormElements from "../form-elements/index";
  import {dndzone} from "svelte-dnd-action";
  const flipDurationMs = 300;
  let elements = $state([]);
  let draggedElement = $state(null);

  // Subscribe to the form store
  formStore.subscribe((value) => {
    elements = value;
  });

  // Handle dropping an element onto the canvas
  function handleDrop(event) {
    event.preventDefault();
    const type = event.dataTransfer.getData('text/plain');
    const elementType = ELEMENT_TYPES[type];
   
    
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
      selectedElementStore.set(newElement)
    }
  }

  // Handle selecting an element
  function selectElement(element) {
    selectedElementStore.set(element);
  }

  function handleDndConsider(e) {
        let items = e.detail.items;
        formStore.update((currentElements) => [...items]);
        console.log(e.detail)
    }
  function handleDndFinalize(e) {
    let items = e.detail.items;
    formStore.update((currentElements) => [...items]);
    console.log(e.detail)

    }
</script>


<div
    tabindex="0"
    role="button"
      class="canvas w-[100%] flex flex-col overflow-scroll m-auto h-full py-44"
      ondragover={(e) => e.preventDefault()}
      ondrop={handleDrop}
      use:dndzone="{{items:elements, flipDurationMs}}" onconsider="{handleDndConsider}" onfinalize="{handleDndFinalize}"
    >
      {#each elements as element (element.id)}
        {@const Component = FormElements[element.component]}
        <a
          href={'#'}
          class="form-element"
          onclick={() => selectElement(element)}
          role='button'
          tabindex='0'
        >
         <Component element={element}/>
        </a>
      {/each}
</div>


<style>
  .canvas {
    border: 1px solid #e9e7e7;
    padding: 16px;
  }
  .form-element {
    margin-bottom: 0px;
    cursor: pointer;
  }
</style>