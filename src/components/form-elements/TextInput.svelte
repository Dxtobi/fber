
  <script>
    export let element;
    console.log(element)
  </script>
  
  <input
    type="text"
    placeholder={element?.properties?.placeholder || "Enter Here" }
    required={element?.properties?.required ||false}
    style={Object.entries(element.styles || {}).map(([k, v]) => `${k}: ${v}`).join('; ')}
    class="outline-none select-none" 
  />