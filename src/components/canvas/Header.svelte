<script>
  import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
    let {showPreview, isLoading, formInfo} = $props();
    // Active tab tracking
    let activeTab = $state('fields');
    
    // Device type selection for preview
    let activeDevice = $state('mobile');
    
    // Close button action - you can replace with your own function
    const handleClose = () => {
      // Dispatch event for parent to handle closing the form builder
      dispatch('close');
      
    };
    
    // Last saved tracking
    let lastSaved = $state('Just now');
    
    
    // @ts-ignore
    const setActiveTab = (tab) => {
      activeTab = tab;
      
      // If preview is selected, you might want to trigger a preview generation
      if (tab === 'preview') {
        dispatch('triggerAction', { action: true });
        showPreview=true
      }else {
        dispatch('triggerAction', { action: false });

        showPreview=false
      }
    };

    const publishForm = () => {
      dispatch('publishForm');
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      lastSaved = `${hours}:${minutes}`;
    };

    const saveForm = () => {
      dispatch('saveForm');
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      lastSaved = `${hours}:${minutes}`;
    };
    
    // Device options for preview
    const deviceOptions = [
      { id: 'mobile', label: 'Mobile', icon: 'smartphone' },
      { id: 'tablet', label: 'Tablet', icon: 'tablet' },
      { id: 'desktop', label: 'Desktop', icon: 'monitor' }
    ];
    
    
  </script>
  
  <div class="bg-white border-b border-gray-200 shadow-sm">
    <!-- Top header with title and close button -->
    <div class="flex items-center justify-between px-4 pt-3 pb-2">
     <div class="flex items-center space-x-4">
        <a href={`/dashboard`}><img src="/logo.svg" alt="Logo" class="h-[60px] w-[60px] rounded-full" /></a>
        <div>
          <h1 class="text-lg font-semibold text-gray-800 capitalize">{formInfo?.formName}</h1>
          <p class="text-xs text-gray-500">{formInfo.description}</p>
        </div>
     </div>
      
      <div class="flex items-center space-x-4">
        <span class="text-xs text-gray-400">Changes saved {lastSaved}</span>
        <button 
          onclick={saveForm}
          class="rounded-full px-10 py-1 {isLoading? "bg-blue-200":"bg-blue-500"} text-white hover:bg-blue-600 transition-colors space-x-2 flex items-center"
          aria-label="Close form builder"
          disabled={isLoading}
        >
         <span>Save</span>
            {#if isLoading}
              <span class="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
            {:else}
              <iconify-icon icon="ic:round-save" ></iconify-icon>
            {/if}
        </button>
         <button 
          onclick={publishForm}
          class="rounded-full px-10 py-1 {isLoading? "bg-blue-200":"bg-blue-500"} text-white hover:bg-blue-600 transition-colors space-x-2 flex items-center"
          aria-label="Close form builder"
          disabled={isLoading}
        >
        <span>Publish</span>
        {#if isLoading}
          <span class="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
          {:else}
          <iconify-icon icon="ic:round-publish" ></iconify-icon>
         {/if}
         
        </button>
      </div>
    </div>
    
    <!-- Tabs navigation -->
    <div class="flex justify-center gap-10 border-b border-gray-200">
      <div class="flex">
        <button 
          class="px-4 py-2 text-sm font-medium {activeTab === 'fields' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}"
          onclick={() => setActiveTab('fields')}
        >
          Fields
        </button>
        
        <!-- <button 
          class="px-4 py-2 text-sm font-medium {activeTab === 'workflow' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}"
          onclick={() => setActiveTab('workflow')}
        >
          Workflow
        </button>
        
        <button 
          class="px-4 py-2 text-sm font-medium {activeTab === 'permissions' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}"
          onclick={() => setActiveTab('permissions')}
        >
          Permissions
        </button> -->
        
        <button 
          class="px-4 py-2 text-sm font-medium {activeTab === 'preview' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}"
          onclick={() => {setActiveTab('preview') }}
        >
          Preview
        </button>
      </div>
      
      <!-- Device type selector (only shown when preview tab is active) -->
      {#if activeTab === 'preview'}
        <div class="flex items-center mr-4">
          {#each deviceOptions as device}
            <button
              class="px-3 py-2 text-sm {activeDevice === device.id ? 'text-blue-600 bg-blue-50' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'} rounded-md transition-colors mx-0.5"
              onclick={() => {activeDevice = device.id; dispatch('setDeviceType', {device:device.id})}}
              title={device.label}
            >
              {#if device.id === 'mobile'}
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              {:else if device.id === 'tablet'}
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              {:else}
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              {/if}
            </button>
          {/each}
        </div>
      {/if}
    </div>
  </div>
  
  <!-- Optional: Emit the active tab and device info to parent component -->
  <svelte:options immutable={true} />