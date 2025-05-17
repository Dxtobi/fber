
  <script>
     import { updateFormStoreValue } from "../../stores/formStore";
  
     let {element} = $props();

     let selected = $derived(element.properties.value)
      // @ts-ignore
     const handleOnSelected=(e)=>{
        selected = !selected
        updateFormStoreValue(element.id, "value", selected)
     }

      // $effect(()=>{
      //   $inspect(selected)
      // })
    
  </script>
  
  <div class="my-3">

    <span class="block font-medium text-gray-700  ">{element.properties.question}</span>
    <div class="flex gap-5 items-center">
      <div class="flex gap-2 items-center"><span>Yes</span><input onchange={handleOnSelected} type="radio" checked={selected}/></div>
      <div class="flex gap-2 items-center"><span>No</span><input type="radio" onchange={handleOnSelected} checked={!selected}/></div>
    </div>
  </div>


 