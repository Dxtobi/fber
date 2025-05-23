
<script>
// @ts-nocheck
import { updateFormStoreValue } from "../../stores/publishedForm";
let { element} = $props()  
</script>
  
  
  <span class="block text-sm font-medium text-gray-500 ">{element.properties.label}</span>

  <textarea
    placeholder={element?.properties?.placeholder || "Enter Here" }
    required={element?.properties?.required ||false}
    style={Object.entries(element.styles || {}).map(([k, v]) => `${k}: ${v}`).join('; ')}
    class="outline-none select-none" 
    value={element?.properties?.value}
    onchange={(e)=>{
      updateFormStoreValue(element.id, 'value', e?.target?.value||'')
    }}
  ></textarea>