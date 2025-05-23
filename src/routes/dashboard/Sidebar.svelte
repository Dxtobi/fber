<!-- Sidebar.svelte -->
<script>
  import { onMount } from 'svelte';
	import NewFormModel from './NewFormModel.svelte';
  
  // Props
  export let collapsed = false;
  export let activeItem = 'home';
  export let notifications = { users: 3 };
  let showModal = false;
  // Activity submenu state
  let activityExpanded = true;
  
  // Menu items data structure
  const menuItems = [
    { 
      id: 'home',
      label: 'Home',
      icon: 'majesticons:home-analytics'
    },
    { 
      id: 'activity',
      label: 'Activity',
      icon: 'mdi:chart-bar',
      expandable: true,
      expanded: activityExpanded,
      subItems: [
        { id: '/dashboard/analytics', label: 'Analytics', color: '#FF4FD8',  icon: 'mdi:chart-bar', },
        { id: '/dashboard/forms', label: 'forms', color: '#FF4F4F' ,  icon: 'healthicons:health-worker-form',},
        { id: '/canvas', label: 'New', color: '#FF4F4F', icon: 'icon-park-solid:add' },
      ]
    },


  ];
  
  const otherItems = [
    { 
      id: '/dashboard/help',
      label: 'Help',
      icon: 'mdi:help-circle-outline'
    },
    { 
      id: '/dashboard/settings',
      label: 'Settings',
      icon: 'mdi:cog-outline'
    }
  ];
  
  // Toggle submenu expansion
  // @ts-ignore
  function toggleSubMenu(item) {
    if (item.id === 'activity') {
      activityExpanded = !activityExpanded;
    }
  }
  
  // Handle item click
  // @ts-ignore
  function handleItemClick(itemId) {
    activeItem = itemId;
  }

  onMount(() => {
    // Initialize Iconify if needed
    if (typeof window !== 'undefined' && !window.customElements.get('iconify-icon')) {
      import('@iconify/svelte').then(module => {
        // Iconify is loaded
      });
    }
  });

</script>

<NewFormModel
    isOpen={showModal}
    on:close={() => showModal = false}
    on:createForm={() => {
       
        showModal = false;
    }}
