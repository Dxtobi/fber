<script>
	import { goto } from '$app/navigation';
  import { onMount } from 'svelte';

  // State management
  let animationsComplete = false;

  // Lifecycle: Initialize animations on page load
  onMount(() => {
    // Mark animations as complete after initial reveal
    setTimeout(() => {
      animationsComplete = true;
    }, 1500);

    // Reveal animated elements
    const animatedElements = document.querySelectorAll('.fade-in');
    animatedElements.forEach((el) => {
      // @ts-ignore
      el.style.opacity = '1';
      // @ts-ignore
      el.style.transform = 'translateY(0)';
    });
  });

  // Button interactions
  function handleCreateFormClick() {
    goto('/auth')
  }

  function handleLearnMoreClick() {
   goto('/')
  }

 
</script>

<style>
  @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .fade-in {
    animation: fadeIn 0.6s ease-out forwards;
    opacity: 0;
  }

  .glass-effect {
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .hover-scale {
    transition: transform 0.3s ease-in-out;
  }

  .hover-scale:hover {
    transform: scale(1.05);
  }

  .hover-shadow {
    transition: box-shadow 0.3s ease-in-out;
  }

  .hover-shadow:hover {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
</style>

<div class="bg-gray-200 min-h-screen flex items-center justify-center p-4">
  <!-- Main Content -->
  <div class="max-w-2xl w-full text-center relative z-20">
    <!-- Success Icon -->
    <div class="mb-8 fade-in" style="animation-delay: 0.2s;">
      <div class="w-24 h-24 mx-auto bg-green-500 rounded-full flex items-center justify-center shadow-lg">
        <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
        </svg>
      </div>
    </div>

    <!-- Main Card -->
    <div class="glass-effect rounded-3xl p-8 md:p-12 shadow-xl fade-in" style="animation-delay: 0.4s;">
      <!-- Success Message -->
      <h1 class="text-4xl md:text-5xl font-bold text-gray-800 mb-4 fade-in" style="animation-delay: 0.6s;">
        🎉 Success!
      </h1>
      <p class="text-xl md:text-2xl text-gray-700 mb-2 fade-in" style="animation-delay: 0.8s;">
        Your form has been submitted successfully!
      </p>
     
      <!-- Divider -->
      <div class="w-24 h-1 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mx-auto mb-8 fade-in" style="animation-delay: 1.2s;"></div>
      <!-- Call to Action -->
      <div class="fade-in" style="animation-delay: 1.4s;">
        <h2 class="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
          Want to create your own form?
        </h2>
        <p class="text-lg text-gray-700 mb-8">
          Build beautiful, responsive forms in minutes with our drag-and-drop form builder.
        </p>
        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a href='/auth'
            
            class="group bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 px-8 rounded-2xl hover-scale hover-shadow focus:outline-none focus:ring-4 focus:ring-green-300"
          >
            <span class="flex items-center justify-center">
              <svg class="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
              </svg>
              Create Your Form
            </span>
          </a>
          <a href='/'
            
            class="group bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-800 font-semibold py-4  rounded-2xl w-fit border border-gray-300 hover-scale hover-shadow transition-all duration-300 px-8"
          >
              Learn More
            
          </a>
        </div>
      </div>
      <!-- Back to Home Link -->
      
    </div>

    <!-- Features Preview -->
    <div class="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 fade-in" style="animation-delay: 1.8s;">
      <div class="glass-effect rounded-2xl p-6 text-center hover-scale hover-shadow">
        <div class="w-12 h-12 bg-blue-500 rounded-xl mx-auto mb-4 flex items-center justify-center">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
          </svg>
        </div>
        <h3 class="text-gray-800 font-semibold mb-2">Lightning Fast</h3>
        <p class="text-gray-700 opacity-80 text-sm">Create forms in minutes, not hours</p>
      </div>
      <div class="glass-effect rounded-2xl p-6 text-center hover-scale hover-shadow">
        <div class="w-12 h-12 bg-purple-500 rounded-xl mx-auto mb-4 flex items-center justify-center">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
          </svg>
        </div>
        <h3 class="text-gray-800 font-semibold mb-2">Mobile Ready</h3>
        <p class="text-gray-700 opacity-80 text-sm">Perfect on any device</p>
      </div>
      <div class="glass-effect rounded-2xl p-6 text-center hover-scale hover-shadow">
        <div class="w-12 h-12 bg-green-500 rounded-xl mx-auto mb-4 flex items-center justify-center">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <h3 class="text-gray-800 font-semibold mb-2">Secure</h3>
        <p class="text-gray-700 opacity-80 text-sm">Enterprise-grade security</p>
      </div>
    </div>
  </div>
</div>