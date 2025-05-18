<script>
// @ts-nocheck

  import { updateFormStoreValue } from "../../stores/formStore";
  import { onMount } from "svelte";
  
  let { element } = $props();
  
  // Date state management
  let selectedDate = $state(element?.properties?.value || '');
  let showCalendar = $state(false);
  let currentMonth = $state(new Date());
  let formattedDate = $state('');
  let datePickerRef = $state();
  
  // Weekday labels
  const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  
  // Month names for display
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  // Update the form store when the selected date changes
  // @ts-ignore
  function updateDate(dateStr) {
    console.log(dateStr)
    selectedDate = dateStr;
    updateFormStoreValue(element.id, 'value', selectedDate);
    formatDisplayDate();
    showCalendar = false;
  }
  
  // Format the date for display
  function formatDisplayDate() {
    if (!selectedDate) {
      formattedDate = '';
      return;
    }
    
    const date = new Date(selectedDate);
    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    
    formattedDate = `${month} ${day}, ${year}`;
  }
  
  // Handle direct input changes
  function handleInputChange(event) {
    updateDate(event.target.value);
  }
  
  // Toggle calendar visibility
  function toggleCalendar() {
    showCalendar = !showCalendar;
  }
  
  // Navigate to the previous month
  function prevMonth() {
    currentMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
  }
  
  // Navigate to the next month
  function nextMonth() {
    currentMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);
  }
   function prevYear() {
    currentMonth = new Date(currentMonth.getFullYear() - 1, currentMonth.getMonth(), 1);
  }
  
  // Navigate to the next month
  function nextYear() {
    currentMonth = new Date(currentMonth.getFullYear() + 1, currentMonth.getMonth(), 1);
  }
  // Generate days array for the calendar
  function getDays() {
    const month = currentMonth.getMonth();
    const year = currentMonth.getFullYear();
    
    // Get the first day of the month
    const firstDay = new Date(year, month, 1).getDay();
    
    // Get the last day of the month
    const lastDay = new Date(year, month + 1, 0).getDate();
    
    // Create array for the days
    const days = [];
    
    // Add empty spaces for days before the 1st of the month
    for (let i = 0; i < firstDay; i++) {
      days.push({ day: '', isCurrentMonth: false, date: null });
    }
    
    // Add days of the current month
    for (let i = 1; i <= lastDay; i++) {
      const dayDate = new Date(year, month, i);
      const dateString = dayDate.toDateString();
      
      days.push({
        day: i,
        isCurrentMonth: true,
        date: dateString,
        isSelected: dateString === selectedDate,
        isToday: isToday(dayDate)
      });
    }
    
    return days;
  }
  
  // Check if a date is today
  function isToday(date) {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  }
  
  // Close calendar when clicking outside
  function handleClickOutside(event) {
    if (datePickerRef && !datePickerRef.contains(event.target)) {
      showCalendar = false;
    }
  }
  
  // Initialize
  onMount(() => {
    document.addEventListener('click', handleClickOutside);
    formatDisplayDate();
    
    if (!currentMonth || isNaN(currentMonth.getTime())) {
      currentMonth = new Date();
    }
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  });
</script>

