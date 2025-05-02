<script>
  // @ts-nocheck
  import { formStore } from '../../stores/formStore';
  import { selectedElementStore } from '../../stores/uiStore';
  import { ELEMENT_TYPES } from '$lib/elementTypes';
  import { onMount } from 'svelte';
  import { HsvPicker } from 'svelte-color-picker';

  let selectedElement = null;
  let elementTypeConfig = null;

  function colorCallback(rgba) {
    const colorObj = rgba.detail;
    const rgb = `rgba(${colorObj.r}, ${colorObj.g}, ${colorObj.b}, ${colorObj.a})`;
    updateStyle('background-color', rgb);
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
    console.log(selectedElement.properties[property], newItem)
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

<div class="w-[30%] h-full flex flex-col border-l border-gray-200 bg-white overflow-y-scroll">
  {#if selectedElement && elementTypeConfig}
    <div class="p-4 space-y-6">
     
      <div class="flex justify-between items-center pb-3 border-b border-gray-200">
        <h3 class="text-base font-bold text-gray-900">{elementTypeConfig.label} Properties</h3>
        <span class="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
          {selectedElement.type}
        </span>
      </div>

    
      <div class="space-y-4">
        <h4 class="text-xs font-bold text-gray-500 uppercase tracking-wider">Content</h4>
        {#each elementTypeConfig.editableProperties as prop}
          <div class="space-y-1">
            <label class="text-sm font-medium text-gray-900">{prop.label}</label>
            
            {#if prop.type === 'text'}
              <input
                type="text"
                class="w-full px-3 py-2 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-200 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                bind:value={selectedElement.properties[prop.property]}
                on:input={(e) => updateProperty(prop.property, e.target.value)}
              />
            
            {:else if prop.type === 'number'}
              <input
                type="number"
                class="w-full px-3 py-2 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-200 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                bind:value={selectedElement.properties[prop.property]}
                on:input={(e) => updateProperty(prop.property, Number(e.target.value))}
              />
            
            {:else if prop.type === 'checkbox'}
              <label class="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  class="sr-only peer"
                  bind:checked={selectedElement.properties[prop.property]}
                  on:change={(e) => updateProperty(prop.property, e.target.checked)}
                />
                <div class="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            
            {:else if prop.type === 'select'}
              <select
                class="w-full px-3 py-2 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-200 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iIzUzNjQ3MSI+PHBhdGggZD0iTTcgMTBsNSA1IDUtNXoiLz48L3N2Zz4=')] bg-no-repeat bg-[right_0.5rem_center] bg-[length:1rem]"
                bind:value={selectedElement.properties[prop.property]}
                on:change={(e) => updateProperty(prop.property, e.target.value)}
              >
                {#each prop.options as option}
                  <option value={option}>{option}</option>
                {/each}
              </select>
            
            {:else if prop.type === 'array'}
              <div class="space-y-2 p-2 bg-gray-50 rounded-lg border border-gray-200">
                {#each selectedElement.properties[prop.property] as item, i}
                  <div class="flex items-center gap-2">
                    {#if typeof item === 'object'}
                      <div class="flex-1 space-y-2">
                        {#each Object.entries(item) as [key, value]}
                          <div class="flex items-center gap-2">
                            {#if typeof value === 'boolean'}
                              <label class="inline-flex items-center cursor-pointer">
                                <input
                                  type="checkbox"
                                  class="sr-only peer"
                                  checked={value}
                                  on:change={(e) => updateArrayItem(prop.property, i, key, e.target.checked)}
                                />
                                <div class="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                                <span class="ml-2 text-sm text-gray-700">{key}</span>
                              </label>
                            {:else}
                              <input
                                type="text"
                                class="flex-1 px-2 py-1 text-sm text-gray-900 bg-white rounded border border-gray-200 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                bind:value={item[key]}
                                on:input={(e) => updateArrayItem(prop.property, i, key, e.target.value)}
                                placeholder={key}
                              />
                            {/if}
                          </div>
                        {/each}
                      </div>
                    {:else}
                      <input
                        type="text"
                        class="flex-1 px-2 py-1 text-sm text-gray-900 bg-white rounded border border-gray-200 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        bind:value={selectedElement.properties[prop.property][i]}
                        on:input={(e) => {
                          const newArray = [...selectedElement.properties[prop.property]];
                          newArray[i] = e.target.value;
                          updateProperty(prop.property, newArray);
                        }}
                      />
                    {/if}
                      <button 
                        class="p-1 text-red-500 hover:text-red-700"
                        on:click={() => removeArrayOption(prop.property, i)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                        </svg>
                      </button>
                    </div>
                {/each}
                <button 
                  class="w-full py-1 px-2 text-sm text-blue-500 hover:text-blue-700 border border-dashed border-gray-300 rounded hover:bg-blue-50 flex items-center justify-center gap-1"
                  on:click={() => addArrayOption(prop.property, prop.defaultValue[0]+1)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
                  </svg>
                  Add Option
                </button>
              </div>
            {/if}
          </div>
        {/each}
      </div>

     
      <div class="space-y-4">
        <h4 class="text-xs font-bold text-gray-500 uppercase tracking-wider">Appearance</h4>
        
        <div class="space-y-1">
          <label class="text-sm font-medium text-gray-900">Width</label>
          <select
            class="w-full px-3 py-2 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-200 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iIzUzNjQ3MSI+PHBhdGggZD0iTTcgMTBsNSA1IDUtNXoiLz48L3N2Zz4=')] bg-no-repeat bg-[right_0.5rem_center] bg-[length:1rem]"
            bind:value={selectedElement.styles.width}
            on:change={(e) => updateStyle('width', e.target.value)}
          >
            <option value="100%">Full width</option>
            <option value="auto">Auto</option>
            <option value="50%">Half width</option>
            <option value="300px">Fixed (300px)</option>
          </select>
        </div>

        <div class="space-y-1">
          <label class="text-sm font-medium text-gray-900">Padding</label>
          <input
            type="text"
            class="w-full px-3 py-2 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-200 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            bind:value={selectedElement.styles.padding}
            on:input={(e) => updateStyle('padding', e.target.value)}
          />
        </div>

        <div class="space-y-1">
          <label class="text-sm font-medium text-gray-900">Margin</label>
          <input
            type="text"
            class="w-full px-3 py-2 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-200 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            bind:value={selectedElement.styles.margin}
            on:input={(e) => updateStyle('margin', e.target.value)}
          />
        </div>
        <div class="space-y-1">
          <label class="text-sm font-medium text-gray-900">Text Color</label>
          <HsvPicker 
            on:colorChange={(rgba)=>{
                const colorObj = rgba.detail;
                const rgb = `rgba(${colorObj.r}, ${colorObj.g}, ${colorObj.b}, ${colorObj.a})`;
                updateStyle('color', rgb);
            }} 
            startColor={selectedElement.styles['color']}
          />
        </div>
        <div class="space-y-1">
          <label class="text-sm font-medium text-gray-900">Background Color</label>
          <HsvPicker 
            on:colorChange={colorCallback} 
            startColor={selectedElement.styles['background-color']}
          />
        </div>

        <div class="space-y-1">
          <label class="text-sm font-medium text-gray-900">Border</label>
          <input
            type="text"
            class="w-full px-3 py-2 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-200 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            bind:value={selectedElement.styles.border}
            on:input={(e) => updateStyle('border', e.target.value)}
          />
        </div>

        <div class="space-y-1">
          <label class="text-sm font-medium text-gray-900">Border Radius</label>
          <input
            type="text"
            class="w-full px-3 py-2 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-200 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            bind:value={selectedElement.styles['border-radius']}
            on:input={(e) => updateStyle('border-radius', e.target.value)}
          />
        </div>
      </div>
    </div>
  {:else}
    <div class="flex flex-col items-center justify-center h-full p-10 text-center text-gray-500">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <p class="text-sm">Select an element to edit its properties</p>
    </div>
  {/if}
</div>