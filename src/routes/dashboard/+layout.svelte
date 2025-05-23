<script lang="ts">
  import Sidebar from './Sidebar.svelte';
  import { writable } from 'svelte/store';
  
  // Track sidebar collapsed state
  let sidebarCollapsed = false;
  
  // Active navigation item
  let activeItem = 'analytics';
  
  // Toggle sidebar function
  function toggleSidebar() {
    sidebarCollapsed = !sidebarCollapsed;
  }
  
  // Function to handle clicks on navigation items
  function handleNavigation(itemId: string) {
    activeItem = itemId;
    // You would typically do more here, like loading different content
  }
	let { children } = $props();
</script>


<main class="flex h-screen bg-gray-100  font-sans">
  <Sidebar 
    collapsed={sidebarCollapsed} 
    activeItem={activeItem}
    notifications={{ users: 3 }}
  />
	<section class="p-30 w-full h-full bg-gray-200">
    {@render children()}
  </section>
</main>
