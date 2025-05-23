<script>
	import { goto } from '$app/navigation';
	import { authApi } from '$lib/utils/auth';
  // @ts-ignore
  // @ts-ignore
  import { onMount } from 'svelte';
  
  // Form state
  let isLogin = $state(true);
  let currentStep = $state(1);
  let totalSteps = $state(3);
  
  // Form data
  let email = $state('');
  let password = $state('');
  let confirmPassword = $state('');
  let username = $state('');
  
  // Validation state
  let emailError = $state("");
  let passwordError = $state('');
  let confirmPasswordError = $state('');
  let usernameError = $state('');
  let formError = $state('');
  
  // Loading state
  let isLoading = $state(false);
  
  // Toggle between login and register
  function toggleAuthMode() {
    isLogin = !isLogin;
    resetForm();
  }
  
  // Move to next step
  function nextStep() {
    if (currentStep === 1) {
      // Validate email
      if (!validateEmail()) return;
    } else if (currentStep === 2 && !isLogin) {
      // Validate password
      if (!validatePassword()) return;
    }
    
    if (currentStep < totalSteps) {
      currentStep++;
    }
  }
  
  // Move to previous step
  function prevStep() {
    if (currentStep > 1) {
      currentStep--;
    }
  }
  
  // Validate email format
  function validateEmail() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      emailError = 'Email is required';
      return false;
    } else if (!emailRegex.test(email)) {
      emailError = 'Please enter a valid email address';
      return false;
    }
    emailError = '';
    return true;
  }
  
  // Validate password
  function validatePassword() {
    if (!password) {
      passwordError = 'Password is required';
      return false;
    } else if (password.length < 8) {
      passwordError = 'Password must be at least 8 characters';
      return false;
    }
    
    if (!isLogin) {
      if (password !== confirmPassword) {
        confirmPasswordError = 'Passwords do not match';
        return false;
      }
      confirmPasswordError = '';
    }
    
    passwordError = '';
    return true;
  }
  
  // Validate username
  function validateUsername() {
    if (!username) {
      usernameError = 'Username is required';
      return false;
    } else if (username.length < 3) {
      usernameError = 'Username must be at least 3 characters';
      return false;
    }
    usernameError = '';
    return true;
  }
  
  // Handle form submission
  // @ts-ignore
  async function handleSubmit(e) {
    e.preventDefault();
    formError = '';
    
    // Final validation based on form type
    if (isLogin) {
      if (!validateEmail() || !validatePassword()) return;
    } else {
      if (!validateEmail() || !validatePassword() || !validateUsername()) return;
    }
    
    try {
      isLoading = true;
      
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (isLogin) {

        console.log('Login attempt:', { email, password });
        await authApi.login(email, password);
        goto('/dashboard');
      } else {
        console.log('Registration attempt:', { email, password, username });
        await authApi.register(email, password, username);
        toggleAuthMode()
        
      }
      
      resetForm();
      // Handle successful login/registration (e.g., redirect)
    } catch (error) {
      // @ts-ignore
      formError = error.message || 'An error occurred. Please try again.';
    } finally {
      isLoading = false;
    }
  }
  
  // Reset form
  function resetForm() {
    currentStep = 1;
    email = '';
    password = '';
    confirmPassword = '';
    username = '';
    emailError = '';
    passwordError = '';
    confirmPasswordError = '';
    usernameError = '';
    formError = '';
  }
  
  // Progress percentage calculation
 // @ts-ignore
   let progressPercentage = $derived((currentStep / totalSteps) * 100);
</script>

