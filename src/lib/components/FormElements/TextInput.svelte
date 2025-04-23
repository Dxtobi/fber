
  <script>
    export let element;
  </script>
  
  <input
    type="text"
    placeholder="Text input"
    style={Object.entries(element.styles || {}).map(([k, v]) => `${k}: ${v}`).join('; ')}
    class="outline-none select-none" 
  />