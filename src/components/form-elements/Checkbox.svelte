<script>
	import { updateFormStoreValue } from "../../stores/publishedForm";

   
     let {element} = $props()
  
    // Default value for the date picker
    let selectedValue = $state(false);
  
    // Function to handle date selection
    // @ts-ignore
    function handleDateChange(event) {
      selectedValue = !element.properties?.value;
      updateFormStoreValue(element.id, 'value', selectedValue)
    }

    $effect(()=>{
      selectedValue = element.properties?.value;
    //   $inspect(selectedValue,"---", element)
    })
  </script>
  <span class=" text-sm font-medium text-gray-500 ">{element.properties.label}</span>
  <div class="date-picker-container" style={Object.entries(element.styles || {}).map(([k, v]) => `${k}: ${v}`).join('; ')}>
    <input
      type="checkbox"
      checked={selectedValue}
      placeholder={element?.properties?.placeholder || "Select date"}
      onchange={handleDateChange}
      class={`date-picker-input ${selectedValue?"bg-[#1d9bf0]":''}`}
      
    />
  
  </div>
  
