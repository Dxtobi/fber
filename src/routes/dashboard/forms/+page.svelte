<script>

	import {  invalidateAll } from "$app/navigation";
	import { page } from "$app/state";
    import { PUBLIC_BASE_URL } from '$env/static/public';

    let pageData = $derived(page.data)
    let forms = $derived(pageData.forms || [])
    let deletedForms = $derived(pageData.deletedForms || [])
    let archivedForms = $derived(pageData.archivedForms || [])
    let publishedForms = $derived(pageData.publishedForms || [])
    
    let activeTab = $state('draft')
    let show_confirm_delete = $state(false)
    let form_id_to_be_delete = $state('')
    let isLoading = $state(false)
    let openDropdowns = $state(new Set())

    // Tab configuration
    const tabs = [
        { id: 'draft', label: 'Draft Forms', data: () => forms, color: 'blue' },
        { id: 'published', label: 'Published Forms', data: () => publishedForms, color: 'green' },
        { id: 'archived', label: 'Archived Forms', data: () => archivedForms, color: 'yellow' },
        { id: 'deleted', label: 'Deleted Forms', data: () => deletedForms, color: 'red' }
    ]

    const statusOptions = [
        { value: 'draft', label: 'Draft', color: 'bg-blue-500' },
        { value: 'published', label: 'Published', color: 'bg-green-500' },
        { value: 'archived', label: 'Archived', color: 'bg-yellow-500' },
        { value: 'deleted', label: 'Deleted', color: 'bg-red-500' }
    ]

    let currentForms = $derived((tabs.find(tab => tab.id === activeTab)?.data || (() => []))())

    const deleteForm = async() => {
        try {
            isLoading = true
            const res = await fetch('/api/protected/form?q=delete', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({id: form_id_to_be_delete})
            })
        } catch (error) {
             // @ts-ignore
            console.log(error.message)
        } finally {
            isLoading = false
            form_id_to_be_delete = ''
            show_confirm_delete = false
            invalidateAll()
        }
    }

    const confirmDeleteForm = (/** @type {string} */ id) => {
        show_confirm_delete = true
        form_id_to_be_delete = id
    }

    const cancelDeleteForm = () => {
        show_confirm_delete = false
        form_id_to_be_delete = ''
    }

    const toggleDropdown = (/** @type {any} */ formId) => {
        const newSet = new Set(openDropdowns)
        if (newSet.has(formId)) {
            newSet.delete(formId)
        } else {
            newSet.add(formId)
        }
        openDropdowns = newSet
    }

    const updateFormStatus = async (/** @type {any} */ formId, /** @type {string} */ newStatus) => {
        try {
            const res = await fetch('/api/protected/form?q=status', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({id: formId, status: newStatus})
            })
            
            if (res.ok) {
                // Close dropdown
                const newSet = new Set(openDropdowns)
                newSet.delete(formId)
                openDropdowns = newSet
                // activeTab=newStatus
                // Refresh data
                invalidateAll()
            }
        } catch (error) {
             // @ts-ignore
            console.log('Error updating form status:', error.message)
        }
    }

    const getStatusColor = (/** @type {string} */ status) => {
        const option = statusOptions.find(opt => opt.value === status)
        return option ? option.color : 'bg-gray-500'
    }

    const getStatusLabel = (/** @type {string} */ status) => {
        const option = statusOptions.find(opt => opt.value === status)
        return option ? option.label : status
    }

    // Close dropdowns when clicking outside
    // @ts-ignore
    const handleClickOutside = ( event) => {
        if (!event.target.closest('.custom-dropdown')) {
            openDropdowns = new Set()
        }
    }
</script>

<svelte:window onclick={handleClickOutside} />

