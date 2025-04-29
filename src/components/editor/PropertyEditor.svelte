<script>
  // @ts-nocheck
  import { formStore } from '../../stores/formStore';
  import { selectedElementStore } from '../../stores/uiStore';
  import { ELEMENT_TYPES } from '$lib/elementTypes';

  import { onMount } from 'svelte';
  import {HsvPicker} from 'svelte-color-picker';


  let selectedElement = null;
  let elementTypeConfig = null;

  function colorCallback(rgba) {
	 
    const colorObj = rgba.detail
   const rgb =  `rgba(${colorObj.r}, ${colorObj.g}, ${colorObj.b}, ${colorObj.a})`;
    updateStyle('background-color', rgb)
  }
  // Subscribe to the selected element store
  selectedElementStore.subscribe((value) => {
    selectedElement = value;
    if (value) {
      elementTypeConfig = ELEMENT_TYPES[value.type];
    }
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

  // Update a style property in the form store
  function updateStyle(property, value) {
    formStore.update((elements) => {
      const updatedElements = elements.map((el) =>
        el.id === selectedElement.id ? { 
          ...el, 
          styles: { ...el.styles, [property]: value } 
        } : el
      );
      return updatedElements;
    });
  }

  // Add new option to array property
  function addArrayOption(property, defaultValue) {
    const newItem = typeof defaultValue === 'object' ? {...defaultValue} : defaultValue || '';
    updateProperty(property, [...selectedElement.properties[property], newItem]);
  }

  // Remove option from array property
  function removeArrayOption(property, index) {
    const newArray = [...selectedElement.properties[property]];
    newArray.splice(index, 1);
    updateProperty(property, newArray);
  }

  // Update array item property
  function updateArrayItem(property, index, key, value) {
    const newArray = [...selectedElement.properties[property]];
    newArray[index] = { ...newArray[index], [key]: value };
    updateProperty(property, newArray);
  }
</script>

{#if selectedElement && elementTypeConfig}
  <div class="property-editor w-[30%]">
    <div class="editor-header">
      <h3>{elementTypeConfig.label} Properties</h3>
      <div class="element-type-badge">{selectedElement.type}</div>
    </div>

    <div class="section">
      <h4 class="section-title">Content</h4>
      {#each elementTypeConfig.editableProperties as prop}
        <div class="property-group">
          <label class="property-label">{prop.label}</label>
          
          {#if prop.type === 'text'}
            <input
              type="text"
              class="property-input"
              bind:value={selectedElement.properties[prop.property]}
              on:input={(e) => updateProperty(prop.property, e.target.value)}
            />
          
          {:else if prop.type === 'number'}
            <input
              type="number"
              class="property-input"
              bind:value={selectedElement.properties[prop.property]}
              on:input={(e) => updateProperty(prop.property, Number(e.target.value))}
            />
          
          {:else if prop.type === 'checkbox'}
            <label class="checkbox-container">
              <input
                type="checkbox"
                bind:checked={selectedElement.properties[prop.property]}
                on:change={(e) => updateProperty(prop.property, e.target.checked)}
              />
              <span class="checkmark"></span>
            </label>
          
          {:else if prop.type === 'select'}
            <select
              class="property-select"
              bind:value={selectedElement.properties[prop.property]}
              on:change={(e) => updateProperty(prop.property, e.target.value)}
            >
              {#each prop.options as option}
                <option value={option}>{option}</option>
              {/each}
            </select>
          
          {:else if prop.type === 'array'}
            <div class="array-property">
              {#each selectedElement.properties[prop.property] as item, i}
                <div class="array-item">
                  {#if typeof item === 'object'}
                    {#each Object.entries(item) as [key, value]}
                      <div class="array-item-field">
                        {#if typeof value === 'boolean'}
                          <label class="checkbox-container">
                            <input
                              type="checkbox"
                              checked={value}
                              on:change={(e) => updateArrayItem(prop.property, i, key, e.target.checked)}
                            />
                            <span class="checkmark"></span>
                            <span class="checkbox-label">{key}</span>
                          </label>
                        {:else}
                          <input
                            type="text"
                            class="property-input"
                            bind:value={item[key]}
                            on:input={(e) => updateArrayItem(prop.property, i, key, e.target.value)}
                            placeholder={key}
                          />
                        {/if}
                      </div>
                    {/each}
                  {:else}
                    <input
                      type="text"
                      class="property-input"
                      bind:value={selectedElement.properties[prop.property][i]}
                      on:input={(e) => {
                        const newArray = [...selectedElement.properties[prop.property]];
                        newArray[i] = e.target.value;
                        updateProperty(prop.property, newArray);
                      }}
                    />
                  {/if}
                  <button 
                    class="remove-item-button"
                    on:click={() => removeArrayOption(prop.property, i)}
                  >
                    ×
                  </button>
                </div>
              {/each}
              <button 
                class="add-item-button"
                on:click={() => addArrayOption(prop.property, prop.defaultValue[0])}
              >
                + Add Option
              </button>
            </div>
          {/if}
        </div>
      {/each}
    </div>

    <div class="section">
      <h4 class="section-title">Appearance</h4>
      <div class="property-group">
        <label class="property-label">Width</label>
        <select
          class="property-select"
          bind:value={selectedElement.styles.width}
          on:change={(e) => updateStyle('width', e.target.value)}
        >
          <option value="100%">Full width</option>
          <option value="auto">Auto</option>
          <option value="50%">Half width</option>
          <option value="300px">Fixed (300px)</option>
        </select>
      </div>

      <div class="property-group">
        <label class="property-label">Padding</label>
        <input
          type="text"
          class="property-input"
          bind:value={selectedElement.styles.padding}
          on:input={(e) => updateStyle('padding', e.target.value)}
        />
      </div>

      <div class="property-group">
        <label class="property-label">Margin</label>
        <input
          type="text"
          class="property-input"
          bind:value={selectedElement.styles.margin}
          on:input={(e) => updateStyle('margin', e.target.value)}
        />
      </div>

      <div class="property-group">
        <label class="property-label">Background Color</label>
        <HsvPicker 
          bind:color={selectedElement.styles['background-color']}
          on:colorChange={colorCallback} startColor={selectedElement.styles['background-color']}
          on:change={() => updateStyle('background-color', selectedElement.styles['background-color'])}
        />
      </div>

      <div class="property-group">
        <label class="property-label">Border</label>
        <input
          type="text"
          class="property-input"
          bind:value={selectedElement.styles.border}
          on:input={(e) => updateStyle('border', e.target.value)}
        />
      </div>

      <div class="property-group">
        <label class="property-label">Border Radius</label>
        <input
          type="text"
          class="property-input"
          bind:value={selectedElement.styles['border-radius']}
          on:input={(e) => updateStyle('border-radius', e.target.value)}
        />
      </div>
    </div>
  </div>
{:else}
  <div class="empty-state">
    <svg viewBox="0 0 24 24" class="empty-icon">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
      <path d="M12 7c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1s1-.45 1-1v-4c0-.55-.45-1-1-1z"/>
    </svg>
    <p>Select an element to edit its properties</p>
  </div>
{/if}

<style>
  .property-editor {
    
    height: 100%;
    background-color: #ffffff;
    border-left: 1px solid #eff3f4;
    padding: 16px;
    overflow-y: auto;
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  }

  .editor-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 12px;
    border-bottom: 1px solid #eff3f4;
  }

  .editor-header h3 {
    margin: 0;
    font-size: 16px;
    font-weight: 700;
    color: #0f1419;
  }

  .element-type-badge {
    background-color: #eff3f4;
    color: #536471;
    font-size: 12px;
    font-weight: 500;
    padding: 4px 8px;
    border-radius: 20px;
  }

  .section {
    margin-bottom: 20px;
  }

  .section-title {
    font-size: 14px;
    font-weight: 700;
    color: #536471;
    margin: 0 0 12px 0;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .property-group {
    margin-bottom: 16px;
  }

  .property-label {
    display: block;
    font-size: 14px;
    font-weight: 500;
    color: #0f1419;
    margin-bottom: 6px;
  }

  .property-input {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid #eff3f4;
    border-radius: 8px;
    font-size: 14px;
    color: #0f1419;
    background-color: #f7f9f9;
    box-sizing: border-box;
    transition: border-color 0.2s ease, background-color 0.2s ease;
  }

  .property-input:focus {
    outline: none;
    border-color: #1d9bf0;
    background-color: #ffffff;
  }

  .property-select {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid #eff3f4;
    border-radius: 8px;
    font-size: 14px;
    color: #0f1419;
    background-color: #f7f9f9;
    box-sizing: border-box;
    transition: border-color 0.2s ease, background-color 0.2s ease;
    appearance: none;
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23536471'%3e%3cpath d='M7 10l5 5 5-5z'/%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right 8px center;
    background-size: 16px;
  }

  .property-select:focus {
    outline: none;
    border-color: #1d9bf0;
    background-color: #ffffff;
  }

  .checkbox-container {
    display: flex;
    align-items: center;
    position: relative;
    cursor: pointer;
    user-select: none;
  }

  .checkbox-container input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  .checkmark {
    height: 18px;
    width: 18px;
    background-color: #f7f9f9;
    border: 1px solid #eff3f4;
    border-radius: 4px;
    margin-right: 8px;
    transition: background-color 0.2s ease;
  }

  .checkbox-container:hover input ~ .checkmark {
    background-color: #e8f5fd;
  }

  .checkbox-container input:checked ~ .checkmark {
    background-color: #1d9bf0;
    border-color: #1d9bf0;
  }

  .checkmark:after {
    content: "";
    position: absolute;
    display: none;
  }

  .checkbox-container input:checked ~ .checkmark:after {
    display: block;
  }

  .checkbox-container .checkmark:after {
    left: 6px;
    top: 2px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }

  .checkbox-label {
    font-size: 14px;
    color: #0f1419;
  }

  .array-property {
    border: 1px solid #eff3f4;
    border-radius: 8px;
    padding: 8px;
    background-color: #f7f9f9;
  }

  .array-item {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
  }

  .array-item-field {
    flex-grow: 1;
    margin-right: 8px;
  }

  .remove-item-button {
    background: none;
    border: none;
    color: #f4212e;
    font-size: 18px;
    cursor: pointer;
    padding: 0 4px;
    line-height: 1;
  }

  .add-item-button {
    width: 100%;
    background: none;
    border: 1px dashed #cfd9de;
    border-radius: 4px;
    padding: 8px;
    color: #1d9bf0;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }

  .add-item-button:hover {
    background-color: #e8f5fd;
  }

  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 40px 20px;
    text-align: center;
    color: #536471;
  }

  .empty-icon {
    width: 48px;
    height: 48px;
    fill: #cfd9de;
    margin-bottom: 16px;
  }

  .empty-state p {
    margin: 0;
    font-size: 14px;
  }
</style>