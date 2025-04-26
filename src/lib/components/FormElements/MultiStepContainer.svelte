<script>
    export let element;
  
    // State for current step
    let currentStep = 0;
  
    // Extract step titles and content from attributes
    $: steps = Array.isArray(element?.attributes?.steps)
      // @ts-ignore
      ? element.attributes.steps.map((step, index) => ({
          ...step,
          content: step.content || [], // Default to empty content if not provided
        }))
      : [{ title: 'Step 1', content: [] }, { title: 'Step 2', content: [] }];
  
    // Progress bar visibility
    $: showProgress = element?.attributes?.showProgress || true;
  
    // Handle navigation
    function goToStep(index) {
      if (index >= 0 && index < steps.length) {
        currentStep = index;
      }
    }
  
    function nextStep() {
      if (currentStep < steps.length - 1) {
        currentStep++;
      }
    }
  
    function prevStep() {
      if (currentStep > 0) {
        currentStep--;
      }
    }
  
    // Check if the current step is the last step
    $: isLastStep = currentStep === steps.length - 1;
  
    // Dynamic submit handler
    function handleSubmit() {
      alert('Form submitted!');
      // Implement your form submission logic here
    }
  </script>
  
  <div class="multi-step-container" style={Object.entries(element.styles || {}).map(([k, v]) => `${k}: ${v}`).join('; ')}>
    <!-- Progress Bar -->
    {#if showProgress}
      <div class="progress-bar">
        {#each steps as step, index}
          <div
            class="progress-step"
            class:active={index === currentStep}
            class:completed={index < currentStep}
            on:click={() => goToStep(index)}
          >
            {step.title}
          </div>
        {/each}
      </div>
    {/if}
  
    <!-- Step Content -->
    <div class="step-content">
      <h3>{steps[currentStep].title}</h3>
      <!-- Render components for the current step -->
      {#each steps[currentStep].content as component}
        <svelte:component this={components[component.type]} {...component.props} />
      {/each}
    </div>
  
    <!-- Navigation Buttons -->
    <div class="navigation-buttons">
      <button
        class="prev-btn"
        disabled={currentStep === 0}
        on:click={prevStep}
      >
        Previous
      </button>
      <button
        class="next-btn"
        on:click={isLastStep ? handleSubmit : nextStep}
      >
        {isLastStep ? 'Submit' : 'Next'}
      </button>
    </div>
  </div>
  
  <style>
    /* Multi-step container */
    .multi-step-container {
      width: 100%;
      padding: 20px;
      background-color: #f9fafb;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
  
    /* Progress bar */
    .progress-bar {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
    }
  
    /* Progress step */
    .progress-step {
      flex: 1;
      text-align: center;
      padding: 10px;
      border: 1px solid #cbd5e1;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.2s ease-in-out;
      position: relative;
    }
  
    .progress-step.active {
      background-color: #3b82f6;
      color: white;
      border-color: #3b82f6;
    }
  
    .progress-step.completed {
      background-color: #4ade80;
      color: white;
      border-color: #4ade80;
    }
  
    .progress-step:not(:last-child)::after {
      content: '';
      position: absolute;
      top: 50%;
      right: -20px;
      width: 40px;
      height: 1px;
      background-color: #cbd5e1;
      transform: translateY(-50%);
    }
  
    /* Step content */
    .step-content {
      margin-bottom: 20px;
    }
  
    /* Navigation buttons */
    .navigation-buttons {
      display: flex;
      justify-content: space-between;
    }
  
    .prev-btn,
    .next-btn {
      padding: 10px 20px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      transition: background-color 0.2s ease-in-out;
    }
  
    .prev-btn {
      background-color: #cbd5e1;
      color: #1e293b;
    }
  
    .prev-btn:hover {
      background-color: #94a3b8;
    }
  
    .next-btn {
      background-color: #3b82f6;
      color: white;
    }
  
    .next-btn:hover {
      background-color: #2563eb;
    }
  
    .prev-btn:disabled,
    .next-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  </style>