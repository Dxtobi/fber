<script>
// @ts-nocheck

	import { ELEMENT_TYPES } from "$lib/utils/elementTypes";

    export let element;
    
    // Initialize with default values from elementTypes if not set
    $: question = element.attributes?.question ?? ELEMENT_TYPES.VOTING.editableProperties.find(p => p.property === 'question').defaultValue;
    $: options = element.attributes?.options ?? ELEMENT_TYPES.VOTING.editableProperties.find(p => p.property === 'options').defaultValue;
    $: selectedOption = null;
  
    // Update element attributes when local values change
    $: if (element.attributes?.question !== question || element.attributes?.options !== options) {
      element.attributes = {
        ...element.attributes,
        question,
        options
      };
    }
  
    function addOption() {
      options = [...options, `Option ${options.length + 1}`];
    }
  
    function removeOption(index) {
      options = options.filter((_, i) => i !== index);
    }
  
    function updateOption(index, value) {
      options = options.map((opt, i) => i === index ? value : opt);
    }
  </script>
  
  <div 
    style={Object.entries(element.styles || {}).map(([k, v]) => `${k}: ${v}`).join('; ')}
    class="voting-component"
  >
    <h3 class="text-lg font-semibold mb-3 rounded bg-gray-100 border-none p-3">{question}</h3>
    
    <div class="space-y-2 mb-3">
      {#each options as option, index (index)}
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