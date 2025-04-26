<script>
// @ts-nocheck

    export let element;
  
    // State for file handling
    /**
	 * @type {any[]}
	 */
    let selectedFiles = [];
    let dragActive = false;
  
    // Handle file selection
    /**
	 * @param {{ target: { files: any; }; dataTransfer: { files: any; }; }} event
	 */
    function handleFileSelect(event) {
      const files = Array.from(event.target.files || event.dataTransfer?.files || []);
      if (files.length > 0) {
        selectedFiles = files;
      }
    }
  
    // Handle drag events
    /**
	 * @param {{ preventDefault: () => void; }} event
	 */
    function handleDragEnter(event) {
      event.preventDefault();
      dragActive = true;
    }
  
    /**
	 * @param {{ preventDefault: () => void; }} event
	 */
    function handleDragLeave(event) {
      event.preventDefault();
      dragActive = false;
    }
  
    /**
	 * @param {{ preventDefault: () => void; }} event
	 */
    function handleDrop(event) {
      event.preventDefault();
      dragActive = false;
      // @ts-ignore
      handleFileSelect(event);
    }
  
    // Clear selected files
    function clearFiles() {
      selectedFiles = [];
    }
  </script>
  
  <div
    class="file-upload-container"
    style={Object.entries(element.styles || {}).map(([k, v]) => `${k}: ${v}`).join('; ')}
    on:dragenter={handleDragEnter}
    on:dragleave={handleDragLeave}
    on:dragover={(e) => e.preventDefault()}
    on:drop={handleDrop}
  >
    <!-- Hidden file input -->
    <input
      type="file"
      accept={element?.attributes?.accept || '*'}
      multiple={element?.attributes?.multiple || false}
      on:change={handleFileSelect}
      class="hidden"
      id="file-input"
    />
  
    <!-- Custom upload area -->
    <label for="file-input" class="upload-area">
      {#if selectedFiles.length === 0}
        <div class="upload-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="17 8 12 3 7 8"></polyline>
            <line x1="12" y1="3" x2="12" y2="15"></line>
          </svg>
        </div>
        <p class="upload-text">{dragActive ? 'Drop files here' : 'Drag & drop files or click to upload'}</p>
      {:else}
        <div class="file-list">
          {#each selectedFiles as file}
            <div class="file-item">
              <span>{file.name}</span>
              <button class="remove-file-btn" on:click={() => selectedFiles = selectedFiles.filter(f => f !== file)}>
                &#x2715; <!-- Close icon -->
              </button>
            </div>
          {/each}
        </div>
        <button class="clear-all-btn" on:click={clearFiles}>Clear All</button>
      {/if}
    </label>
  </div>
  
  <style>
    /* Container for the file upload */
    .file-upload-container {
      position: relative;
      width: 100%;
      padding: 20px;
      border: 2px dashed #cbd5e1;
      border-radius: 8px;
      background-color: #f9fafb;
      text-align: center;
      cursor: pointer;
      transition: border-color 0.2s ease-in-out;
    }
  
    /* Hover effect for the upload area */
    .file-upload-container:hover {
      border-color: #60a5fa;
    }
  
    /* Drag-and-drop active state */
    .file-upload-container.drag-active {
      border-color: #3b82f6;
      background-color: #e0f2fe;
    }
  
    /* Hidden file input */
    .hidden {
      display: none;
    }
  
    /* Upload area content */
    .upload-area {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      color: #475569;
    }
  
    /* Upload icon */
    .upload-icon svg {
      width: 40px;
      height: 40px;
      color: #60a5fa;
    }
  
    /* Upload text */
    .upload-text {
      font-size: 14px;
      font-weight: 500;
      color: #475569;
    }
  
    /* Selected files list */
    .file-list {
      display: flex;
      flex-direction: column;
      gap: 5px;
      margin-top: 10px;
    }
  
    /* Individual file item */
    .file-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 5px 10px;
      background-color: #f3f4f6;
      border-radius: 4px;
      font-size: 14px;
      color: #1e293b;
    }
  
    /* Remove file button */
    .remove-file-btn {
      background: none;
      border: none;
      color: #ef4444;
      font-size: 16px;
      cursor: pointer;
    }
  
    /* Clear all button */
    .clear-all-btn {
      margin-top: 10px;
      padding: 5px 10px;
      background-color: #ef4444;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 14px;
      cursor: pointer;
      transition: background-color 0.2s ease-in-out;
    }
  
    .clear-all-btn:hover {
      background-color: #dc2626;
    }
  </style>