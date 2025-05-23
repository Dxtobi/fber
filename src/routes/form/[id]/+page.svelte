<script>
    // @ts-nocheck
    import { onMount } from 'svelte';
    import * as FormElements from "../../../components/form-elements";
    import { publishedFormStore, publishedFormStoreLoading } from '../../../stores/publishedForm';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import Footer from '../../../components/landing/Footer.svelte';
        

    onMount(() => {
      publishedFormStore.set([...page.data.form.components]);
    });
    let elements = $state($publishedFormStore);
    let hasError= $state(false);
    let isLoading= $state(false);

    publishedFormStore.subscribe((value) => {
      elements = value;
    });
    
    $effect(()=>{
      $inspect(page.data)
    })
    
    function callFormSubmit(e) {
      e.preventDefault();
     try{
       publishedFormStoreLoading.update(()=>true)
      const result = {};
      hasError = false;
      elements.forEach(component => {
        const { properties } = component;
        if (properties && properties.label !== undefined && properties.value !== undefined) {
          const normalizedLabel = properties.label.toLowerCase().replace(/[^a-z]/g, '_');
          result[normalizedLabel] = {
            value: properties.value,
            originalLabel: properties.label
          };
            if (properties.required === true) {
            const value = properties.value;
            const isEmpty =
              value === undefined ||
              value === null ||
              (typeof value === "string" && value.trim() === "") ||
              (Array.isArray(value) && value.length === 0) ||
              (typeof value === "object" && !Array.isArray(value) && Object.keys(value).length === 0);

            if (isEmpty) {
              hasError = true;
            }
            }
        }
      });
      if (hasError) {
        alert("Please fill all required fields.");
        return;
      }

      
      saveFormData(result)
      return result;
     }catch(err){
      console.log(err.message)
     }finally{
      isLoading=false
     }
    }


    const saveFormData= async (data)=>{
       try {
      isLoading=true

      const res = await fetch('/api/protected/form?q=response', {
        method:'POST',
         headers: {
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({response:data, form:page.data.form._id})
      })

        const data_ = await res.json()
      if (res.ok) {
        console.log('User not authenticated: ', res.status);
        
        console.log(data_)
        goto(`/congratulations`)
      }
      
      isLoading=false

     
      // Dispatch the submit event with form data
    } catch (error) {
      isLoading=false

      console.error('Error submitting form:', error);
    }finally{
       publishedFormStoreLoading.update(()=>false)

    }
    }
</script>

<header class="fixed top-0 left-0 w-full backrop-filter shadow-md p-4 z-10 flex justify-between  bg-white">
  <!-- LOGO -->
  <img src="/logo-black.svg" alt="Logo" class="w-10 h-10  " />
  <!-- SIGNUP -->
  
</header>


<div class="w-full flex flex-col bg-gray-100 p-2  py-20 md:p-10 lg:p-20">
  <div class="w-full md:w-[60%] lg:w-[50%] m-auto px-4 md:px-0">
    <form onsubmit={callFormSubmit} class="space-y-6">
      {#each elements as element (element.id)}
      {@const Component = FormElements[element.component]}
        <div class="relative">
          <Component {element} {isLoading} />
          {#if element.properties?.required}
            <span class="absolute top-0 right-0 mt-1 mr-1 w-2 h-2 bg-red-500 rounded-full"></span>
          {/if}
        </div>
      {/each}
    </form>
  </div>
  
  <!-- Beautiful Footer -->
  <Footer/>
</div>