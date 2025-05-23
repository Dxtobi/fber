<script>


   import { updateFormStoreValue } from "../../stores/publishedForm";

 
  let {element}=$props();


  // @ts-ignore
  const handleUpdate=(e)=>{
    const selected = element.properties.options[e]
   
    
    updateFormStoreValue(element.id, "value", selected)
    // console.log(`To Be Saved:\n${valToSave},\n Current:\n${element.properties.value},\n all-data:\n${element}`)
  }


  $effect(()=>{
     console.log(element.properties.value)
     
  })

  const check=(/** @type {any} */ option)=>(option==element.properties.value)
  </script>

 <span class="block text-sm font-medium text-gray-500 mb-1 ml-1">{element.properties.label}</span>
  <div
    style={Object.entries(element.styles || {}).map(([k, v]) => `${k}: ${v}`).join('; ')}
    class="voting-component"
  >
    <h3 class="text-lg font-semibold mb-3 rounded bg-[#ada7a024] border-none p-3">{element?.properties?.question}</h3>

    <div class=" mb-3">
      {#key element.properties.value}
        {#each element.properties.options as option, index (index)}
        <div  class="flex items-center w-full hover:bg-[#ada7a024] p-2 rounded-2xl ">
          <input
            type="radio"
            name="vote"
            checked={check(option)}
            class="mr-2 cursor-pointer"
            onclick={()=>handleUpdate(index)}
          />
          <span   class="flex-1 p-1 border-none rounded w-full bg-transparent text-start cursor-pointer">{option}</span>
    </div>
      {/each}
      {/key}
    </div>
  
   
  </div>
  
  <style>
    .voting-component {
      font-family: inherit;
    }
    
    .voting-component h3 {
      margin-bottom: 0.75rem;
      font-size: 1.125rem;
      line-height: 1.75rem;
      font-weight: 600;
    }
    
    .voting-component input[type="text"] {
      padding: 0.25rem;
       border:'none';
     
      width: 100%;
    }
    
    .voting-component button {
      transition: color 0.2s;
    }
  </style>