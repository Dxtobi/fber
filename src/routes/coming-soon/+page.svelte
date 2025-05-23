<script lang="ts">
	import Footer from "../../components/landing/Footer.svelte";
	import Header from "../../components/landing/Header.svelte";

  let email = $state('');
  let isSubmitting = $state(false);
  let isSubmitted = $state(false);
  let error = $state('');
  
  function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  async function handleSubmit(event: Event) {
    event.preventDefault();
    
    if (!email.trim()) {
      error = 'Please enter your email address';
      return;
    }
    
    if (!validateEmail(email)) {
      error = 'Please enter a valid email address';
      return;
    }
    
    isSubmitting = true;
    error = '';
    
    try {
      //Simulate API call
      await fetch('/api/subscribe', {
        method:'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({email:email})
      });
      
      console.log('Email submitted:', email);
      isSubmitted = true;
      email = '';
    } catch (err) {
      error = 'Something went wrong. Please try again.';
    } finally {
      isSubmitting = false;
    }
  }
  
  function resetForm() {
    isSubmitted = false;
    error = '';
  }
</script>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  <Header/>
</div>
<div class="min-h-[50vh] bg-gray-50 relative overflow-hidden">
  
  
  <!-- Main content -->
  <div class="relative z-10">
    <!-- Header -->
   
    
    <!-- Main content area -->
    <div class="flex items-center justify-center min-h-[calc(100vh-120px)] px-8">
      <div class="max-w-md w-full">
        {#if !isSubmitted}
          <div class="space-y-6">
            <!-- Coming soon badge -->
            <div class="text-xs font-medium text-gray-500 tracking-wider uppercase">
              Coming Soon
            </div>
        
            <!-- Description -->
            <p class="text-gray-600 text-sm leading-relaxed">
              A simple form builder and data analysis tool with an intuitive drag-and-drop interface. Optionally enhance your workflow with AI-powered insights for smarter decision-making.
            </p>
            
            <!-- Main heading -->
            <h1 class="text-2xl font-semibold text-gray-900 leading-tight">
              Get notified<br>when we launch
            </h1>
            
            <!-- Email form -->
            {#if error}
                  <p class="text-red-500 text-xs mt-1">{error}</p>
            {/if}
            <form onsubmit={handleSubmit} class="flex space-x-3">
              <div class="flex-1">
                <input
                  type="email"
                  bind:value={email}
                  placeholder="Email address"
                  class="w-full px-4 py-3 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  class:border-red-300={error}
                  disabled={isSubmitting}
                />
               
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                class=" cursor-pointer px-6 py-3 bg-gray-900 text-white text-sm font-medium rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {#if isSubmitting}
                  <span class="flex items-center space-x-2">
                    <span class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  </span>
                {:else}
                  Subscribe
                {/if}
              </button>
            </form>
            
            <!-- Social links -->
            <div class="flex space-x-4 pt-4">
              <a href="https://x.com/programmer_dex/" aria-label="Twitter" class="text-gray-400 hover:text-gray-600 transition-colors">
                <iconify-icon icon="line-md:twitter-x" width="24" height="24"  style="color: #4a4949"></iconify-icon>
              </a>
              
            </div>
          </div>
        {:else}
          <!-- Success state -->
          <div class="text-center py-12">
            <svg class="w-12 h-12 mx-auto text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
            </svg>
            <h2 class="mt-4 text-2xl font-semibold text-gray-900">
              You're in!
            </h2>
            <p class="mt-2 text-gray-600">
              Thanks for subscribing. We'll keep you posted.
            </p>
            <button onclick={resetForm} class="mt-6 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-1 transition-colors">
              Okay
            </button>
          </div>
        {/if}
      </div>
    </div>
    
   <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Footer/>
    </div>
  </div>
</div>
