<script>
	import { updateFormStoreValue } from "../../stores/formStore";

   
     let {element} = $props()
  
    // Default value for the date picker
    let selectedDate = $state('');
  
    // Function to handle date selection
    // @ts-ignore
    function handleDateChange(event) {
      selectedDate = event.target.value;
      updateFormStoreValue(element.id, 'value', selectedDate)
    }

    // $effect(()=>{

    //   $inspect(element)
    // })
  </script>
  <span class="block text-sm font-medium text-gray-500 mb-1 ml-1">{element.properties.label}</span>
  <div class="date-picker-container" style={Object.entries(element.styles || {}).map(([k, v]) => `${k}: ${v}`).join('; ')}>
    <input
      type="date"
      value={element?.properties?.value}
      placeholder={element?.properties?.placeholder || "Select date"}
      onchange={handleDateChange}
      class="date-picker-input"
      
    />
  
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
      border: none;
      border-radius: 4px;
      background-color: transparent;
      outline: none;
      transition: border-color 0.2s ease-in-out;
      box-sizing: border-box;
    }
  
    /* Focus state for the input */
    .date-picker-input:focus {
      border-color: #4caf4f00;
      box-shadow: 0 0 5px rgba(76, 175, 79, 0);
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