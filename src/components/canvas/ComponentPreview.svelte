<!-- src/components/canvas/ComponentPreview.svelte -->
<script>
  // @ts-nocheck
    import { uiStore } from '../../stores/uiStore';
    import TextInput from '../form-elements/TextInput.svelte';
    import Button from '../form-elements/Button.svelte';
    import VotingComponent from '../form-elements/VotingComponent.svelte';
    import TestComponent from '../form-elements/TestComponent.svelte';
    import SectionDivider from '../form-elements/SectionDivider.svelte';
    import MultiStepContainer from '../form-elements/MultiStepContainer.svelte';
    import FileUpload from '../form-elements/FileUpload.svelte';
    import DatePicker from '../form-elements/DatePicker.svelte';
    import TextComponent from '../form-elements/TextComponent.svelte';
    
    
    // Component prop passed from parent
    export let component;
    
    // Convert style object to CSS style string
    function styleToString(styleObj) {
      return Object.entries(styleObj || {})
        .map(([key, value]) => `${key}: ${value};`)
        .join(' ');
    }
  </script>
  
  <div class="component-preview" style={styleToString(component.styles)}>
    {#if component.type === 'TEXT_INPUT'}
      <TextInput 
        label={component.properties.label} 
        placeholder={component.properties.placeholder}
        required={component.properties.required}
        editable={$uiStore.editMode}
      />
    {:else if component.type === 'BUTTON'}
      <Button 
        text={component.properties.text}
        disabled={component.properties.disabled}
        type={component.properties.submit}
        editable={$uiStore.editMode}
      />
    {:else if component.type === 'VOTING'}
      <VotingComponent 
        question={component.properties.question}
        options={component.properties.options}
        editable={$uiStore.editMode}
      />
    {:else if component.type === 'TEST'}
      <TestComponent 
        question={component.properties.question}
        options={component.properties.options}
        multiple={component.properties.multiple}
        editable={$uiStore.editMode}
      />
    {:else if component.type === 'SECTION_DIVIDER'}
      <SectionDivider 
        title={component.properties.title}
        showTitle={component.properties.showTitle}
        editable={$uiStore.editMode}
      />
    {:else if component.type === 'MULTI_STEP_CONTAINER'}
      <MultiStepContainer 
        steps={component.properties.steps}
        showProgress={component.properties.showProgress}
        editable={$uiStore.editMode}
      />
    {:else if component.type === 'FILE_UPLOAD'}
      <FileUpload 
        label={component.properties.label}
        accept={component.properties.accept}
        multiple={component.properties.multiple}
        editable={$uiStore.editMode}
      />
    {:else if component.type === 'DATE_PICKER'}
      <DatePicker 
        label={component.properties.label}
        placeholder={component.properties.placeholder}
        format={component.properties.format}
        editable={$uiStore.editMode}
      />
    {:else if component.type === 'TEXT'}
      <TextComponent 
        content={component.properties.content}
        textType={component.properties.textType}
        editable={$uiStore.editMode}
      />
    {:else}
      <div class="unknown-component">
        Unknown component type: {component.type}
      </div>
    {/if}
  </div>
  
  <style>
    .component-preview {
      width: 100%;
      padding: 8px;
      box-sizing: border-box;
    }
    
    .unknown-component {
      padding: 16px;
      background-color: #fee2e2;
      border: 1px solid #fecaca;
      border-radius: 4px;
      color: #b91c1c;
    }
  </style>