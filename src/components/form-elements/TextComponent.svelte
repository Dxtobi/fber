<script>
// @ts-nocheck

  export let element;

  // Define style variations based on textType
  const textTypeStyles = {
    paragraph: {
      'font-size': '15px',
      'font-weight': 'normal',
      'line-height': '1.5',
      margin: '4px 0'
    },
    heading: {
      'font-size': '20px',
      'font-weight': '700',
      'line-height': '1.3',
      margin: '12px 0 8px 0'
    },
    subheading: {
      'font-size': '17px',
      'font-weight': '600',
      'line-height': '1.4',
      margin: '8px 0 6px 0'
    },
    timestamp: {
      'font-size': '13px',
      'font-weight': 'normal',
      'line-height': '1.2',
      margin: '2px 0',
      color: '#536471'
    },
    username: {
      'font-size': '15px',
      'font-weight': '700',
      'line-height': '1.5',
      margin: '2px 0'
    },
    displayname: {
      'font-size': '15px',
      'font-weight': '700',
      'line-height': '1.5',
      margin: '2px 0'
    }
  };

  // Define color variations
  const textColors = {
    default: '#0f1419',
    muted: '#536471',
    primary: '#1d9bf0',
    error: '#f4212e'
  };

  // Combine all styles with proper precedence
  $: computedStyles = {
    ...element.defaultStyles, // Base styles from element type
    ...textTypeStyles[element.properties.textType || 'paragraph'], // Text type styles
    color: textColors[element.properties.textColor || 'default'], // Color override
    ...element.styles // User custom styles (highest precedence)
  };

  // Convert styles object to CSS string
  $: styleString = Object.entries(computedStyles)
    .map(([k, v]) => `${k}: ${v}`)
    .join('; ');
</script>

{#if element.properties.textType === 'heading'}
  <h1 style={styleString}>
    {element.properties.content}
  </h1>
{:else if element.properties.textType === 'subheading'}
  <h2 style={styleString}>
    {element.properties.content}
  </h2>
{:else}
  <p style={styleString}>
    {element.properties.content}
  </p>
{/if}