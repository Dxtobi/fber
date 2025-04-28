<!-- src/components/editor/PropertyEditor.svelte -->
<script>
// @ts-nocheck

  import { formStore } from '../../stores/formStore';
  import { selectedElementStore } from '../../stores/uiStore';

  let selectedElement = null;

  // Subscribe to the selected element store
  selectedElementStore.subscribe((value) => {
    selectedElement = value;
  });

  // Update a property in the form store
  function updateProperty(property, value) {
    formStore.update((elements) => {
      const updatedElements = elements.map((el) =>
        el.id === selectedElement.id ? { ...el, properties: { ...el.properties, [property]: value } } : el
      );
      return updatedElements;
    });
  }
</script>

{#if selectedElement}
  <div class=" w-[20%]">
    <h3>Edit Properties</h3>
    {#each selectedElement.editableProperties as prop}
      <div class="property">
        <label>{prop.label}</label>
        {#if prop.type === 'text'}
          <input
            type="text"
            bind:value={selectedElement.properties[prop.property]}
            on:input={(e) => updateProperty(prop.property, e.target.value)}
          />
        {:else if prop.type === 'checkbox'}
          <input
            type="checkbox"
            bind:checked={selectedElement.properties[prop.property]}
            on:change={(e) => updateProperty(prop.property, e.target.checked)}
          />
        {:else if prop.type === 'select'}
          <select
            bind:value={selectedElement.properties[prop.property]}
            on:change={(e) => updateProperty(prop.property, e.target.value)}
          >
            {#each prop.options as option}
              <option value={option}>{option}</option>
            {/each}
          </select>
        {/if}
      </div>
    {/each}
  </div>
{:else}
  <p>No element selected.</p>
{/if}

<style>
  .editor {
    padding: 16px;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 8px;
  }
  .property {
    margin-bottom: 12px;
  }
</style>