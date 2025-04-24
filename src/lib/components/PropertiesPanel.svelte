<script>
  // @ts-nocheck
  import { formStore, selectedElement, updateElement, deleteElement } from '../stores/formStore';
  import { ELEMENT_TYPES } from '../utils/elementTypes';

  // State Management
  let defaultStylesApplied = false;

  // Common Style Properties
  const styleProperties = [
    { label: 'Width', property: 'width', type: 'text' },
    { label: 'Height', property: 'height', type: 'text' },
    { label: 'Background Color', property: 'background-color', type: 'color' },
    { label: 'Text Color', property: 'color', type: 'color' },
    { label: 'Padding', property: 'padding', type: 'text' },
    { label: 'Margin', property: 'margin', type: 'text' },
    { label: 'Border', property: 'border', type: 'text' },
    { label: 'Border Radius', property: 'border-radius', type: 'text' },
    { label: 'Font Size', property: 'font-size', type: 'text' },
    { label: 'Font Weight', property: 'font-weight', type: 'text', default: 'normal' },
    { label: 'Text Align', property: 'text-align', type: 'text', default: 'left' },
    { label: 'Display', property: 'display', type: 'text', default: 'block' },
    { label: 'Position', property: 'position', type: 'text', default: 'relative' },
    { label: 'Overflow', property: 'overflow', type: 'text', default: 'visible' },
    { label: 'Z-Index', property: 'z-index', type: 'text', default: 'auto' },
  ];

  // Reactive Variables
  $: elementType = $selectedElement ? ELEMENT_TYPES[$selectedElement.type] : null;

  // Apply Default Styles and Attributes When an Element is Selected
  $: if ($selectedElement && !defaultStylesApplied) {
    applyDefaultStylesAndAttributes();
    defaultStylesApplied = true;
  }

  $: if (!$selectedElement) {
    defaultStylesApplied = false;
  }

  // Function to Apply Default Styles and Attributes
  function applyDefaultStylesAndAttributes() {
    if (!$selectedElement || !elementType) return;

    // Apply Default Styles
    if (elementType.defaultStyles) {
      const newStyles = { ...elementType.defaultStyles };
      for (const prop in newStyles) {
        if ($selectedElement.styles?.[prop] !== undefined) {
          delete newStyles[prop];
        }
      }
      if (Object.keys(newStyles).length > 0) {
        updateElement($selectedElement.id, {
          styles: {
            ...newStyles,
            ...$selectedElement.styles,
          },
        });
      }
    }

    // Apply Default Attributes
    if (elementType.editableProperties) {
      const newAttributes = {};
      elementType.editableProperties.forEach((prop) => {
        if ($selectedElement.attributes?.[prop.property] === undefined) {
          newAttributes[prop.property] = prop.defaultValue;
        }
      });
      if (Object.keys(newAttributes).length > 0) {
        updateElement($selectedElement.id, {
          attributes: {
            ...$selectedElement.attributes,
            ...newAttributes,
          },
        });
      }
    }
  }

  // Handlers for Updating Styles and Attributes
  function handleStyleChange(property, value) {
    updateElement($selectedElement.id, {
      styles: {
        ...$selectedElement.styles,
        [property]: value,
      },
    });
  }

  function handleAttributeChange(property, value) {
    console.log(property, value)
    updateElement($selectedElement.id, {
      attributes: {
        ...$selectedElement.attributes,
        [property]: value,
      },
    });
    console.log($selectedElement)

  }

  // Handlers for Managing Options (e.g., Voting or Test Components)
  function handleOptionChange(index, value) {
    const newOptions = [...$selectedElement.attributes.options];
    newOptions[index] = value;
    handleAttributeChange('options', newOptions);
  }

  function handleTestOptionChange(index, field, value) {
    const newOptions = [...$selectedElement.attributes.options];
    newOptions[index] = { ...newOptions[index], [field]: value };
    handleAttributeChange('options', newOptions);
  }

  function addOption() {
    const currentOptions = $selectedElement.attributes.options || [];
    const isArrayOfObjects = currentOptions.length > 0 && typeof currentOptions[0] === 'object';
    const newOption = isArrayOfObjects
      ? { text: `Option ${currentOptions.length + 1}`, correct: false }
      : `Option ${currentOptions.length + 1}`;
    handleAttributeChange('options', [...currentOptions, newOption]);
  }

  function removeOption(index) {
    const newOptions = $selectedElement.attributes.options.filter((_, i) => i !== index);
    handleAttributeChange('options', newOptions);
  }

  // Handler for Updating Position
  function handlePositionChange(axis, value) {
    updateElement($selectedElement.id, {
      position: {
        ...$selectedElement.position,
        [axis]: parseInt(value) || 0,
      },
    });
  }

  // Handler for Deleting an Element
  function handleDelete() {
    if ($selectedElement) {
      deleteElement($selectedElement.id);
    }
  }
</script>

