<script>
    // @ts-nocheck
    import { onMount } from 'svelte';
    import * as FormElements from "../../../components/form-elements";
    import { formStore } from '../../../stores/formStore';
        
    let elements = $state($formStore);
    
    formStore.subscribe((value) => {
      elements = value;
    });
    
    $effect(()=>{
      $inspect(elements)
    })
    
    function callFormSubmit() {
      const result = {};

      elements.forEach(component => {
        const { properties } = component;
        if (properties && properties.label !== undefined && properties.value !== undefined) {
          const normalizedLabel = properties.label.toLowerCase().replace(/[^a-z]/g, '_');
          result[normalizedLabel] = {
            value: properties.value,
            originalLabel: properties.label
          };
        }
      });

      console.log(result)
      return result;
    }
</script>

<div class="w-full flex flex-col bg-gray-100 p-2  py-20 md:p-10 lg:p-20">
  <div class="sm:w-full md:w-[60%] lg:w-[50%] m-auto">
    <form onsubmit={callFormSubmit}>
      {#each elements as element (element.id)}
      {@const Component = FormElements[element.component]}
        <Component {element} />
      {/each}
    </form>
  </div>
  
  <!-- Beautiful Footer -->
  <footer class="mt-16 pt-8 border-t border-gray-300">
    <div class="flex flex-col md:flex-row justify-between items-center gap-6">
      <div class="flex items-center">
        <h3 class="text-2xl font-bold text-gray-600  ">
          TENX
        </h3>
      </div>
      
      <div class="text-center md:text-right text-gray-600">
        <p class="text-gray-600 font-medium">POWERED BY <span class="text-gray-600 font-bold">TENX TECH</span></p>
        <p class="text-sm text-gray-500 mt-1">© {new Date().getFullYear()} TENX Technology. All rights reserved.</p>
      </div>
    </div>
    
    <div class="mt-6 flex flex-wrap justify-center  w-full gap-4">
      <a href="#" class="text-gray-600 hover:text-indigo-700 transition-colors duration-300">Home</a>
      <a href="#" class="text-gray-600 hover:text-indigo-700 transition-colors duration-300">About</a>
      <a href="#" class="text-gray-600 hover:text-indigo-700 transition-colors duration-300">Services</a>
      <a href="#" class="text-gray-600 hover:text-indigo-700 transition-colors duration-300">Contact</a>
      <a href="#" class="text-gray-600 hover:text-indigo-700 transition-colors duration-300">Privacy Policy</a>
    </div>
  </footer>
</div>