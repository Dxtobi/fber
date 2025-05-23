<script lang="ts">
  interface Props {
    mounted?: boolean;
  }

  let { mounted = false }: Props = $props();
  
  let isHovered = $state(false);
  
  function handleMouseEnter() {
    isHovered = true;
  }
  
  function handleMouseLeave() {
    isHovered = false;
  }
</script>

<section class="py-16 md:py-24 text-center">
  <div class="max-w-4xl mx-auto">
    <div class="mb-2 flex justify-center">
      <div 
        class="inline-flex items-center rounded-full px-3 py-1 text-sm bg-gray-100 text-gray-800 transition-all duration-700 transform"
        class:translate-y-0={mounted}
        class:opacity-100={mounted}
        class:-translate-y-10={!mounted}
        class:opacity-0={!mounted}
      >
        <span class="bg-gray-900 rounded-full w-2 h-2 mr-2"></span>
        <span>Form builder release v0.1</span>
        <span class="ml-2">✨</span>
      </div>
    </div>
    
    <h1 
      class="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight transition-all duration-700 transform"
      class:translate-y-0={mounted}
      class:opacity-100={mounted}
      class:-translate-y-16={!mounted}
      class:opacity-0={!mounted}
      style="transition-delay: 200ms"
    >
      Effortless Forms,<br />
      <span class="text-gray-900">Beautiful Results in Minutes!</span>
    </h1>
    
    <p 
      class="text-xl text-gray-600 mb-10 max-w-2xl mx-auto transition-all duration-700 transform"
      class:translate-y-0={mounted}
      class:opacity-100={mounted}
      class:-translate-y-16={!mounted}
      class:opacity-0={!mounted}
      style="transition-delay: 400ms"
    >
      Create the ultimate form experience with Formink. 
      Our intuitive builder makes creating stunning, functional forms a breeze.
    </p>
    
    <a href="/auth" 
      class="bg-gray-900 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-800 transition-all duration-300 transform"
      class:translate-y-0={mounted}
      class:opacity-100={mounted}
      class:-translate-y-16={!mounted}
      class:opacity-0={!mounted}
      style="transition-delay: 600ms"
      onmouseenter={handleMouseEnter}
      onmouseleave={handleMouseLeave}
      class:scale-105={isHovered}
    >
      Get Started
    </a>
    
    <p 
      class="text-sm text-gray-500 mt-4 transition-all duration-700 transform"
      class:translate-y-0={mounted}
      class:opacity-100={mounted}
      class:-translate-y-16={!mounted}
      class:opacity-0={!mounted}
      style="transition-delay: 800ms"
    >
      ✓ Free to start, no credit card required.
    </p>
  </div>
</section>