<div class="relative w-full" bind:this={datePickerRef}>
  <span class="block text-sm font-medium text-gray-500 mb-1 ml-1">{element.properties.label}</span>
  
  <div class="date-picker-container" style={`width:${element.styles.width}`}>
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <div class="date-display" onclick={toggleCalendar} role="button" tabindex="0" style={`padding:${element.styles.padding}; border-radius:${element.styles['border-radius']}`}>
      <input
        type="date"
        value={selectedDate}
        class="date-hidden-input"
        onchange={handleInputChange}
      />
      
      <div class="date-display-text">
        {formattedDate || element?.properties?.placeholder || "Select date"}
      </div>
      
      <div class="calendar-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
      </div>
    </div>
    
    {#if showCalendar}
      <div class="calendar-dropdown">
         <div class="calendar-header">
          <!-- svelte-ignore a11y_consider_explicit_label -->
          <button class="month-nav-btn" onclick={prevYear}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          
          <div class="month-year-display">
            {currentMonth.getFullYear()}
          </div>
          
          <!-- svelte-ignore a11y_consider_explicit_label -->
          <button class="month-nav-btn" onclick={nextYear}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
        <div class="calendar-header">
          <!-- svelte-ignore a11y_consider_explicit_label -->
          <button class="month-nav-btn" onclick={prevMonth}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          
          <div class="month-year-display">
            {monthNames[currentMonth.getMonth()]} 
          </div>
          
          <!-- svelte-ignore a11y_consider_explicit_label -->
          <button class="month-nav-btn" onclick={nextMonth}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
        
        <div class="calendar-body">
          <div class="weekdays">
            {#each weekDays as day}
              <div class="weekday">{day}</div>
            {/each}
          </div>
          
          <div class="days-grid">
            {#each getDays() as { day, isCurrentMonth, date, isSelected, isToday }}
              {#if isCurrentMonth}
                <button 
                  class="day-cell" 
                  class:selected={isSelected}
                  class:today={isToday}
                  onclick={() => date && updateDate(date)}
                >
                  {day}
                </button>
              {:else}
                <div class="day-cell empty">{day}</div>
              {/if}
            {/each}
          </div>
          
          <div class="calendar-footer">
            <button class="today-btn" onclick={() => updateDate(new Date().toISOString().split('T')[0])}>
              Today
            </button>
            <button class="close-btn" onclick={() => showCalendar = false}>
              Close
            </button>
          </div>
        </div>
        
      </div>
    {/if}
  </div>
</div>

<style>
  /* Container for the date picker */
  .date-picker-container {
    position: relative;
  }
  
  /* Date display */
  .date-display {
    display: flex;
    align-items: center;
    position: relative;
   
    border: 1px solid #ddd;
    border-radius: 6px;
    background-color: white;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .date-display:hover {
    border-color: #1d9bf0;
  }
  
  /* Hide the native date input */
  .date-hidden-input {
    position: absolute;
    opacity: 0;
    width: 1px;
    height: 1px;
  }
  
  /* Display text styling */
  .date-display-text {
    flex: 1;
    font-size: 14px;
    color: #4b5563;
  }
  
  /* Calendar icon */
  .calendar-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #1d9bf0;
  }
  
  /* Calendar dropdown */
  .calendar-dropdown {
    position: absolute;
    top: calc(100% + 5px);
    left: 0;
    width: 280px;
    background-color: #ffffff61;
    backdrop-filter: blur(15px);
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 50;
    animation: fadeIn 0.2s ease;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  /* Calendar header */
  .calendar-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px;
    border-bottom: 1px solid #f3f4f6;
  }
  
  .month-year-display {
    font-weight: 600;
    color: #374151;
  }
  
  .month-nav-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border: none;
    background-color: #f3f4f6;
    border-radius: 50%;
    cursor: pointer;
    color: #4b5563;
    transition: all 0.2s ease;
  }
  
  .month-nav-btn:hover {
    background-color: #e5e7eb;
    color: #1f2937;
  }
  
  /* Calendar body */
  .calendar-body {
    padding: 12px;
  }
  
  /* Weekdays row */
  .weekdays {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    margin-bottom: 8px;
  }
  
  .weekday {
    text-align: center;
    font-size: 12px;
    font-weight: 600;
    color: #6b7280;
    padding: 4px 0;
  }
  
  /* Days grid */
  .days-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 2px;
  }
  
  .day-cell {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 32px;
    font-size: 13px;
    border: none;
    background: transparent;
    border-radius: 50%;
    cursor: pointer;
    color: #4b5563;
    transition: all 0.15s ease;
  }
  
  .day-cell:hover:not(.empty) {
    background-color: #f3f4f6;
  }
  
  .day-cell.selected {
    background-color: #1d9bf0;
    color: white;
    font-weight: 600;
  }
  
  .day-cell.today:not(.selected) {
    border: 1px solid #1d9bf0;
    font-weight: 600;
  }
  
  .day-cell.empty {
    cursor: default;
    color: #d1d5db;
  }
  
  /* Footer */
  .calendar-footer {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    padding-top: 12px;
    border-top: 1px solid #f3f4f6;
    margin-top: 8px;
  }
  
  .today-btn, .close-btn {
    padding: 4px 10px;
    font-size: 12px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .today-btn {
    background-color: #f3f4f6;
    color: #4b5563;
  }
  
  .today-btn:hover {
    background-color: #e5e7eb;
    color: #1f2937;
  }
  
  .close-btn {
    background-color: #1d9bf0;
    color: white;
  }
  
  .close-btn:hover {
    background-color: #0993ef;
  }
</style>