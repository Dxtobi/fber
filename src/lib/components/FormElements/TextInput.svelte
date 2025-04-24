
  <script>
    export let element;
    console.log(element)
  </script>
  
  <input
    type="text"
    placeholder={element.attributes.placeholder || "Enter Here" }
    style={Object.entries(element.styles || {}).map(([k, v]) => `${k}: ${v}`).join('; ')}
    class="outline-none select-none" 
  />