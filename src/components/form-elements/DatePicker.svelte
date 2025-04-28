<script>
    export let element;
  
    // Default value for the date picker
    let selectedDate = '';
  
    // Function to handle date selection
    // @ts-ignore
    function handleDateChange(event) {
      selectedDate = event.target.value;
    }
  </script>
  
  <div class="date-picker-container" style={Object.entries(element.styles || {}).map(([k, v]) => `${k}: ${v}`).join('; ')}>
    <input
      type="date"
      bind:value={selectedDate}
      placeholder={element?.attributes?.placeholder || "Select date"}
      on:change={handleDateChange}
      class="date-picker-input"
    />
    <span class="calendar-icon">
      <!-- Calendar SVG Icon -->
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="16" y1="2" x2="16" y2="6"></line>
        <line x1="8" y1="2" x2="8" y2="6"></line>
        <line x1="3" y1="10" x2="21" y2="10"></line>
      </svg>
    </span>
  </div>
  
  <style>
    /* Container for the date picker */
    .date-picker-container {
      display: flex;
      align-items: center;
      position: relative;
      width: fit-content;
      border-radius: 4px;
      overflow: hidden;
    }
  
    /* Input field styling */
    .date-picker-input {
      width: 100%;
      padding: 8px 30px 8px 8px; /* Space for the calendar icon */
      font-size: 14px;
      border: 1px solid #ccc;
      border-radius: 4px;
      outline: none;
      transition: border-color 0.2s ease-in-out;
      box-sizing: border-box;
    }
  
    /* Focus state for the input */
    .date-picker-input:focus {
      border-color: #4CAF50;
      box-shadow: 0 0 5px rgba(76, 175, 80, 0.5);
    }
  
    /* Calendar icon styling */
    .calendar-icon {
      position: absolute;
      right: 8px;
      top: 50%;
      transform: translateY(-50%);
      pointer-events: none; /* Prevent blocking input interaction */
      color: #aaa;
    }
  
    /* Hover effect for the calendar icon */
    .calendar-icon:hover {
      color: #666;
    }
  </style>