<script lang="ts">
	import '../app.css';
	import 'iconify-icon'
	let { children } = $props();
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
  <meta property="og:url" content="https://www.FormInk.com " />
  <meta property="og:image" content="https://www.FormInk.com/assets/images/og-image.png " />
  <meta property="og:image:alt" content="FormInk - Smart Form Builder with AI Features" />
  <meta property="og:site_name" content="FormInk" />

  <!-- Twitter Meta Tags -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="FormInk - Build Smart Forms with AI-Powered Insights" />
  <meta name="twitter:description" content="Create beautiful, responsive forms effortlessly with FormInk's drag-and-drop builder. Leverage AI-powered analytics to gain actionable insights and optimize your workflows." />
  <meta name="twitter:image" content="https://www.FormInk.com/assets/images/twitter-image.png " />
  <meta name="twitter:image:alt" content="FormInk - Smart Form Builder with AI Features" />
  <meta name="twitter:site" content="@FormFlowAI" />
  <meta name="twitter:creator" content="@FormFlowAI" />

  <!-- Canonical URL -->
  <link rel="canonical" href="https://www.FormInk.com " />

  <!-- Favicon -->
  <link rel="icon" type="image/png" href="/assets/images/favicon.png" />
  <link rel="apple-touch-icon" href="/assets/images/apple-touch-icon.png" />

  <!-- Additional Structured Data (JSON-LD) -->
  <script type="application/ld+json">
    {
      "@context": "https://schema.org ",
      "@type": "WebApplication",
      "name": "FormInk",
      "url": "https://www.FormInk.com ",
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
      "image": "https://www.FormInk.com/assets/images/og-image.png ",
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

<main class=" bg-gray-100"> 

	{@render children()}
</main>