/>
<div class="sidebar {collapsed ? 'collapsed' : ''}" aria-label="Navigation sidebar">
  <!-- Logo area -->
  <div class="logo-container">
    <div class="logo-icon"><img src="/logo-white.svg"alt="logo" class="  {collapsed ? 'w-[40px] h-[40px]' : 'w-[50px] h-[50px]'}" /></div>
    {#if !collapsed}
      <div class="logo-text">formink</div>
    {/if}
    <button class="collapse-btn" on:click={() => collapsed = !collapsed}>
      {#if collapsed}
        <iconify-icon icon="mdi:chevron-right" width="16"></iconify-icon>
      {:else}
        <iconify-icon icon="mdi:chevron-left" width="16"></iconify-icon>
      {/if}
    </button>
  </div>
  
  <!-- Main navigation -->
  <div class="navigation">
    {#if !collapsed}
      <div class="section-title">MENU</div>
    {:else}
      <div class=" "></div>
    {/if}
    
    <ul class="nav-list">
      {#each menuItems as item}
        <li class="nav-item {activeItem === item.id ? 'active' : ''}">
          <button 
            class="nav-link {item.expandable ? 'expandable' : ''}" 
            on:click={() => item.expandable ? toggleSubMenu(item) : handleItemClick(item.id)}
            aria-expanded={item.expandable ? activityExpanded : undefined}
          >
            <span class="icon">
              <iconify-icon icon={item.icon} width="20"></iconify-icon>
            </span>
            
            {#if !collapsed}
              <span class="label">{item.label}</span>
              
              {#if item.expandable}
                <span class="expand-icon">
                  <iconify-icon 
                    icon={activityExpanded ? "mdi:chevron-up" : "mdi:chevron-down"} 
                    width="16"
                  ></iconify-icon>
                </span>
              {/if}
            {/if}
            
            
          </button>
          
          {#if item.expandable && activityExpanded}
            <ul class="submenu {collapsed ? 'collapsed' : ''}">
              {#each item.subItems as subItem}
               {#if subItem.id === '/canvas'}
                 <li class="submenu-item {activeItem === subItem.id ? 'active' : ''}">
                  <button  
                    class="submenu-link space-x-2" 
                    on:click={() => showModal = true} 
                  >
                    <iconify-icon icon={subItem.icon} width="20"></iconify-icon>
                    {#if !collapsed}
                      <span class="label">{subItem.label}</span>
                    {/if}
                  </button>
                </li>
               {:else}
                <li class="submenu-item {activeItem === subItem.id ? 'active' : ''}">
                  <a href={subItem.id} 
                    class="submenu-link space-x-2" 
                    on:click={() => handleItemClick(subItem.id)}
                  >
                    <iconify-icon icon={subItem.icon} width="20"></iconify-icon>
                    {#if !collapsed}
                      <span class="label">{subItem.label}</span>
                    {/if}
                  </a>
                </li>
                {/if}
              {/each}
            </ul>
          {/if}
        </li>
      {/each}
    </ul>
    
    <!-- Other section -->
    {#if !collapsed}
      <div class="section-title">OTHER</div>
    {:else}
      <div class="border-b"></div>
    {/if}
    
    <ul class="nav-list">
      {#each otherItems as item}
        <li class="nav-item {activeItem === item.id ? 'active' : ''}">
          <button 
            class="nav-link" 
            on:click={() => handleItemClick(item.id)}
          >
            <span class="icon">
              <iconify-icon icon={item.icon} width="20"></iconify-icon>
            </span>
            
            {#if !collapsed}
              <span class="label">{item.label}</span>
            {/if}
          </button>
        </li>
      {/each}
    </ul>
  </div>
</div>

<style>
  .sidebar {
    display: flex;
    flex-direction: column;
    width: 240px;
    height: 100%;
    background-color: #1A1A1A;
    color: #FFFFFF;
    transition: width 0.3s ease;
    position: relative;
   
    overflow: hidden;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
  
  .sidebar.collapsed {
    width: 80px;
  }
  
  .logo-container {
    display: flex;
    align-items: center;
    padding: 20px 16px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    position: relative;
  }
  
  .logo-icon {
    font-weight: bold;
    font-size: 20px;
    margin-right: 8px;
  }
  
  .logo-text {
    font-size: 16px;
    font-weight: 500;
  }
  
  .collapse-btn {
    position: absolute;
    right: 16px;
    background: transparent;
    border: none;
    color: #FFFFFF;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px;
  }
  
  .navigation {
    flex: 1;
    display: flex;
    flex-direction: column;
    
    padding: 8px 0;
  }
  
  .section-title {
    padding: 16px 16px 8px 16px;
    font-size: 12px;
    color: #888888;
    letter-spacing: 1px;
  }
  
  .section-title-small {
    padding: 16px 0 8px 0;
    font-size: 10px;
    color: #888888;
    letter-spacing: 1px;
    text-align: center;
  }
  
  .nav-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .nav-item {
    margin: 4px 0;
  }
  
  .nav-link {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 12px;
    border: none;
    background: transparent;
    color: #BBBBBB;
    cursor: pointer;
    font-size: 14px;
    text-align: left;
    border-radius: 6px;
    position: relative;
    margin: 0 8px;
  }
  
  .sidebar.collapsed .nav-link {
    justify-content: center;
    padding: 12px;
  }
  
  .nav-link:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }
  
  .nav-item.active .nav-link {
    background-color: rgba(255, 255, 255, 0.1);
    color: #FFFFFF;
  }
  
  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 12px;
    width: 20px;
    height: 20px;
  }
  
  .sidebar.collapsed .icon {
    margin-right: 0;
  }
  
  .label {
    flex: 1;
  }
  
  .expand-icon {
    margin-left: 8px;
  }
  
  .notification {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #FFFFFF;
    color: #1A1A1A;
    font-size: 12px;
    font-weight: bold;
    width: 20px;
    height: 20px;
    border-radius: 50%;
  }
  
  .submenu {
    list-style: none;
    padding: 0;
    margin: 0 0 0 30px;
  }
  
  .submenu.collapsed {
    margin: 0 0 0 30px;
  }
  
  .submenu-item {
    margin: 4px 0;
  }
  
  .submenu-link {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 8px 16px;
    border: none;
    background: transparent;
    color: #BBBBBB;
    cursor: pointer;
    font-size: 14px;
    text-align: left;
    border-radius: 6px;
  }
  
  .submenu-link:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }
  
  .submenu-item.active .submenu-link {
    color: #FFFFFF;
  }
  
  .color-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin-right: 12px;
  }
  
  .sidebar.collapsed .color-dot {
    width: 10px;
    height: 10px;
    margin-right: 0;
  }
</style>