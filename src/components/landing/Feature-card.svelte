<script>
	import { onMount } from "svelte";

  let { feature } = $props();

  // Track mouse position and hover state
  let isHovering = $state(false);
  let mouseX = $state(0);
  let mouseY = $state(0);

  // Offset for the tooltip (gap between cursor and tooltip)
  const offsetX = 16; // Horizontal offset
  const offsetY = 16; // Vertical offset

  // Handle mouse events
  function handleMouseEnter() {
    isHovering = true;
  }

  function handleMouseLeave() {
    isHovering = false;
  }


/** @type {HTMLElement | null} */
let mouse_ref = $state(null)
  /**
   * @param {MouseEvent} event
   */
  function handleMouseMove(event) {
    // // Get mouse position relative to the viewport
    // mouseX = event.clientX;
    // mouseY = event.clientY;
  }

  onMount(()=>{
    window.addEventListener('mousemove', (event) => {
    // Get mouse position relative to the viewport
    mouseX = event.clientX; // Horizontal position
    mouseY = event.clientY; // Vertical position

    if(mouse_ref){

        mouse_ref.style.left = mouseX - 20 + "px";
        mouse_ref.style.top = mouseY - 20 + "px";
        mouse_ref.style.transition = "left 0.18s cubic-bezier(0.4, 0, 0.2, 1), top 0.18s cubic-bezier(0.4, 0, 0.2, 1)";
        // mouse_ref.style.transform = `scale(${(mouse.length - i) / mouse.length})`
    }
    // Alternatively, get position relative to the entire document
    const docX = event.pageX; // Includes horizontal scroll offset
    const docY = event.pageY; // Includes vertical scroll offset

    console.log(`Mouse Position (Viewport): X=${mouseX}, Y=${mouseY}`);
    console.log(`Mouse Position (Document): X=${docX}, Y=${docY}`);
});
  })
</script>

<div
  class="relative bg-white rounded-full shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-gray-100"
  onmouseenter={handleMouseEnter}
  onmouseleave={handleMouseLeave}
  onmousemove={handleMouseMove}
  role="presentation"
>
  <div class="p-6 flex justify-start space-x-4 items-center">
    <div class="flex items-center justify-center h-12 w-12 rounded-full bg-gray-800 text-white">
      <iconify-icon icon={feature.icon} width="24" height="24"></iconify-icon>
    </div>
    <h3 class="text-lg font-medium text-gray-900">{feature.name}</h3>
  </div>

</div>
{#if isHovering}
  <div
    class="fixed z-50 max-w-xs p-3 transition-all bg-white/80 backdrop-blur-md rounded-lg shadow-lg border border-gray-200 pointer-events-none"
    bind:this={mouse_ref}
  >
    <p class="text-sm text-gray-700">{feature.description}</p>
  </div>
{/if}