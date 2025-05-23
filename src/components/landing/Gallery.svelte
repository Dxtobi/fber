<script lang="ts">
  interface Props {
    mounted?: boolean;
  }

  let { mounted = false }: Props = $props();
  
  // Original images
  let images = [
    { src: '/logo-black.svg?height=200&width=300', alt: 'Form template 1' },
    { src: '/logo-black.svg?height=200&width=300', alt: 'Form template 2' },
    { src: '/logo-black.svg?height=200&width=300', alt: 'Form template 3' },
    { src: '/logo-black.svg?height=200&width=300', alt: 'Form template 4' },
    { src: '/logo-black.svg?height=200&width=300', alt: 'Form template 5' },
    { src: '/logo-black.svg?height=200&width=300', alt: 'Form template 6' }
  ];
  
  // Duplicate images for infinite effect
  let duplicatedImages = [...images, ...images];
  
  let hoveredIndex = $state(-1);
  let isVisible = $state(mounted);
  
  // Set visibility after delay if mounted
  $effect(() => {
    if (mounted) {
      const timer = setTimeout(() => {
        isVisible = true;
      }, 1200);
      
      return () => clearTimeout(timer);
    }
  });
  
  function handleMouseEnter(index: number) {
    hoveredIndex = index % images.length;
  }
  
  function handleMouseLeave() {
    hoveredIndex = -1;
  }
</script>

<section class="py-16 overflow-hidden">
  <div 
    class="relative w-full transition-all duration-1000"
    class:translate-y-0={isVisible}
    class:opacity-100={isVisible}
    class:translate-y-20={!isVisible}
    class:opacity-0={!isVisible}
    style="transition-delay: 1200ms"
  >
    <!-- First carousel track -->
    <div class="flex carousel-track">
      {#each duplicatedImages as image, i}
        <div 
          class="flex-shrink-0 w-[250px] h-[180px] mx-2 overflow-hidden rounded-lg transition-all duration-500 transform"
          onmouseenter={() => handleMouseEnter(i)}
          onmouseleave={handleMouseLeave}
          class:scale-105={hoveredIndex === i % images.length}
          style="transition-delay: {1300 + (i % images.length) * 100}ms"
          class:translate-y-0={isVisible}
          class:opacity-100={isVisible}
          class:translate-y-10={!isVisible}
          class:opacity-0={!isVisible}
        >
          <img 
            src={image.src || "/placeholder.svg"} 
            alt={image.alt} 
            class="w-full h-full object-cover transition-transform duration-700"
            class:scale-110={hoveredIndex === i % images.length}
          />
        </div>
      {/each}
    </div>
    
    <!-- Second carousel track (for seamless looping) -->
    <div class="flex carousel-track" style="animation-delay: -15s">
      {#each duplicatedImages as image, i}
        <div 
          class="flex-shrink-0 w-[250px] h-[180px] mx-2 overflow-hidden rounded-lg transition-all duration-500 transform"
          onmouseenter={() => handleMouseEnter(i)}
          onmouseleave={handleMouseLeave}
          class:scale-105={hoveredIndex === i % images.length}
          style="transition-delay: {1300 + (i % images.length) * 100}ms"
          class:translate-y-0={isVisible}
          class:opacity-100={isVisible}
          class:translate-y-10={!isVisible}
          class:opacity-0={!isVisible}
        >
          <img 
            src={image.src || "/placeholder.svg"} 
            alt={image.alt} 
            class="w-full h-full object-contain transition-transform duration-700"
            class:scale-110={hoveredIndex === i % images.length}
          />
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .carousel-track {
    animation: scroll 30s linear infinite;
  }

  @keyframes scroll {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(calc(-250px * 6 - 24px)); /* Width of images × count + margins */
    }
  }
</style>