<!-- Property Panel UI -->
<div class="w-[30%] h-full  p-4 overflow-y-auto">
  {#if $selectedElement && elementType}
    <h2 class="text-xl font-bold mb-4">{$selectedElement.type}</h2>

    <!-- Position Controls -->
    <div class="mb-4">
      <h3 class="font-semibold mb-2">Position</h3>
      <div class="grid grid-cols-2 gap-2">
        <div>
          <label class="block text-sm">X</label>
          <input
            type="number"
            class="w-full p-2 border rounded"
            value={$selectedElement.position?.x || 0}
            on:input={(e) => handlePositionChange('x', e.target.value)}
          />
        </div>
        <div>
          <label class="block text-sm">Y</label>
          <input
            type="number"
            class="w-full p-2 border rounded"
            value={$selectedElement.position?.y || 0}
            on:input={(e) => handlePositionChange('y', e.target.value)}
          />
        </div>
      </div>
    </div>

    <!-- Custom Attributes Section -->
    {#if elementType.editableProperties?.length}
      <div class="mb-4 p-4 rounded-xl bg-purple-100">
        <h3 class="font-semibold mb-2 text-purple-800">Element Settings</h3>
        <div class="space-y-3">
          {#each elementType.editableProperties as attr}
            {#if attr.type === 'checkbox'}
              <div class="flex items-center">
                <input
                  type="checkbox"
                  id={attr.property}
                  class="mr-2 border-purple-600"
                  checked={$selectedElement.attributes?.[attr.property] ?? attr.defaultValue}
                  on:change={(e) => handleAttributeChange(attr.property, e.target.checked)}
                />
                <label for={attr.property} class="text-sm">{attr.label}</label>
              </div>
            {:else if attr.type === 'array'}
              <div>
                <label class="block text-sm mb-1">{attr.label}</label>
                <div class="space-y-2 mb-2">
                  {#each $selectedElement.attributes?.options || attr.defaultValue || [] as option, index (index)}
                    {#if $selectedElement.type != 'VOTING'}
                      <!-- Test Component Options (with Correct/Incorrect Flags) -->
                      <div class="space-y-1 border-none p-2 rounded bg-purple-300">
                        <div class="flex">
                          <input
                            type="text"
                            class="flex-1 p-1 border-none rounded bg-purple-400 text-white"
                            value={option.text}
                            on:input={(e) => handleTestOptionChange(index, 'text', e.target.value)}
                          />
                        </div>
                        <div class="flex items-center">
                          <input
                            type="checkbox"
                            id={`correct-${index}`}
                            class="mr-2 bg-purple-700"
                            checked={option.correct}
                            on:change={(e) => handleTestOptionChange(index, 'correct', e.target.checked)}
                          />
                          <label for={`correct-${index}`} class="text-sm">Correct Answer</label>
                        </div>
                        <button
                          on:click={() => removeOption(index)}
                          class="text-sm text-red-500 hover:text-red-700"
                        >
                          Remove Option
                        </button>
                      </div>
                    {:else}
                      <!-- Voting Component Simple Options -->
                      <div class="flex items-center">
                        <input
                          type="text"
                          class="flex-1 p-1 border rounded"
                          value={option}
                          on:input={(e) => handleOptionChange(index, e.target.value)}
                        />
                        <button
                          on:click={() => removeOption(index)}
                          class="ml-2 text-red-500 hover:text-red-700"
                        >
                          ×
                        </button>
                      </div>
                    {/if}
                  {/each}
                </div>
                <button
                  on:click={addOption}
                  class="text-sm text-blue-500 hover:text-blue-700"
                >
                  + Add Option
                </button>
              </div>
            
           
              {:else}
              <div>
                <label class="block text-sm">{attr.label}</label>
                <input
                  type={attr.type}
                  class="w-full p-2 border rounded"
                  value={$selectedElement.attributes?.[attr.property] ?? attr.defaultValue}
                  on:input={(e) => handleAttributeChange(attr.property, e.target.value)}
                />
              </div>
            {/if}
          {/each}
        </div>
      </div>
    {/if}

    <!-- Styles Section -->
    <div class="mb-4 p-4 bg-gray-200 rounded-xl">
      <h3 class="font-semibold mb-2">Styles</h3>
      <div class="space-y-3">
        {#each styleProperties as prop}
          <div>
            <label class="block text-sm">{prop.label}</label>
            {#if prop.type === 'color'}
              <input
                type="color"
                class="w-full h-10 border-none"
                value={$selectedElement.styles[prop.property] || elementType.defaultStyles?.[prop.property] || ''}
                on:input={(e) => handleStyleChange(prop.property, e.target.value)}
              />
            {:else}
              <input
                type="text"
                class="w-full p-2 border rounded border-none"
                value={$selectedElement.styles[prop.property] || elementType.defaultStyles?.[prop.property] || ''}
                on:input={(e) => handleStyleChange(prop.property, e.target.value)}
              />
            {/if}
          </div>
        {/each}
      </div>
    </div>

    <!-- Delete Button -->
    <button
      class="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 mt-4"
      on:click={handleDelete}
    >
      Delete Element
    </button>
  {:else}
    <div class="text-gray-500 text-center py-8">
      Select an element to edit its properties
    </div>
  {/if}
</div>