<div class="w-full max-w-7xl mx-auto p-4">
    <!-- Tabs Navigation -->
    <div class="mb-8 flex justify-center items-center">
        <div class="relative  p-2 h-fit rounded-full ">
            <!-- Background slider for active tab -->
            <div 
                class="absolute top-[6px] h-10 bg-white shadow-xl  rounded-full transition-all duration-300 ease-out"
                style="width: {100 / tabs.length}%; left: {(tabs.findIndex(tab => tab.id === activeTab) * 100) / tabs.length}%; transform: translateX({2}px);"
            ></div>
            
            <nav class="relative flex" aria-label="Tabs">
                {#each tabs as tab, index}
                    <button
                        class="relative z-10 cursor-pointer flex items-center justify-center px-6 py-2 text-sm font-medium transition-all duration-300 ease-out whitespace-nowrap {
                            activeTab === tab.id
                                ? 'text-gray-700 '
                                : 'text-gray-600  hover:text-gray-900 '
                        }"
                        onclick={() => activeTab = tab.id}
                    >
                        <!-- Tab Icon -->
                        <div class="flex items-center space-x-2">
                            {#if tab.id === 'active'}
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            {:else if tab.id === 'published'}
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                                </svg>
                            {:else if tab.id === 'archived'}
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                                </svg>
                            {:else}
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            {/if}
                            
                            <span class="hidden sm:inline">{tab.label.replace(' Forms', '')}</span>
                        </div>
                        
                        <!-- Count Badge -->
                        <span class="ml-2 inline-flex items-center justify-center w-5 h-5 text-xs font-bold rounded-full {
                            activeTab === tab.id
                                ? 'bg-white/20 text-white dark:bg-black/20 dark:text-gray-900'
                                : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                        } transition-all duration-300">
                            {tab.data().length}
                        </span>
                    </button>
                {/each}
            </nav>
        </div>
    </div>

    <!-- Forms Grid -->
    <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {#each currentForms as form}
            <div class="bg-white  shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl overflow-hidden min-w-[300px]">
                <div class="p-6">
                    <!-- Form Header with Status Dropdown -->
                    <div class="flex justify-between items-start mb-4">
                        <div class="flex-1">
                            <h3 class="font-bold text-xl text-gray-900  capitalize mb-2">
                                {form.formName}
                            </h3>
                            <p class="text-gray-600  text-sm line-clamp-2">
                                {form.description || 'No description available'}
                            </p>
                        </div>
                        
                        <!-- Custom Status Dropdown -->
                        <div class="custom-dropdown relative ml-4">
                            <button
                                class="flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium text-white transition-colors duration-200 {getStatusColor(form.status || activeTab)}"
                                onclick={() => toggleDropdown(form._id)}
                            >
                                <span class="capitalize">{getStatusLabel(form.status || activeTab)}</span>
                                <svg class="w-3 h-3 transition-transform duration-200 {openDropdowns.has(form._id) ? 'rotate-180' : ''}" 
                                     fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            
                            {#if openDropdowns.has(form._id)}
                                <div class="absolute right-0 mt-2 w-48 back-blur rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 z-50">
                                    <div class="py-1">
                                        {#each statusOptions as option}
                                            <button
                                                class="flex items-center w-full px-4 py-2 text-sm text-gray-700 cursor-pointer transition-colors duration-200"
                                                onclick={() => updateFormStatus(form._id, option.value)}
                                            >
                                                <div class="w-3 h-3 rounded-full {option.color} mr-3"></div>
                                                {option.label}
                                            </button>
                                        {/each}
                                    </div>
                                </div>
                            {/if}
                        </div>
                    </div>

                    <!-- Form Preview -->
                    <div class="h-24 mb-4 rounded-lg bg-gray-100 flex items-center justify-center">
                        <svg class="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>

                    <!-- Form Actions -->
                    <div class="flex justify-between items-center">
                        <div class="w-full">
                            {#if form.status === 'published'}
                            <div class="flex space-x-2 justify-between w-full  py-2 rounded-lg">
                                <a href="/dashboard/analytics/{form._id}" 
                                   class="inline-flex items-center px-4 py-2 cursor-pointer bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-full transition-colors duration-200">
                                   <iconify-icon icon="hugeicons:market-analysis" width="24" height="24"  style="color: #fff"></iconify-icon>
                                    Analytics
                                </a>
                                <button 
                                    onclick={() => navigator.clipboard.writeText(`${PUBLIC_BASE_URL}/form/${form.link}`)} 
                                   class="inline-flex items-center px-4 py-2 cursor-pointer bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-full transition-colors duration-200">
                                    <iconify-icon icon="mdi:share" width="24" height="24"  style="color: #fff"></iconify-icon>
                                    Share
                                </button>
                            </div>
                            {:else}
                                <a href="/canvas/{form._id}" 
                                   class="inline-flex items-center px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-sm font-medium rounded-full transition-colors duration-200">
                                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                                              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                    Publish
                                </a>
                            {/if}
                        </div>
                        
                        <!-- Delete Button -->
                        {#if form.status === 'deleted'}
                        <button 
                            onclick={() => confirmDeleteForm(form._id)}
                            class="p-2 text-gray-400 hover:text-red-500 transition-colors duration-200 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20">
                            <small class="sr-only">Delete</small>
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                        {/if}
                    </div>

                    <!-- Creation Date -->
                    <div class="mt-4 pt-4 border-t border-gray-200">
                        <p class="text-xs text-gray-500 dark:text-gray-400">
                            Created: {new Date(form.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                </div>
            </div>
        {/each}
        
        {#if currentForms.length === 0}
            <div class="col-span-full flex flex-col items-center justify-center py-12">
                <svg class="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 class="text-lg font-medium text-gray-900 ">No forms found</h3>
                <p class="text-gray-500 text-center">
                    {#if activeTab === 'active'}
                        You haven't created any forms yet. Create your first form to get started.
                    {:else if activeTab === 'published'}
                        No published forms yet. Publish a form to see it here.
                    {:else if activeTab === 'archived'}
                        No archived forms. Archive forms you want to keep but don't actively use.
                    {:else}
                        No deleted forms. Deleted forms will appear here.
                    {/if}
                </p>
            </div>
        {/if}
    </section>
</div>

<!-- Delete Confirmation Modal -->
{#if show_confirm_delete}
    <div class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md overflow-hidden transform transition-all"
             role="dialog" aria-modal="true" aria-labelledby="modal-title">
            
            <!-- Modal header -->
            <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <h3 id="modal-title" class="text-lg font-medium text-red-600 dark:text-red-400">
                    Delete Form
                </h3>
                <button type="button" 
                        class="text-gray-400 hover:text-gray-500 focus:outline-none rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onclick={cancelDeleteForm}>
                    <small class="sr-only">Close</small>
                    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            
            <!-- Modal body -->
            <div class="px-6 py-4">
                <div class="flex items-center">
                    <div class="flex-shrink-0">
                        <svg class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.08 14.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                    </div>
                    <div class="ml-3">
                        <h3 class="text-lg font-medium text-gray-900 dark:text-white">Are you sure?</h3>
                        <p class="mt-2 text-sm text-gray-600 dark:text-gray-300">
                            This action cannot be undone. This will permanently delete the form and all associated data.
                        </p>
                    </div>
                </div>
            </div>
            
            <!-- Modal footer -->
            <div class="px-6 py-4 bg-gray-50 dark:bg-gray-700 flex justify-end space-x-3">
                <button type="button"
                        class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-md hover:bg-gray-50 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                        onclick={cancelDeleteForm}>
                    Cancel
                </button>
                <button type="button"
                        class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200 disabled:opacity-50"
                        onclick={deleteForm}
                        disabled={isLoading}>
                    {#if isLoading}
                        <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    {/if}
                    Delete
                </button>
            </div>
        </div>
    </div>
{/if}

<style>
    .back-blur{
        backdrop-filter: blur(15px);
        background-color: rgba(0, 0, 0, 0.035);
    }
</style>