<script>
  // @ts-ignore
  import FeatureCard from './Feature-card.svelte';
  
  let { features } = $props();
</script>

<section class="py-12">
  <div class="text-center mb-16">
    <h2 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">
      Powerful Features
    </h2>
    <p class="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
      Everything you need to build amazing experiences for your users.
    </p>
  </div>
  
  <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    {#each features as feature}
      <FeatureCard {feature} />
    {/each}
  </div>
</section>
