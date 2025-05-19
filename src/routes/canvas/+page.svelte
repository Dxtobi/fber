<script>

  import { formStore } from '$lib/stores/formStore';
	import Canvas from '../../components/canvas/Canvas.svelte';
	import Header from '../../components/canvas/Header.svelte';

	import Sidebar from '../../components/canvas/Sidebar.svelte';
	import PropertyEditor from '../../components/editor/PropertyEditor.svelte';
	import DeviceEmulator from '../../components/preview/DeviceEmulator.svelte';

    
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
  let showPreview = false
  let defaultDevice = "mobile"
  

	/**
	 * @param {{ detail: { device: string; }; }} e
	 */
	function callPreviewDeviceUpdate(e) {
		defaultDevice = e.detail.device
    console.log("FROM PAGE: ", defaultDevice)
	}
</script>
  
  <div class="flex flex-col h-screen ">
    
    <Header showPreview={showPreview} on:triggerAction={(bool) => showPreview = bool.detail.action} on:setDeviceType={callPreviewDeviceUpdate} />
    {#if showPreview}
      <DeviceEmulator {defaultDevice}/>
    {:else}

    
    <main class="flex flex-1 overflow-hidden">
      
      <Sidebar />
      <Canvas />
      <PropertyEditor />
    </main>
    {/if}
  </div>