<div class="min-h-screen bg-gray-300 flex items-center justify-center px-4">
  <div class="w-full max-w-md bg-gray-100 rounded-xl  overflow-hidden">
    <!-- Header -->
    <div class="p-5 flex flex-col items-center">
      <!-- Logo -->
      <div class=" rounded-full  flex items-center justify-center mb-4">
        <img src="/logo.svg" alt="Logo" class="h-20 w-20" />
      </div>
      
     
      
      <!-- Toggle buttons -->
      <div class="flex  rounded-full mt-4 p-1 w-full max-w-xs bg-gray-300">
        <button 
          class="flex-1 rounded-full py-2 text-sm font-medium transition-colors {isLogin ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-gray-400'} cursor-pointer"
          onclick={() => { isLogin = true; resetForm(); }}
        >
          Login
        </button>
        <button 
          class="flex-1 rounded-full py-2 text-sm font-medium transition-colors {!isLogin ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-gray-400'} cursor-pointer"
          onclick={() => { isLogin = false; resetForm(); }}
        >
          Register
        </button>
      </div>
    </div>
    
    <!-- Progress bar (for registration) -->
    {#if !isLogin}
      <div class="relative h-1 bg-gray-700 w-full">
        <div class="absolute left-0 top-0 h-full bg-green-500 transition-all duration-300" style="width: {progressPercentage}%"></div>
      </div>
      
    {/if}
    
    <!-- Form area -->
    <div class="p-5">
      {#if formError}
        <div class="mb-4 bg-red-900/50 border border-red-800 p-3 rounded-lg text-red-200 text-sm">
          {formError}
        </div>
      {/if}
      
      <form onsubmit={handleSubmit} class="space-y-4">
        <!-- Step 1: Email -->
        {#if currentStep === 1}
          <div class="space-y-2">
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              bind:value={email}
              onblur={validateEmail}
              class="w-full px-4 py-3 rounded-full bg-gray-100 border border-blue-600 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
            {#if emailError}
              <p class="text-red-400 text-xs">{emailError}</p>
            {/if}
          </div>
          
          {#if isLogin}
            <!-- Password (for login form) -->
            <div class="space-y-2">
              <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                bind:value={password}
                onblur={validatePassword}
                class="w-full px-4 py-3 rounded-full bg-gray-100 border border-blue-600 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
              />
              {#if passwordError}
                <p class="text-red-400 text-xs">{passwordError}</p>
              {/if}
            </div>
            
            <!-- "Forgot password" link -->
            <div class="text-right">
              <a href="#" class="text-sm text-blue-400 hover:text-blue-300">Forgot password?</a>
            </div>
          {/if}
        {/if}
        
        <!-- Step 2: Password (for registration) -->
        {#if currentStep === 2 && !isLogin}
          <div class="space-y-2">
            <label for="password" class="block text-sm font-medium text-gray-300">Password</label>
            <input
              type="password"
              id="password"
              bind:value={password}
              onblur={validatePassword}
              class="w-full px-4 py-3 rounded-full bg-gray-100 border border-blue-600 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Create a password"
            />
            {#if passwordError}
              <p class="text-red-400 text-xs">{passwordError}</p>
            {/if}
          </div>
          
          <div class="space-y-2">
            <label for="confirmPassword" class="block text-sm font-medium text-gray-300">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              bind:value={confirmPassword}
              class="w-full px-4 py-3 rounded-full bg-gray-100 border border-blue-600 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm your password"
            />
            {#if confirmPasswordError}
              <p class="text-red-400 text-xs">{confirmPasswordError}</p>
            {/if}
          </div>
          
          <div class="text-xs text-gray-400">
            Password should be at least 8 characters long
          </div>
        {/if}
        
        <!-- Step 3: Username (for registration) -->
        {#if currentStep === 3 && !isLogin}
          <div class="space-y-2">
            <label for="username" class="block text-sm font-medium text-gray-300">Username</label>
            <input
              type="text"
              id="username"
              bind:value={username}
              onblur={validateUsername}
              class="w-full px-4 py-3 rounded-full bg-gray-100 border border-blue-600 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Choose a username"
            />
            {#if usernameError}
              <p class="text-red-400 text-xs">{usernameError}</p>
            {/if}
          </div>
          
          <div class="text-xs text-gray-400">
            This will be your public display name
          </div>
        {/if}
        
        <!-- Navigation/Submit buttons -->
        <div class="flex gap-3 pt-2">
          {#if !isLogin && currentStep > 1}
            <button
              type="button"
              onclick={prevStep}
              class="flex-1 px-4 py-3 bg-gray-700 hover:bg-blue-500 text-gray-100 rounded-lg font-medium transition-colors"
            >
              Back
            </button>
          {/if}
          
          {#if isLogin || currentStep === totalSteps}
            <button
              type="submit"
              class="flex-1 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-gray-100 rounded-full font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              disabled={isLoading}
            >
              {#if isLoading}
                <span class="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
              {/if}
              {isLogin ? 'Sign in' : 'Create account'}
            </button>
          {:else}
            <button
              type="button"
              onclick={nextStep}
              class="flex-1 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-gray-100 rounded-full font-medium transition-colors"
            >
              Continue
            </button>
          {/if}
        </div>
      </form>
    </div>
    
    <!-- Footer -->
    <div class="p-5 text-center text-sm text-gray-400">
      {#if isLogin}
        Don't have an account? <button onclick={toggleAuthMode} class="text-blue-400 hover:text-blue-300">Sign up</button>
      {:else}
        Already have an account? <button onclick={toggleAuthMode} class="text-blue-400 hover:text-blue-300">Sign in</button>
      {/if}
    </div>
  </div>
</div>