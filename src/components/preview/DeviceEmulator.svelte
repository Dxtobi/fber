<!-- DeviceSimulator.svelte -->
<script>
    // @ts-nocheck
    import { onMount } from 'svelte';
    import * as FormElements from "../form-elements/index";
    import { ELEMENT_TYPES } from '$lib/elementTypes';
    import { formStore } from '../../stores/formStore';
    
    // Props for the component
    let {defaultDevice} = $props() // Default selected device
    $effect(()=>{
      
      if (containerWidth && containerHeight) {
        updateScale();
      }
    })
    
    // Device dimensions (in pixels)
    const devices = {
      mobile: { width: 375, height: 667, name: "Mobile", icon: "smartphone" },
      tablet: { width: 768, height: 1024, name: "Tablet", icon: "tablet" },
      desktop: { width: 1280, height: 800, name: "Desktop", icon: "monitor" }
    };
    
    // Current selected device
    let selectedDevice = $derived(defaultDevice);
    
    // Set scale based on container size
    let containerWidth = $state(null);
    let containerHeight=$state(null);;
    let scale =$state(1);
    let deviceContainer=$state(null);;
    
    // Function to update scale
    function updateScale() {
      if (!deviceContainer) return;
      
      const currentDevice = devices[selectedDevice];
      const containerRect = deviceContainer.getBoundingClientRect();
      
      // Calculate scale based on container dimensions with some padding
      const horizontalScale = (containerRect.width - 80) / currentDevice.width;
      const verticalScale = (containerRect.height - 80) / currentDevice.height;
      
      // Use the smaller scale to ensure the device fits within the container
      scale = Math.min(horizontalScale, verticalScale, 1);
    }
    
    // Function to switch device
    function switchDevice(device) {
      selectedDevice = device;
      updateScale();
    }
    
    // Update scale on window resize
    
    // Watch for container size changes
    
  
    // Subscribe to form elements from store
    let elements = $formStore;
    formStore.subscribe((value) => {
      elements = value;
    });

    onMount(() => {
      updateScale();
      window.addEventListener('resize', updateScale);
      
      elements = $formStore;
      return () => {
        window.removeEventListener('resize', updateScale);
      };
    });
    
  </script>
  
  <div class="device-simulator w-full h-full flex flex-col bg-gray-100  overflow-hidden">
    <!-- Toolbar -->
    <div class="toolbar bg-gray-200 text-gray-500 p-4 flex items-center justify-between">
      <div class="text-xl font-bold text-center w-full">Device Simulator</div>
      
    </div>
    
    <!-- Simulator area -->
    <div
      class="simulator-container flex-1 overflow-hidden flex items-center justify-center p-8"
      bind:clientWidth={containerWidth}
      bind:clientHeight={containerHeight}
      bind:this={deviceContainer}
    >
      <div class="device-frame relative" style="transform: scale({scale});">
        <!-- Device frame -->
        {#if selectedDevice === 'mobile'}
          <div class="device mobile-device bg-black rounded-3xl relative overflow-hidden shadow-2xl p-2" 
            style="width: {devices.mobile.width}px; height: {devices.mobile.height}px;">
            <!-- Notch -->
            <div class="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-7 bg-black rounded-b-xl z-10"></div>
            <!-- Content -->
            <div class="w-full h-full bg-gray-100 flex flex-col rounded-3xl overflow-auto p-4">
              {#each elements as element (element.id)}
                <svelte:component this={FormElements[element.component]} {element} />
              {/each}
            </div>
            <!-- Home indicator -->
            <div class="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-white rounded-full z-10"></div>
          </div>
        {:else if selectedDevice === 'tablet'}
          <div class="device tablet-device bg-black p-2 rounded-2xl relative overflow-hidden shadow-2xl justify-center items-center" 
            style="width: {devices.tablet.width}px; height: {devices.tablet.height}px;">
            <!-- Camera -->
            <div class="absolute top-3 left-1/2 transform -translate-x-1/2 w-16 h-2 bg-gray-700 rounded-full z-10"></div>
            <!-- Content -->
            <div class="w-full h-full bg-gray-100 flex rounded-2xl p-10 flex-col overflow-auto">
              {#each elements as element (element.id)}
              {console.log(element)}
                <svelte:component this={FormElements[element.component]} {element} />
              {/each}
            </div>
            <!-- Home button -->
            <div class="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-8 h-8 border-2 border-gray-400 rounded-full z-10"></div>
          </div>
        {:else}
          <div class="device desktop-device bg-gray-800 rounded-lg relative overflow-hidden shadow-2xl p-2" 
            style="width: {devices.desktop.width}px; height: {devices.desktop.height}px;">
            <!-- Top bar -->
            <div class="absolute top-0 left-0 right-0 h-6 bg-gray-700 flex items-center px-2 z-10">
              <div class="flex space-x-1">
                <div class="w-3 h-3 bg-red-500 rounded-full"></div>
                <div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div class="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
            </div>
            <!-- Content -->
            <div class="w-full h-full pt-6 bg-gray-100 flex flex-col overflow-auto p-10">
              {#each elements as element (element.id)}
                <svelte:component this={FormElements[element.component]} {element} from="preview" />
              {/each}
            </div>
          </div>
        {/if}
      </div>
    </div>
    
    <!-- Status bar -->
    <div class="status-bar bg-gray-700 text-white p-2 text-sm flex justify-between">
      <div>Resolution: {devices[selectedDevice].width} × {devices[selectedDevice].height}</div>
      <div>Scale: {Math.round(scale * 100)}%</div>
    </div>
  </div>