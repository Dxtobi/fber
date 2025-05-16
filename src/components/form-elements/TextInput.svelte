
  <script>
    export let element;
    
  </script>
  
  
  <span class="block text-sm font-medium text-gray-500 ">{element.properties.label}</span>

  <input
    placeholder={element?.properties?.placeholder || "Enter Here" }
    required={element?.properties?.required ||false}
    style={Object.entries(element.styles || {}).map(([k, v]) => `${k}: ${v}`).join('; ')}
    class="outline-none select-none" 
    type={element?.properties?.type}
  />