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
<svelte:head>
  <!-- Primary Meta Tags -->
  <title>FormInk - Build Smart Forms with AI-Powered Insights</title>
  <meta name="description" content="Create beautiful, responsive forms effortlessly with FormInk's drag-and-drop builder. Leverage AI-powered analytics to gain actionable insights and optimize your workflows." />
  <meta name="keywords" content="form builder, AI forms, smart forms, data analysis, drag-and-drop forms, online forms" />
  <meta name="author" content="FormInk Team" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <!-- Open Graph / Facebook Meta Tags -->
  <meta property="og:title" content="FormInk - Build Smart Forms with AI-Powered Insights" />
  <meta property="og:description" content="Create beautiful, responsive forms effortlessly with FormInk's drag-and-drop builder. Leverage AI-powered analytics to gain actionable insights and optimize your workflows." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://fber.vercel.app  " />
  <meta property="og:image" content="/favicon-black.png " />
  <meta property="og:image:alt" content="FormInk - Smart Form Builder with AI Features" />
  <meta property="og:site_name" content="FormInk" />

  <!-- Twitter Meta Tags -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="FormInk - Build Smart Forms with AI-Powered Insights" />
  <meta name="twitter:description" content="Create beautiful, responsive forms effortlessly with FormInk's drag-and-drop builder. Leverage AI-powered analytics to gain actionable insights and optimize your workflows." />
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
      "description": "Create beautiful, responsive forms effortlessly with FormInk's drag-and-drop builder. Leverage AI-powered analytics to gain actionable insights and optimize your workflows.",
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
