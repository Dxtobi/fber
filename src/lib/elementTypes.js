// src/lib/elementTypes.js
import datepicker from '$lib/svgs/datepicker.svelte';
import textinput from '$lib/svgs/textinput.svelte';
import buttonicon from '$lib/svgs/buttonicon.svelte';
import vote from '$lib/svgs/vote.svelte';
import text from '$lib/svgs/text.svelte';
import dividers from '$lib/svgs/dividers.svelte';
import multisteps from '$lib/svgs/multisteps.svelte';
import fileupload from '$lib/svgs/fileupload.svelte';
import qa from '$lib/svgs/qa.svelte';
//COMPONENTS


export const ELEMENT_TYPES = {
  TEXT_INPUT: {
    svg: textinput,
    type: 'TEXT_INPUT',
    label: 'Text Input',
    component: 'TextInput',
    defaultStyles: {
      width: '100%',
      padding: '12px 16px',
      'border-radius': '20px',
      border: '1px solid #eff3f4',
      margin: '8px 0',
      'font-size': '15px',
      'font-family': '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      'background-color': '#f7f9f9',
      'transition': 'border-color 0.2s ease, background-color 0.2s ease',
      'color': '#0f1419',
      'box-shadow': 'none',
      'box-sizing': 'border-box',
      'focus-border-color': '#1d9bf0',
      'focus-background-color': '#ffffff',
      'focus-outline': 'none'
    },
    editableProperties: [
      {
        label: 'Placeholder',
        property: 'placeholder',
        type: 'text',
        defaultValue: 'What\'s happening?'
      },
      {
        label: 'Required',
        property: 'required',
        type: 'checkbox',
        defaultValue: false
      },
      {
        label: 'Label',
        property: 'label',
        type: 'text',
        defaultValue: 'Text Input'
      }
    ]
  },
  BUTTON: {
    svg: buttonicon,
    type: 'BUTTON',
    label: 'Button',
    component: 'Button',
    defaultStyles: {
      width: 'auto',
      padding: '8px 16px',
      'border-radius': '50px',
      border: 'none',
      'background-color': '#1d9bf0',
      'hover-background-color': '#1a8cd8',
      color: 'white',
      cursor: 'pointer',
      'font-weight': '700',
      'font-size': '15px',
      'font-family': '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      'text-align': 'center',
      'min-width': '80px',
      'transition': 'background-color 0.2s ease',
      'box-shadow': 'none',
      'text-transform': 'none',
      'disabled-opacity': '0.5',
      'margin': '8px 0'
    },
    editableProperties: [
      {
        label: 'Button Text',
        property: 'text',
        type: 'text',
        defaultValue: 'Post'
      },
      {
        label: 'Disabled',
        property: 'disabled',
        type: 'checkbox',
        defaultValue: false
      },
      {
        label: 'Type',
        property: 'submit',
        type: 'text',
        defaultValue: 'submit'
      },
      {
        label: 'Button Variant',
        property: 'variant',
        type: 'select',
        options: ['primary', 'secondary', 'outlined'],
        defaultValue: 'primary'
      }
    ]
  },
  VOTING: {
    svg: vote,
    type: 'VOTING',
    label: 'Poll',
    component: 'VotingComponent',
    defaultStyles: {
      width: '100%',
      padding: '16px',
      'background-color': '#fff',
      'border-radius': '16px',
      'border': '1px solid #eff3f4',
      'margin': '12px 0',
      'font-family': '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      'box-shadow': '0 1px 3px rgba(0, 0, 0, 0.05)'
    },
    editableProperties: [
      {
        label: 'Question',
        property: 'question',
        type: 'text',
        defaultValue: 'Create a poll'
      },
      {
        label: 'Options',
        property: 'options',
        type: 'array',
        defaultValue: ['Option 1', 'Option 2', 'Option 3', 'Option 4']
      },
      {
        label: 'Poll Duration',
        property: 'duration',
        type: 'select',
        options: ['1 day', '3 days', '7 days', '1 month'],
        defaultValue: '1 day'
      }
    ]
  },
  TEST: {
    svg: qa,
    type: 'TEST',
    label: 'Test Component',
    component:'TestComponent',
    defaultStyles: {
      width: '100%',
      padding: '16px',
      'background-color': '#fff',
      'border-radius': '16px',
      'border': '1px solid #eff3f4',
      'margin': '12px 0',
      'font-family': '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      'box-shadow': '0 1px 3px rgba(0, 0, 0, 0.05)'
    },
    editableProperties: [
      {
        label: 'Question',
        property: 'question',
        type: 'text',
        defaultValue: 'Sample question?'
      },
      {
        label: 'Options',
        property: 'options',
        type: 'array',
        defaultValue: [
          { text: 'Option A', correct: true },
          { text: 'Option B', correct: false },
          { text: 'Option C', correct: false }
        ]
      },
      {
        label: 'Multiple Answers',
        property: 'multiple',
        type: 'checkbox',
        defaultValue: false
      }
    ]
  },
  SECTION_DIVIDER: {
    svg: dividers,
    type: 'SECTION_DIVIDER',
    label: 'Section Divider',
    component: 'SectionDivider',
    defaultStyles: {
      width: '100%',
      height: '1px',
      'background-color': '#eff3f4',
      margin: '16px 0',
      'position': 'relative'
    },
    editableProperties: [
      {
        label: 'Title',
        property: 'title',
        type: 'text',
        defaultValue: 'Latest posts'
      },
      {
        label: 'Show Title',
        property: 'showTitle',
        type: 'checkbox',
        defaultValue: true
      },
      {
        label: 'Title Position',
        property: 'titlePosition',
        type: 'select',
        options: ['left', 'center', 'right'],
        defaultValue: 'left'
      }
    ]
  },
  SELECT: {
    svg: dividers,
    type: 'SELECT',
    label: 'SELECT',
    component: 'Select',
    defaultStyles: {
      width: '100%',
      height: '1px',
      'background-color': '#eff3f4',
      margin: '16px 0',
      'position': 'relative'
    },
    editableProperties: [
      {
        label: 'Title',
        property: 'title',
        type: 'text',
        defaultValue: 'Latest posts'
      },
      {
        label: 'Show Title',
        property: 'showTitle',
        type: 'checkbox',
        defaultValue: true
      },
      {
        label: 'Title Position',
        property: 'titlePosition',
        type: 'select',
        options: ['left', 'center', 'right'],
        defaultValue: 'left'
      }
    ]
  },
  MULTI_STEP_CONTAINER: {
    svg: multisteps,
    type: 'MULTI_STEP_CONTAINER',
    label: 'Multi-Step Form',
    component: 'MultiStepContainer',
    defaultStyles: {
      width: '100%',
      padding: '16px',
      'background-color': '#ffffff',
      'border-radius': '16px',
      'border': '1px solid #eff3f4',
      'margin': '12px 0',
      'font-family': '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      'box-shadow': '0 1px 3px rgba(0, 0, 0, 0.05)'
    },
    editableProperties: [
      {
        label: 'Step Titles',
        property: 'steps',
        type: 'array',
        defaultValue: [
          { title: 'Basic Info', content: [] },
          { title: 'Details', content: [] },
          { title: 'Review', content: [] },
        ],
      },
      {
        label: 'Show Progress Bar',
        property: 'showProgress',
        type: 'checkbox',
        defaultValue: true,
      },
      {
        label: 'Progress Color',
        property: 'progressColor',
        type: 'text',
        defaultValue: '#1d9bf0'
      }
    ],
  },
  FILE_UPLOAD: {
    svg: fileupload,
    type: 'FILE_UPLOAD',
    label: 'File Upload',
    component: 'FileUpload',
    defaultStyles: {
      width: '100%',
      padding: '20px',
      border: '2px dashed #eff3f4',
      'border-radius': '16px',
      'background-color': '#f7f9f9',
      'color': '#536471',
      'font-family': '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      'text-align': 'center',
      'transition': 'all 0.2s ease',
      'hover-border-color': '#1d9bf0',
      'hover-background-color': '#e8f5fd',
      'margin': '8px 0'
    },
    editableProperties: [
      {
        label: 'Accept File Types',
        property: 'accept',
        type: 'text',
        defaultValue: 'image/*,.gif,.mp4'
      },
      {
        label: 'Multiple Files',
        property: 'multiple',
        type: 'checkbox',
        defaultValue: true
      },
      {
        label: 'Label',
        property: 'label',
        type: 'text',
        defaultValue: 'Add photos or video'
      },
      {
        label: 'Max File Size (MB)',
        property: 'maxSize',
        type: 'number',
        defaultValue: 20
      }
    ]
  },
  DATE_PICKER: {
    svg: datepicker,
    type: 'DATE_PICKER',
    label: 'Date Picker',
    component: 'DatePicker',
    defaultStyles: {
      width: '100%',
      'border-radius': '20px',
      border: '1px solid #eff3f4',
      'padding': '12px 16px',
      'background-color': '#f7f9f9',
      'font-family': '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      'font-size': '15px',
      'color': '#0f1419',
      'transition': 'border-color 0.2s ease, background-color 0.2s ease',
      'focus-border-color': '#1d9bf0',
      'focus-background-color': '#ffffff',
      'margin': '8px 0'
    },
    editableProperties: [
      {
        label: 'Placeholder',
        property: 'placeholder',
        type: 'text',
        defaultValue: 'Select date'
      },
      {
        label: 'Date Format',
        property: 'format',
        type: 'text',
        defaultValue: 'MMM D, YYYY'
      },
      {
        label: 'Label',
        property: 'label',
        type: 'text',
        defaultValue: 'Date'
      },
      {
        label: 'Show Calendar Icon',
        property: 'showIcon',
        type: 'checkbox',
        defaultValue: true
      }
    ]
  },
  TEXT: {
    svg: text,
    type: 'TEXT',
    label: 'Text',
    component: 'TextComponent',
    defaultStyles: {
      width: '100%',
      padding: '4px 0',
      'font-size': '15px',
      'font-weight': 'normal',
      color: '#0f1419',
      'text-align': 'left',
      margin: '4px 0',
      'font-family': '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      'line-height': '1.5'
    },
    editableProperties: [
      {
        label: 'Text Content',
        property: 'content',
        type: 'text',
        defaultValue: 'What\'s happening?'
      },
      {
        label: 'Text Type',
        property: 'textType',
        type: 'select',
        options: ['paragraph', 'heading', 'subheading', 'timestamp', 'username', 'displayname'],
        defaultValue: 'paragraph'
      },
      {
        label: 'Text Color',
        property: 'textColor',
        type: 'select',
        options: ['default', 'muted', 'primary', 'error'],
        defaultValue: 'default'
      }
    ]
  }
};