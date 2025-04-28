<!-- src/components/form-elements/TextInput.svelte -->
<script>
  // Props for the component
  export let label = 'Text Input';
  export let placeholder = '';
  export let required = false;
  export let editable = true;
  
  // For preview mode, we need a value
  let value = '';
</script>

<div class="text-input-container">
  <label class="input-label">
    {label}{required ? ' *' : ''}
  </label>
  
  <input 
    type="text"
    class="text-input"
    {placeholder}
    {required}
    bind:value
    disabled={editable} 
    class:editable
  />
  
  {#if editable}
    <div class="edit-overlay"></div>
  {/if}
</div>

<style>
  .text-input-container {
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  
  .input-label {
    font-size: 14px;
    font-weight: 500;
    color: #374151;
  }
  
  .text-input {
    padding: 8px 12px;
    border: 1px solid #d1d5db;
    
  }
  </style>