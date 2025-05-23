<script>
  import { onMount } from 'svelte';
  
  let menuItems = [
    { name: 'Home', href: "/coming-soon" },
    { name: 'Features', href: "/coming-soon" },
    { name: 'Templates', href: "/coming-soon" },
    { name: 'Pricing', href: "/coming-soon" },
    { name: 'FAQs', href: "/coming-soon" }
  ];
  
  let visible = $state(false);
  
  onMount(() => {
    setTimeout(() => {
      visible = true;
    }, 100);
  });
</script>

<header class="py-6">
  <nav class="flex items-center justify-between">
    <div 
      class="text-xl font-bold transition-all duration-500 transform"
      class:translate-x-0={visible}
      class:opacity-100={visible}
      class:-translate-x-10={!visible}
      class:opacity-0={!visible}
    >
      <a href="/" class="text-gray-900"><img src="/logo-black.svg" class="w-10 h-10" alt="logo"/></a>
    </div>
    
    <div class="hidden md:flex space-x-8">
      {#each menuItems as item, i}
        <a 
          href={item.href} 
          class="text-gray-600 hover:text-gray-900 transition-all duration-300 transform"
          style="transition-delay: {100 + i * 50}ms"
          class:translate-y-0={visible}
          class:opacity-100={visible}
          class:-translate-y-4={!visible}
          class:opacity-0={!visible}
        >
          {item.name}
        </a>
      {/each}
    </div>
    
    <div 
      class="flex items-center space-x-4 transition-all duration-500 transform"
      style="transition-delay: 400ms"
      class:translate-x-0={visible}
      class:opacity-100={visible}
      class:translate-x-10={!visible}
      class:opacity-0={!visible}
    >
      
      <a href={`/auth`} class="bg-gray-900 text-white px-4 py-2 rounded-full text-sm hover:bg-gray-800 transition-colors duration-300">
        Sign up
      </a>
    </div>
  </nav>
</header>
