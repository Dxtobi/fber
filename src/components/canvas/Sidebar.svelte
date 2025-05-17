<script>
// @ts-nocheck

  import { ELEMENT_TYPES } from '$lib/elementTypes';
  
  // Function to handle drag start
  function handleDragStart(event, elementType) {
    event.dataTransfer.setData('text/plain', elementType); // Pass the element type as data
    event.dataTransfer.effectAllowed = 'move'; // Set drag effect
  }
  
  // Group elements by category
  const categories = {
    'Layout Elements': [
      { id: 'SECTION_DIVIDER', label: 'Sections' },
      
    ],
    'Text Input Elements': [
      
      { id: 'TEXT_INPUT', label: 'Text Input' },
      { id: 'TEXTAREA_INPUT', label: 'Textarea Input' },
      { id: 'NUMBER', label: 'Phone' },
    ],
    'Text Elements': [
      { id: 'TEXT', label: 'Text' },
      { id: 'NUMBER', label: 'Number' },
    ],
    'Date Elements': [
      { id: 'DATE_PICKER', label: 'Date' },
      { id: 'DATETIME_PICKER', label: 'Date & Time' },
    ],
    'Multi Elements': [
      { id: 'BUTTON', label: 'Button' },
      { id: 'YES_NO', label: 'Yes/No' },
      { id: 'SELECT', label: 'Dropdown' },
      { id: 'CHECKBOX', label: 'Checkbox' },
      { id: 'VOTING', label: 'Poll' },
      { id: 'TEST', label: 'Profile' },
    ],
    'Media Elements': [
      { id: 'FILE_UPLOAD', label: 'Attachments' },
      { id: 'FILE_UPLOAD', label: 'Image' },
      { id: 'FILE_UPLOAD', label: 'Slider' },
    ]
  };
  
  // Icons for categories
  const categoryIcons = {
    'Layout Elements': '⊞',
    'Text Elements': 'T',
    'Date Elements': '📅',
    'Multi Elements': '☑',
    'Media Elements': '📎'
  };
  
  // Track which categories are expanded
  let expandedCategories = Object.keys(categories).reduce((acc, category) => {
    acc[category] = true;
    return acc;
  }, {});
  
  function toggleCategory(category) {
    expandedCategories[category] = !expandedCategories[category];
    expandedCategories = {...expandedCategories}; // Trigger reactivity
  }
</script>

<div class="w-[30%] bg-white p-4 h-screen border-r border-gray-200 overflow-y-auto">
  <!-- Search Bar -->
  <div class="relative mb-4">
    <input 
      type="text" 
      placeholder="Search Components" 
      class="w-full pl-3 pr-10 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
    />
    <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </div>
  </div>
  
  <!-- Categories -->
  {#each Object.entries(categories) as [category, items]}
    <div class="mb-3">
      <button class="flex items-center justify-between mb-2 cursor-pointer w-full" on:click={() => toggleCategory(category)}>
        <h3 class="text-sm font-medium text-gray-500">{category}</h3>
        <span class="text-gray-500 text-2xl">
          {expandedCategories[category] ? '▾' : '▸'}
        </span>
      </button>
      
      {#if expandedCategories[category]}
        <div class="grid grid-cols-2 gap-2">
          {#each items as item}
            <div
              class="flex items-center p-2 rounded cursor-grab hover:bg-gray-100 transition-colors border border-gray-200"
              role="button"
              tabindex="0"
              draggable="true"
              on:dragstart={(e) => handleDragStart(e, ELEMENT_TYPES[item.id]?.type || item.id)}
            >
              <div class="mr-2 flex-shrink-0">
                {#if ELEMENT_TYPES[item.id]?.svg}
                  <svelte:component this={ELEMENT_TYPES[item.id].svg} width="16" height="16" />
                {:else}
                  <span class="w-4 h-4 flex items-center justify-center">{categoryIcons[category] || '◯'}</span>
                {/if}
              </div>
              <span class="text-xs text-gray-700">{item.label}</span>
            </div>
          {/each}
        </div>
      {/if}
    </div>
  {/each}
</div>