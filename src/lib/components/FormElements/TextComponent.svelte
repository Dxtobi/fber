<script>
    export let element;
  </script>
  
  <div
    style={Object.entries(element.styles || {})
      .map(([key, value]) => `${key}: ${value};`)
      .join('')}
    class="outline-none select-none"
  >
    {element.attributes?.content || 'Sample Text'}
  </div>
  
  <style>
    div {
      white-space: pre-wrap; /* Preserve line breaks and spaces */
      word-break: break-word; /* Handle long words */
    }
  </style>