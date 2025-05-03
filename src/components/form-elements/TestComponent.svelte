<script>
  // @ts-nocheck
  export let element;
	

  
</script>

<div style={Object.entries(element.styles || {}).map(([k, v]) => `${k}: ${v}`).join('; ')}>
  <input
    type="text"
    class="w-full text-lg font-semibold mb-3 p-2  rounded bg-gray-100 border-none"
    bind:value={element.properties.question}
    placeholder="Enter question text"
    disabled
  />
  
  <div class="space-y-2 mb-3">
    {#each element.properties.options as option, index (index)}
      <div class="flex items-center space-x-2 p-2 border-none rounded">
        <input
          type={element.properties.multiple ? 'checkbox' : 'radio'}
          class="mr-2"
          checked={option.correct}
          on:change={() => toggleCorrect(index)}
          name="test-options"
          
        />
        <input
          type="text"
          class="flex-1 p-1  rounded border-none"
          value={option.text}
          on:input={(e) => updateOptionText(index, e.target.value)}
          disabled
        />
        
      </div>
    {/each}
  </div>

  
</div>

<style>
  /* input[type="text"] {
    transition: border-color 0.2s;
  }
  input[type="text"]:focus {
    border-color: #3b82f6;
    outline: none;
  } */
</style>