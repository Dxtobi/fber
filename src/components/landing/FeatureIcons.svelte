<script lang="ts">
  interface Props {
    mounted?: boolean;
  }

  let { mounted = false }: Props = $props();
  
  let features = [
    { name: 'Drag & Drop', icon: 'pixelarticons:drag-and-drop' },
    { name: 'Templates', icon: 'icon-park-twotone:page-template' },
    { name: 'Logic', icon: 'carbon:logical-partition' },
    // { name: 'Payments', icon: '💳' },
    { name: 'Analytics', icon: 'hugeicons:analytics-up' },
    { name: 'Integrations', icon: 'stash:integrations' },
    { name: 'Responsive', icon: 'mdi:responsive' },
    { name: 'Secure', icon: 'healthicons:ui-secure' }
  ];
  
  let hoveredIndex = $state(-1);
  
  function handleMouseEnter(index: number) {
    hoveredIndex = index;
  }
  
  function handleMouseLeave() {
    hoveredIndex = -1;
  }
</script>

<div 
  class="py-10 transition-all duration-700 transform"
  class:translate-y-0={mounted}
  class:opacity-100={mounted}
  class:translate-y-16={!mounted}
  class:opacity-0={!mounted}
  style="transition-delay: 900ms"
>
  <div class="flex flex-wrap justify-center gap-6 md:gap-30">
    {#each features as feature, i}
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <div 
        class="flex flex-col items-center transition-all duration-300 transform cursor-pointer"
        onmouseenter={() => handleMouseEnter(i)}
        onmouseleave={handleMouseLeave}
        class:scale-110={hoveredIndex === i}
        style="transition-delay: {1000 + i * 100}ms"
        class:translate-y-0={mounted}
        class:opacity-100={mounted}
        class:translate-y-8={!mounted}
        class:opacity-0={!mounted}
      >
        <div class="text-2xl mb-2">
            <iconify-icon icon={feature.icon} width="58" height="58"  style="color: #595959"></iconify-icon>
        </div>
        <div class="text-sm text-gray-600">{feature.name}</div>
      </div>
    {/each}
  </div>
</div>
