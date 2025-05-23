<script>
    // @ts-nocheck
  import { onMount } from 'svelte';
  import * as FormElements from "../../../components/form-elements";
  import { publishedFormStore, publishedFormStoreLoading } from '../../../stores/publishedForm';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import Footer from '../../../components/landing/Footer.svelte';
	import Congrats from '../../congratulations/Congrats.svelte';
        

    onMount(() => {
      publishedFormStore.set([...page.data.form.components]);
    });
    let elements = $state($publishedFormStore);
    let hasError= $state(false);
    let isLoading= $state(false);
    let show=$state(false);
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
      
        publishedFormStore.set([...page.data.form.components]);
        console.log(data_)
        goto(`/congratulations`)
        window.location.href='/congratulations'
        show=true
        isLoading=false
      }
      

     
      // Dispatch the submit event with form data
    } catch (error) {
      isLoading=false

      console.error('Error submitting form:', error);
    }finally{
       publishedFormStoreLoading.update(()=>false)

    }
    }
</script>
<svelte:head>
  <!-- Primary Meta Tags -->
  <title>FormInk - Build Smart Forms with AI-Powered Insights</title>
  <meta name="description" content={page.data.form.description||"Create beautiful, responsive forms effortlessly with FormInk's drag-and-drop builder. Leverage AI-powered analytics to gain actionable insights and optimize your workflows."} />
  <meta name="keywords" content="form builder, AI forms, smart forms, data analysis, drag-and-drop forms, online forms" />
  <meta name="author" content="FormInk Team" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <!-- Open Graph / Facebook Meta Tags -->
  <meta property="og:title" content="FormInk - Build Smart Forms with AI-Powered Insights" />
  <meta property="og:description" content={page.data.form.description||"Create beautiful, responsive forms effortlessly with FormInk's drag-and-drop builder. Leverage AI-powered analytics to gain actionable insights and optimize your workflows."} />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://fber.vercel.app  " />
  <meta property="og:image" content="/favicon-black.png " />
  <meta property="og:image:alt" content="FormInk - Smart Form Builder with AI Features" />
  <meta property="og:site_name" content="FormInk" />

  <!-- Twitter Meta Tags -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="FormInk - Build Smart Forms with AI-Powered Insights" />
  <meta name="twitter:description" content={page.data.form.description||"Create beautiful, responsive forms effortlessly with FormInk's drag-and-drop builder. Leverage AI-powered analytics to gain actionable insights and optimize your workflows."} />
  <meta name="twitter:image" content="/favicon-black.png " />
  <meta name="twitter:image:alt" content="FormInk - Smart Form Builder with AI Features" />
  <meta name="twitter:site" content="@FormInk" />
  <meta name="twitter:creator" content="@FormInk" />

  <!-- Canonical URL -->
  <link rel="canonical" href="https://fber.vercel.app  " />

  <!-- favicon-black -->
  <link rel="icon" type="image/png" href="/favicon-black.png" />
  <link rel="apple-touch-icon" href="/favicon-black.png" />

  <!-- Additional Structured Data (JSON-LD) -->
  <script type="application/ld+json">
    {
      "@context": "https://schema.org ",
      "@type": "WebApplication",
      "name": "FormInk",
      "url": "https://fber.vercel.app ",
      "description":page.data.form.description||"Create beautiful, responsive forms effortlessly with FormInk's drag-and-drop builder. Leverage AI-powered analytics to gain actionable insights and optimize your workflows.",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Any",
      "browserRequirements": "Requires JavaScript and HTML5 support",
      "featureList": [
        "AI-powered analytics",
        "Drag-and-drop form builder",
        "Responsive design",
        "Real-time collaboration",
        "Customizable templates"
      ],
      "image": "https://fber.vercel.app/logo-black.svg ",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock ",
        "seller": {
          "@type": "Organization",
          "name": "FormInk"
        }
      }
    }
  </script>
</svelte:head>
<header class="fixed top-0 left-0 w-full backrop-filter shadow-md p-4 z-10 flex justify-between  bg-white">
  <!-- LOGO -->
 <a href="/">
 <img src="/logo-black.svg" alt="Logo" class="w-10 h-10  " />
</a>
  <!-- SIGNUP -->
  
</header>
{#if show}
<Congrats/>
{:else}
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
{/if}