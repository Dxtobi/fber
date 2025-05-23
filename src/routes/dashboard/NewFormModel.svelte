<script>
	import { goto } from '$app/navigation';
  import { createEventDispatcher } from 'svelte';
  
  // Props
  export let isOpen = false;
  export let initialFormData = {
    name: '',
    description: '',
    components: []
  };
  
  // Local state
  let formData = { ...initialFormData };
  
  // Event dispatcher
  const dispatch = createEventDispatcher();
  
  // Close modal function
  function closeModal() {
    isOpen = false;
    dispatch('close');
  }
  let isLoading =false
  // Handle form submission
  async function handleSubmit() {
    try {
      isLoading=true

      const res = await fetch('/api/protected/form?q=newForm', {
        method:'POST',
         headers: {
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(formData)
      })

        const data = await res.json()
      if (res.ok) {
        console.log('User not authenticated: ', res.status);
        formData = { ...initialFormData };
        dispatch('submit', formData);
        console.log(data)
        goto(`/canvas/${data.data._id}`)
      }
      
      isLoading=false

     
      // Dispatch the submit event with form data
    } catch (error) {
      isLoading=false

      console.error('Error submitting form:', error);
    }
  }
  
  // Handle click outside modal to close it
  // @ts-ignore
  function handleOutsideClick(event) {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  }
  
  // Handle escape key to close modal
  // @ts-ignore
  function handleKeydown(event) {
    if (event.key === 'Escape') {
      closeModal();
    }
  }
</script>

<svelte:window on:keydown={handleKeydown} />

{#if isOpen}
  <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
  <div 
    class="fixed inset-0 back-blur  bg-opacity-50 z-40 flex items-center justify-center p-4"
    on:click={handleOutsideClick}
    on:keydown={handleKeydown}
    role="presentation"
    tabindex="0"
  >
    <div 
      class="bg-white dark:bg-[#1A1A1A] rounded-lg shadow-xl w-full max-w-md overflow-hidden transform transition-all"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <!-- Modal header -->
      <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <h3 id="modal-title" class="text-lg font-medium text-gray-900 dark:text-white">
          Create New Form
        </h3>
        <button
          type="button"
          class="text-gray-400 hover:text-gray-500 focus:outline-none"
          on:click={closeModal}
        >
          <span class="sr-only">Close</span>
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <!-- Modal body -->
      <div class="px-6 py-4">
        <form on:submit|preventDefault={handleSubmit} class="space-y-4">
          <!-- Name field -->
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Form Name
            </label>
            <input
              type="text"
              id="name"
              bind:value={formData.name}
              required
              class="mt-1 block w-full rounded-full border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-[#242425] dark:border-gray-600 dark:text-white"
              placeholder="Enter form name"
            />
          </div>
          
          <!-- Description field -->
          <div>
            <label for="description" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Description
            </label>
            <textarea
              id="description"
              bind:value={formData.description}
              rows="3"
              class="mt-1 block w-full rounded-2xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-[#242425] dark:border-gray-600 dark:text-white"
              placeholder="Enter form description"
            ></textarea>
          </div>
          
          <!-- Components field -->
          <div>
           
           
          </div>
        </form>
      </div>
      
      <!-- Modal footer -->
      <div class="px-6 py-4 bg-[#242425] text-right space-x-2">
        <button
          type="button"
          class="px-4 py-2 bg-white border border-gray-300 rounded-md font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-white dark:border-gray-500 dark:hover:bg-gray-500"
          on:click={closeModal}
        >
          Cancel
        </button>
        <button
          type="button"
          class="px-4 py-2 bg-blue-600 border border-transparent rounded-md font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          on:click={handleSubmit}
        >
         {#if isLoading}
              <span class="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
          {/if}
          Save
        </button>
      </div>
    </div>
  </div>
{/if}


<style>
    .back-blur{
        backdrop-filter: blur(15px);
        background-color: rgba(0, 0, 0, 0.297);
    }
</style>