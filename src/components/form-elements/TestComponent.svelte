<script>
  // @ts-nocheck
  export let element;
	import { ELEMENT_TYPES } from "$lib/elementTypes";
  
  // Initialize with defaults from ELEMENT_TYPES if not set
  $: question = element.attributes?.question ?? 
      ELEMENT_TYPES.TEST.editableProperties.find(p => p.property === 'question').defaultValue;
  
  $: options = element.attributes?.options ?? 
      ELEMENT_TYPES.TEST.editableProperties.find(p => p.property === 'options').defaultValue;
  
  $: multipleAnswers = element.attributes?.multiple ?? 
      ELEMENT_TYPES.TEST.editableProperties.find(p => p.property === 'multiple').defaultValue;
  
  $: newOptionText = '';

  // Sync changes back to element.attributes
  $: if (element.attributes?.question !== question || 
         element.attributes?.options !== options ||
         element.attributes?.multiple !== multipleAnswers) {
    element.attributes = {
      ...element.attributes,
      question,
      options,
      multiple: multipleAnswers
    };
  }

  function addOption() {
    if (newOptionText.trim()) {
      options = [...options, { text: newOptionText, correct: false }];
      newOptionText = '';
    }
  }

  function removeOption(index) {
    options = options.filter((_, i) => i !== index);
  }

  function toggleCorrect(index) {
    options = options.map((opt, i) => 
      i === index ? { ...opt, correct: !opt.correct } : opt
    );
  }

  function updateOptionText(index, value) {
    options = options.map((opt, i) => 
      i === index ? { ...opt, text: value } : opt
    );
  }
</script>

<div style={Object.entries(element.styles || {}).map(([k, v]) => `${k}: ${v}`).join('; ')}>
  <input
    type="text"
    class="w-full text-lg font-semibold mb-3 p-2  rounded bg-gray-100 border-none"
    bind:value={question}
    placeholder="Enter question text"
    disabled
  />
  
  <div class="space-y-2 mb-3">
    {#each options as option, index (index)}
      <div class="flex items-center space-x-2 p-2 border-none rounded">
        <input
          type={multipleAnswers ? 'checkbox' : 'radio'}
          class="mr-2"
          checked={option.correct}
          on:change={() => toggleCorrect(index)}
          name="test-options"
          
        />
        <input
          type="text"
          class="flex-1 p-1  rounded border-none"
          value={option.text}
          on:input={(e) => updateOptionText(index, e.target.value)}
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