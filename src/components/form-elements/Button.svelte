<script>
	import { onMount } from "svelte";

    export let element;
  
    // Handle variant styles
    $: variantStyles = {
      primary: {
        'background-color': '#1d9bf0',
        'hover-background-color': '#1a8cd8',
        color: 'white',
        border: 'none'
      },
      secondary: {
        'background-color': '#eff3f4',
        'hover-background-color': '#d7dbdc',
        color: '#0f1419',
        border: 'none'
      },
      outlined: {
        'background-color': 'transparent',
        'hover-background-color': 'rgba(29, 155, 240, 0.1)',
        color: '#1d9bf0',
        border: '1px solid #1d9bf0'
      }
    };
  
    // Combine all styles with proper precedence
    $: computedStyles = {
      ...element.defaultStyles, // Base button styles
      // @ts-ignore
      ...variantStyles[element.properties.variant || 'primary'], // Variant styles
      ...element.styles, // Custom overrides
      opacity: element.properties.disabled ? '0.5' : '1',
      cursor: element.properties.disabled ? 'not-allowed' : 'pointer'
    };
  
    // Convert to CSS string
    $: styleString = Object.entries(computedStyles)
      .map(([k, v]) => `${k}: ${v}`)
      .join('; ');


      export let from
      onMount(()=>{
        console.log(from)
      })
  </script>
  
  <button
    type={element.properties.submit || 'button'}
    style={styleString}
    class="outline-none select-none transition-colors duration-200"
    disabled={element.properties.disabled}
  >
    {element.properties.text || 'Button'}
  </button>