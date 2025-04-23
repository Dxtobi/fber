<script>
    import Sidebar from '$lib/components/Sidebar.svelte';
    import Canvas from '$lib/components/Canvas.svelte';
    import PropertiesPanel from '$lib/components/PropertiesPanel.svelte';
    import { formStore } from '$lib/stores/formStore';
    
    async function saveForm() {
    try {
      const response = await fetch('/api/saveForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify($formStore)
      });
      
      const result = await response.json();
      alert(result.message);
    } catch (error) {
      console.error('Error saving form:', error);
      alert('Failed to save form');
    }
  }
  
  async function publishForm() {
    try {
      const response = await fetch('/api/publishForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify($formStore)
      });
      
      const result = await response.json();
      alert(result.message);
    } catch (error) {
      console.error('Error publishing form:', error);
      alert('Failed to publish form');
    }
  }
  </script>
  
  <div class="flex flex-col h-screen">
    <header class="bg-gray-800 text-white p-4">
      <div class="container mx-auto flex justify-between items-center">
        <h1 class="text-2xl font-bold">Form Builder</h1>
        <div class="space-x-2">
          <button
            on:click={saveForm}
            class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Save
          </button>
          <button
            on:click={publishForm}
            class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          >
            Publish
          </button>
        </div>
      </div>
    </header>
    
    <main class="flex flex-1 overflow-hidden">
      <Sidebar />
      <Canvas />
      <PropertiesPanel />
    </main>
  </div>