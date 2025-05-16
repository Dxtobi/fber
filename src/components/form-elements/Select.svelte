<script>
  export let element;

 
  let selected = element.properties.options[0]
</script>

<div>
  <div class={`${element.properties.titlePosition === 'left' ? 'text-left' :element.properties.titlePosition === 'right'?'text-right':'text-center'}`}>
    {#if element.properties.showTitle}
      <span style="font-weight: 500;">{element.properties.title}</span>
    {/if}
    
   
  </div>
  <select style={ Object.entries(element.styles).map(([k, v]) => `${k}: ${v}`).join('; ')} value={selected}>
    {#each element.properties.options as option (option)}
      <option value={option}>{option}</option>
    {/each}
  </select>
</div>

<style global>
  /* Basic select styling */
  select {
    font-size: 14px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  select:hover {
    border-color: #888;
  }

  select:focus {
    border-color: #646cff;
    box-shadow: 0 0 0 2px rgba(100, 108, 255, 0.2);
  }

  label {
    white-space: nowrap;
  }
</style> 