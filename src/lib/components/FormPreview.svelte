<script>
    //@ts-nocheck
    import { formStore } from '$lib/stores/formStore';
    // Import the same component map used in the editor
    import TextInput from './FormElements/TextInput.svelte';
    import Button from './FormElements/Button.svelte';
    // import Checkbox from './FormElements/Checkbox.svelte'; // Add if used
    import VotingComponent from './VotingComponent.svelte';
    import TestComponent from './TestComponent.svelte';
    import { onDestroy } from 'svelte';
  
    // --- Component Map ---
    // Ensure this map includes all components your form might use
    const components = {
      TextInput,
      Button,
      // Checkbox,
      VotingComponent,
      TestComponent,
    };
  
    // --- Preview State ---
    let previewMode = 'desktop'; // 'desktop', 'tablet', 'mobile'
    let previewScale = 1.0; // Allows for zooming the preview if needed
    let iframeRef; // Reference to the iframe for isolated styling (optional but good)
  
    // --- Viewport Definitions ---
    const viewports = {
      mobile: { width: '375px', height: '667px', scale: 1.0 }, // iPhone SE/8 size
      tablet: { width: '768px', height: '1024px', scale: 0.8 }, // iPad portrait
      desktop: { width: '100%', height: '100%', scale: 1.0 }, // Full available width
    };
  
    // --- Reactive Calculations ---
    $: viewportStyle = `
      width: ${viewports[previewMode].width};
      height: ${viewports[previewMode].height};
      max-width: 100%; /* Ensure it doesn't overflow parent */
      max-height: 100%; /* Ensure it doesn't overflow parent */
      transform: scale(${viewports[previewMode].scale});
      transform-origin: top left;
      border: 1px solid #ccc;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      overflow: auto; /* Allow scrolling within the viewport */
      position: relative; /* For absolute positioning of elements */
      background-color: white; /* Default background */
      transition: width 0.3s ease, height 0.3s ease, transform 0.3s ease;
    `;
  
    // Helper to convert style object to string, applying defaults if needed
    function getElementStyleString(element) {
        let baseStyles = `
          position: absolute;
          left: ${element.position?.x ?? 0}px;
          top: ${element.position?.y ?? 0}px;
          box-sizing: border-box;
        `;
  
        // Combine with element-specific styles from the store
        let elementSpecificStyles = '';
        if (element.styles && typeof element.styles === 'object') {
            elementSpecificStyles = Object.entries(element.styles)
                .map(([key, value]) => `${key}: ${value};`)
                .join(' ');
        }
  
        // Crude check for missing width/height - apply a fallback if desired
        // This might be better handled by ensuring elements always have some default size styles
        // if (!element.styles?.width) {
        //   baseStyles += ' width: 100px;'; // Example fallback
        // }
        // if (!element.styles?.height) {
        //    baseStyles += ' min-height: 40px;'; // Example fallback
        // }
  
  
        return baseStyles + elementSpecificStyles;
    }
  
    // --- Optional: Inject Tailwind into iframe ---
    // This is more advanced and needed if your components rely heavily on Tailwind
    // defined OUTSIDE their own <style> blocks. If components are self-contained
    // (use <style> or inline styles), you might not need this.
    let tailwindLoaded = false;
    function loadTailwindInIframe() {
        if (!iframeRef || !iframeRef.contentDocument || tailwindLoaded) return;
        try {
            const doc = iframeRef.contentDocument;
            const link = doc.createElement('link');
            // Find the Tailwind CSS file used by your app (adjust path if needed)
            // This assumes a standard Vite/SvelteKit setup where app.css imports Tailwind
            const tailwindHref = '/src/app.css'; // Or the direct path to your compiled Tailwind CSS
  
            // Or link to CDN for simplicity (replace with your version)
            // const tailwindHref = 'https://cdn.tailwindcss.com/3.4.1';
  
            link.rel = 'stylesheet';
            link.href = tailwindHref;
            link.onload = () => {
              console.log("Tailwind injected into preview iframe.");
              tailwindLoaded = true;
               // Force iframe content repaint/reflow if needed
              iframeRef.contentWindow.dispatchEvent(new Event('resize'));
            };
            link.onerror = (e) => {
                console.error("Failed to load Tailwind CSS into iframe:", e, "Using href:", tailwindHref);
            };
            doc.head.appendChild(link);
  
             // Add basic body styles
             doc.body.style.margin = '0';
             doc.body.style.fontFamily = 'sans-serif'; // Or match your app's font
  
        } catch (e) {
            console.error("Error accessing or injecting into iframe:", e);
            // Might be a cross-origin issue if iframe src is different
        }
    }
  
    // Re-inject styles if iframe reloads (though it shouldn't with srcdoc)
    // Note: Using srcdoc is generally better for inline HTML than injecting links later
    const initialIframeContent = `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style> body { margin: 0; font-family: sans-serif; position: relative; min-height: 100%; } </style>
    <link rel="stylesheet" href="/src/app.css"> {/* Link Tailwind directly */}
    </head><body><div id="preview-root"></div></body></html>`;
  
  
    // --- Lifecycle ---
    // No specific onMount needed unless doing complex setup like iframe injection
  
  
  </script>
  
  <div class="flex flex-col h-full bg-gray-200 p-4 gap-4">
    <!-- Preview Controls -->
    <div class="flex justify-center items-center gap-2 p-2 bg-white rounded shadow">
      <span class="text-sm font-medium mr-2">Preview Mode:</span>
      <button
        class="px-3 py-1 text-sm rounded transition-colors duration-150"
        class:bg-blue-500={previewMode === 'mobile'}
        class:text-white={previewMode === 'mobile'}
        class:bg-gray-200={previewMode !== 'mobile'}
        class:hover:bg-blue-400={previewMode !== 'mobile'}
        on:click={() => previewMode = 'mobile'}
      >
        Mobile
      </button>
      <button
        class="px-3 py-1 text-sm rounded transition-colors duration-150"
        class:bg-blue-500={previewMode === 'tablet'}
        class:text-white={previewMode === 'tablet'}
        class:bg-gray-200={previewMode !== 'tablet'}
        class:hover:bg-blue-400={previewMode !== 'tablet'}
        on:click={() => previewMode = 'tablet'}
      >
        Tablet
      </button>
      <button
        class="px-3 py-1 text-sm rounded transition-colors duration-150"
        class:bg-blue-500={previewMode === 'desktop'}
        class:text-white={previewMode === 'desktop'}
        class:bg-gray-200={previewMode !== 'desktop'}
        class:hover:bg-blue-400={previewMode !== 'desktop'}
        on:click={() => previewMode = 'desktop'}
      >
        Desktop
      </button>
    </div>
  
    <!-- Preview Viewport Wrapper (for scaling) -->
    <div class="flex-1 flex justify-center items-start overflow-auto">
      <div class="preview-viewport p-20 bg-gray-50" style={viewportStyle}>
        <!-- Render Elements Directly (Simpler, uses parent styles) -->
        {#each $formStore.elements as element (element.id)}
          {@const Comp = components[element.component]}
          {#if Comp}
            <div
              class="preview-element p-1"
              
              data-element-id={element.id}
            >
              <!-- Render the actual component -->
              <!-- Pass relevant props; ensure components don't rely on editor-specific context -->
               <svelte:component
                  this={Comp}
                  {element} 
                  props={element.props || {}}
                  styles={element.styles || {}}
                  isPreview={true} 
                  class="w-full h-full" 
                />
            </div>
          {:else}
             <div
               class="preview-element text-xs text-red-700 bg-red-100 border border-red-400 p-1"
               style={getElementStyleString(element)}
             >
               Unknown: {element.component}
             </div>
          {/if}
        {/each}
  
        <!-- Alternative: Using an iframe for style isolation -->
        <!--
        <iframe
            bind:this={iframeRef}
            title="Form Preview"
            class="w-full h-full border-0"
            srcdoc={initialIframeContent}
            onload={loadTailwindInIframe}
        >
        </iframe>
        -->
        <!-- If using iframe, you'd need logic to render elements *inside* the iframe's #preview-root -->
        <!-- This requires more complex communication or re-rendering logic -->
  
      </div>
    </div>
  </div>
  
  <style>
    .preview-viewport {
      /* Styles are applied dynamically via viewportStyle */
       /* Add a subtle background pattern if desired */
      /* background-image: linear-gradient(45deg, #f9fafb 25%, transparent 25%), linear-gradient(-45deg, #f9fafb 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f9fafb 75%), linear-gradient(-45deg, transparent 75%, #f9fafb 75%);
      background-size: 20px 20px;
      background-position: 0 0, 0 10px, 10px -10px, -10px 0px; */
    }
  
    .preview-element {
       /* Ensure elements are interactable unless explicitly disabled */
       /* pointer-events: none; */ /* Uncomment ONLY if you want zero interaction in preview */
    }
  
    /* Add any specific preview-only global styles here if needed */
  </style>