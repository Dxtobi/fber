<script>
// @ts-nocheck

    export let label = "Assigned to";
    // @ts-ignore
    
    export let options = [];
    // @ts-ignore
    export let selectedOption = null;
  
    let isOpen = false;
  
    function toggleDropdown() {
      isOpen = !isOpen;
    }
    // @ts-ignore
  
    function selectOption(option) {
      selectedOption = option;
      isOpen = false;
    }
  </script>
  
  <div class="relative">
    <!-- Label -->
    <!-- svelte-ignore a11y_label_has_associated_control -->
    <label id="listbox-label" class="block text-sm/6 font-medium text-gray-900">{label}</label>
  
    <!-- Dropdown Button -->
    <button
      type="button"
      class="grid w-full cursor-default grid-cols-1 rounded-md bg-white py-1.5 pr-2 pl-3 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
      aria-haspopup="listbox"
      aria-expanded={isOpen}
      aria-labelledby="listbox-label"
      on:click={toggleDropdown}
    >
      <span class="col-start-1 row-start-1 flex items-center gap-3 pr-6">
        {#if selectedOption}
          <img
            src={selectedOption.image}
            alt=""
            class="size-5 shrink-0 rounded-full"
          />
          <span class="block truncate">{selectedOption.name}</span>
        {:else}
          <span class="block truncate">Select an option</span>
        {/if}
      </span>
      <svg
        class="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
        viewBox="0 0 16 16"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fill-rule="evenodd"
          d="M5.22 10.22a.75.75 0 0 1 1.06 0L8 11.94l1.72-1.72a.75.75 0 1 1 1.06 1.06l-2.25 2.25a.75.75 0 0 1-1.06 0l-2.25-2.25a.75.75 0 0 1 0-1.06ZM10.78 5.78a.75.75 0 0 1-1.06 0L8 4.06 6.28 5.78a.75.75 0 0 1-1.06-1.06l2.25-2.25a.75.75 0 0 1 1.06 0l2.25 2.25a.75.75 0 0 1 0 1.06Z"
          clip-rule="evenodd"
        />
      </svg>
    </button>
  
    <!-- Dropdown List -->
    {#if isOpen}
      <ul
        class="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-hidden sm:text-sm"
        tabindex="-1"
        role="listbox"
        aria-labelledby="listbox-label"
      >
        {#each options as option (option.id)}
          <li
            class="relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none hover:bg-indigo-600 hover:text-white"
            id={`listbox-option-${option.id}`}
            role="option"
            on:click={() => selectOption(option)}
          >
            <div class="flex items-center">
              <img
                src={option.image}
                alt=""
                class="size-5 shrink-0 rounded-full"
              />
              <span class="ml-3 block truncate">{option.name}</span>
            </div>
            {#if selectedOption?.id === option.id}
              <span class="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600">
                <svg
                  class="size-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
            {/if}
          </li>
        {/each}
      </ul>
    {/if}
  </div>