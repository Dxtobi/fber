<script>
// @ts-nocheck

	import { updateFormStoreValue } from "../../stores/publishedForm";

  // @ts-nocheck
  let {element}=$props();


  // @ts-ignore
  const handleUpdate=(e)=>{
    const selected = element.properties.options[e]
    let isIn = element.properties.value.find((o)=>o.text==selected.text)

    const valToSave =isIn? element.properties.value.filter((elem)=>elem.text !== selected.text): [...element.properties.value, selected]
   

    updateFormStoreValue(element.id, "value", valToSave)
  }

  // $effect(()=>{
  //   //  console.log(element)
  // })
</script>
 <span class="block text-sm font-medium text-gray-500 mb-1 ml-1">{element.properties.label}</span>
<div style={Object.entries(element.styles || {}).map(([k, v]) => `${k}: ${v}`).join('; ')}>
  <input
    type="text"
    class="w-full text-lg font-semibold mb-3 p-2  rounded bg-[#ada7a024] border-none"
    bind:value={element.properties.question}
    placeholder="Enter question text"
    disabled
  />
  <div class="space-y-2 mb-3">
    {#each element.properties.options as option, index (index)}
      <div class="flex items-center space-x-2 p-2 border-none rounded">
        <input
          type={element.properties.multiple ? 'checkbox' : 'radio'}
          class="mr-2 cursor-pointer"
          checked={element.properties.value.find((o)=>o.text==option.text)}
          onchange={() => handleUpdate(index)}
          name="test-options"
        />
        <input
          type="text"
          class="flex-1 p-1  rounded border-none  bg-transparent"
          value={option.text}
          disabled
        />
        
      </div>
    {/each}
  </div>

  
</div>

<style>
  /* input[type="text"] {
    transition: border-color 0.2s;
  }
  input[type="text"]:focus {
    border-color: #3b82f6;
    outline: none;
  } */
</style>