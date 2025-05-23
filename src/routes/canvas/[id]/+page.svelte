<script>
	import { page } from '$app/state';
	import { onMount } from 'svelte';



	import Canvas from '../../../components/canvas/Canvas.svelte';
	import Header from '../../../components/canvas/Header.svelte';

	import Sidebar from '../../../components/canvas/Sidebar.svelte';
	import PropertyEditor from '../../../components/editor/PropertyEditor.svelte';
	import DeviceEmulator from '../../../components/preview/DeviceEmulator.svelte';
	import { formStore } from '../../../stores/formStore';

  let isLoading = $state(false);
  let formInfo = $derived(page.data.form)
    
  async function saveForm() {
    try {
    isLoading=true
      const response = await fetch('/api/protected/form?q=saveForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({id:formInfo._id, components:$formStore})
      });
      
      const result = await response.json();
      alert(result.message);
      isLoading=false
    } catch (error) {
      console.error('Error saving form:', error);
      alert('Failed to save form');
      isLoading=false
    }
  }
  
  async function publishForm() {
    await saveForm()
    try {
      isLoading=true
      const response = await fetch('/api/protected/form?q=publishForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({id:formInfo._id, ...$formStore})
      });
      
      const result = await response.json();
      alert(result.message);
      isLoading=false

    } catch (error) {
      console.error('Error publishing form:', error);
      alert('Failed to publish form');
      isLoading=false

    }
  }
  let showPreview = $state(false);
  let defaultDevice = $state("mobile");
  

	/**
	 * @param {{ detail: { device: string; }; }} e
	 */
	function callPreviewDeviceUpdate(e) {
		defaultDevice = e.detail.device
    console.log("FROM PAGE: ", defaultDevice)
	}

  onMount(()=>{
   if(formInfo.components){
    console.log(formInfo.components, '---')
     // @ts-ignore
    formStore.update((currentElements) => [...formInfo.components]);
   }
  })
</script>
  
  <div class="flex flex-col h-screen ">
    
    <Header 
        showPreview={showPreview} 
        formInfo={formInfo}
        on:triggerAction={(bool) => showPreview = bool.detail.action} 
        on:setDeviceType={callPreviewDeviceUpdate}
        on:saveForm={saveForm}
        on:publishForm={publishForm}
        {isLoading}
         />
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