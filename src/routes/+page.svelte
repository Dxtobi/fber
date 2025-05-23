<script>
  import { onMount } from 'svelte';
	import Header from '../components/landing/Header.svelte';
	import FeatureIcons from '../components/landing/FeatureIcons.svelte';
	import Hero from '../components/landing/Hero.svelte';
	import Gallery from '../components/landing/Gallery.svelte';
	import Footer from '../components/landing/Footer.svelte';
	import FeaturesComp from '../components/landing/Features-comp.svelte';
  
  
  let mounted = $state(false);
  
  onMount(() => {
    mounted = true;
  })
  
  let features = $state([
    { 
      name: 'Drag & Drop', 
      icon: 'pixelarticons:drag-and-drop',
      description: 'Easily arrange elements with our intuitive drag and drop interface. No coding required.'
    },
    { 
      name: 'Templates', 
      icon: 'icon-park-twotone:page-template',
      description: 'Start quickly with our pre-designed templates for any use case or industry.'
    },
    { 
      name: 'Logic', 
      icon: 'carbon:logical-partition',
      description: 'Build complex workflows with our powerful logic engine. Connect your data seamlessly.'
    },
    { 
      name: 'Analytics', 
      icon: 'hugeicons:analytics-up',
      description: 'Gain valuable insights with comprehensive analytics and reporting tools.'
    },
    { 
      name: 'Integrations', 
      icon: 'stash:integrations',
      description: 'Connect with your favorite tools and services through our extensive integration library.'
    },
    { 
      name: 'Responsive', 
      icon: 'mdi:responsive',
      description: 'Create designs that look perfect on any device, from desktop to mobile.'
    },
    { 
      name: 'Secure', 
      icon: 'healthicons:ui-secure',
      description: 'Rest easy knowing your data is protected with enterprise-grade security features.'
    }
  ]);
</script>

<div class="min-h-screen bg-white">
  <div class="">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <Header />
    </div>
    <main>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Hero {mounted} />
      <FeatureIcons {mounted} />
    </div>
    <Gallery {mounted} />
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <FeaturesComp {features} />
    </div>
    </main>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Footer/>
    </div>
  </div>
</div>
