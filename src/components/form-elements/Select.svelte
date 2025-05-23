<script>
  import { updateFormStoreValue } from "../../stores/publishedForm";
  
  let {element} = $props();
  let selected = $derived(element.properties.value);
  let isOpen = $state(false);
  
  // Handle selection
  // @ts-ignore
  const handleSelect = (option) => {
    updateFormStoreValue(element.id, "value", option);
    isOpen = false;
  }
  
  // Toggle dropdown
  const toggleDropdown = () => {
    isOpen = !isOpen;
  }
</script>

 <span class="block text-sm font-medium text-gray-500 mb-1 ml-1">{element.properties.label}</span>
<div class="dropdown-container " style={`width:${element.styles.width};`}>
  <!-- Dropdown header -->
  <button 
    class="dropdown-header "
    type="button"
    onclick={toggleDropdown}
    style={Object.entries(element.styles).map(([k, v]) => `${k}: ${v}`).join('; ')}
  >
    {element.properties.value || element.properties.showTitle}
    <svg class={`chevron ${isOpen ? 'rotate' : ''}`} width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 10.5L3.5 6L4.5 5L8 8.5L11.5 5L12.5 6L8 10.5Z" fill="#A6A6C8" />
    </svg>
  </button>
  
  <!-- Dropdown options -->
  {#if isOpen}
    <div class="dropdown-options">
      {#each element.properties.options as option (option)}
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <button 
          class="dropdown-option block w-full text-start hover:bg-blue-200" 
          class:selected={selected === option}
          onclick={() => handleSelect(option)}
          type="button"
        >
          {option}
        </button>
      {/each}
    </div>
  {/if}
</div>

<style>
  .dropdown-container {
    position: relative;
    font-family: sans-serif;
  }
  
  .dropdown-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 12px 16px;
    background-color: white;
    border: none;
    border-radius: 12px;
    color: #999;
    font-size: 16px;
    text-align: left;
    cursor: pointer;
  }
  
  .chevron {
    transition: transform 0.2s ease;
  }
  
  .chevron.rotate {
    transform: rotate(180deg);
  }
  
  .dropdown-options {
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.114);
    backdrop-filter: blur(17px);
    border-radius: 12px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    z-index: 10;
  }
  
  .dropdown-option {
    padding: 12px 16px;
    color: #444;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }
  
  
  
  .dropdown-option.selected {
    font-weight: 500;
  }
</style>