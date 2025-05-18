<script>
    // @ts-nocheck
    import { CANDC } from "$lib/utils/countryCodes";
    import { onMount } from 'svelte';
    import { updateFormStoreValue } from "../../stores/formStore";
	import { slide } from "svelte/transition";
    
    const countryCodes = CANDC;
    let selectedCountry = $state(countryCodes.find((c) => c.code === 'NG')); // Default to US
    let phoneNumber = $state('');
    let dropdownOpen = $state(false);
    let searchQuery = $state('');
    let filteredCountries = $state(countryCodes);
    let inputElement = $state();
    let dropdownElement=$state();
    let {element}=$props();
    // @ts-ignore
   
    onMount(() => {
      // Close dropdown when clicking outside
      document.addEventListener('click', (event) => {
        if (dropdownOpen && dropdownElement && !dropdownElement.contains(event.target) && event.target !== inputElement) {
          dropdownOpen = false;
        }
      });
    });
    
    const handleCountrySelect = (country) => {
      selectedCountry = country;
      dropdownOpen = false;
      searchQuery = '';
      filteredCountries = countryCodes;
      
      // Focus the phone input after selecting a country
      if (inputElement) {
        inputElement.focus();
      }
    };
    
    const toggleDropdown = (e) => {
      e.stopPropagation()
      dropdownOpen = !dropdownOpen;
      
      // If opening the dropdown, reset the search
      if (dropdownOpen) {
        searchQuery = '';
        filteredCountries = countryCodes;
      }
    };
    
    const handleSearchInput = (e) => {
      searchQuery = e.target.value.toLowerCase();
      filteredCountries = countryCodes.filter(country => 
        country.name.toLowerCase().includes(searchQuery) || 
        country.dial_code.includes(searchQuery) ||
        country.code.toLowerCase().includes(searchQuery)
      );
    };
    
    const getFlagEmoji = (countryCode) => {
      const codePoints = countryCode
        .toUpperCase()
        .split('')
        .map(char => 127397 + char.charCodeAt(0));
      return String.fromCodePoint(...codePoints);
    };
    
    // Format phone number as user types
    const formatPhoneNumber = (e) => {
      // Allow only numbers
      const numericValue = e.target.value.replace(/\D/g, '');
      phoneNumber = numericValue;
      updateFormStoreValue(element.id, 'value', phoneNumber)
    };
    </script>
    
    <div class="relative w-full " >
      <span class="block text-sm font-medium text-gray-500 mb-1 ml-1">{element.properties.label}</span>
      <div class="flex rounded-full overflow-hidden border border-gray-200 bg-gray-50 hover:bg-white focus-within:bg-white focus-within:border-blue-400 transition-all" style={Object.entries(element.styles)
        .map(([k, v]) => `${k}: ${v}`)
        .join('; ')}>
        <!-- Country code dropdown toggle -->
        <button 
          type="button"
          class="flex items-baseline-last     px-3 py-2 text-gray-700 hover:bg-gray-100 focus:outline-none"
          onclick={toggleDropdown}
        >
          <span class="mr-1 text-lg ">{getFlagEmoji(selectedCountry.code)}</span>
          <span class="mr-1 text-sm font-medium">{selectedCountry.dial_code}</span>
          <span ><iconify-icon icon="fa:sort-down"   ></iconify-icon></span>
        </button>
        
        <!-- Divider -->
        <div class="w-px h-full bg-gray-200"></div>
        
        <!-- Phone number input -->
        <input
          bind:this={inputElement}
          type="tel"
          placeholder={element.properties.placeholder}
          required={element.properties.required}
          value={element.properties.value}
          oninput={formatPhoneNumber}
          class="flex-1 px-4 py-2 bg-transparent border-none focus:outline-none text-gray-800 placeholder-gray-400"
        />
      </div>
      
      <!-- Country code dropdown -->
      {#if dropdownOpen}
        <div 
          bind:this={dropdownElement}
          in:slide={{axis:'y'}}
          class="absolute z-10 mt-1 w-full bg-[#ffffff3f] backdrop-blur-xl  rounded-xl shadow-lg border border-gray-200 max-h-80 overflow-y-auto"
        >
          <!-- Search input -->
          <div class="sticky top-0 bg-white p-2 border-b border-gray-100">
            <div class="relative">
              <input
                type="text"
                placeholder="Search countries..."
                bind:value={searchQuery}
                oninput={handleSearchInput}
                class="w-full pl-8 pr-4 py-2 bg-gray-50 rounded-full border-none focus:outline-none focus:ring-1 focus:ring-blue-400 text-sm"
                autofocus
              />
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 absolute left-3 top-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          
          <!-- Country list -->
          {#if filteredCountries.length > 0}
            <div class="py-1">
              {#each filteredCountries as country}
                <button
                  type="button"
                  class="flex items-center w-full px-4 py-2 hover:bg-blue-200 focus:bg-gray-50 focus:outline-none text-left"
                  class:bg-blue-50={selectedCountry.code === country.code}
                  onclick={() => handleCountrySelect(country)}
                >
                  <span class="text-lg mr-3">{getFlagEmoji(country.code)}</span>
                  <span class="text-sm">{country.name}</span>
                  <span class="ml-auto text-sm text-gray-500">{country.dial_code}</span>
                </button>
              {/each}
            </div>
          {:else}
            <div class="py-3 px-4 text-center text-sm text-gray-500">
              No countries found matching "{searchQuery}"
            </div>
          {/if}
        </div>
      {/if}
      
     
    </div>