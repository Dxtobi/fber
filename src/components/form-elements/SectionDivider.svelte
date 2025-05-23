<script>
    
  
    export let element;
  
  </script>
  
  <div
    style={`
      ${Object.entries(element.styles || {}).map(([k, v]) => `${k}: ${v}`).join('; ')}
    `}
    class=" divider"
  ></div>
  
 