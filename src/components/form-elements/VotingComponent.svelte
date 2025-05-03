<script>
// @ts-nocheck


  import { formStore } from '../../stores/formStore';

    export let element;
    
   
   
   
    $: selectedOption = null;
  
  

    $:console.log(element,$formStore )
    
    
  </script>
  
  <div 
    style={Object.entries(element.styles || {}).map(([k, v]) => `${k}: ${v}`).join('; ')}
    class="voting-component"
  >
    <h3 class="text-lg font-semibold mb-3 rounded bg-gray-100 border-none p-3">{element?.properties?.question}</h3>
    
    <div class="space-y-2 mb-3">
      {#each element?.properties?.options||[] as option, index (index)}
        <div class="flex items-center w-full">
          <input
            type="radio"
            id={`option-${index}`}
            name="vote"
            class="mr-2"
            bind:group={selectedOption}
            value={option}
          />
          <input
            type="text"
            class="flex-1 p-1 border-none rounded"
            value={option}
            disabled
            on:input={(e) => updateOption(index, e.target.value)}
          />
         
        </div>
      {/each}
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