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
  NUMBER: {
    svg: textinput,
    type: 'NUMBER',
    label: 'Number',
    component: 'NumberInput',
    defaultStyles: {
      width: '100%',
      
      'border-radius': '20px',
      
      margin: '8px 0',
      'font-size': '15px',
      'font-family':
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      'background-color': '#ffffff',
      transition: 'border-color 0.2s ease, background-color 0.2s ease',
      color: '#0f1419',
      'box-shadow': 'none',
      'box-sizing': 'border-box',
      'focus-border-color': '#1d9bf0',
      'focus-background-color': '#ffffff',
      'focus-outline': 'none',
    },
    editableProperties: [
      {
        label: 'Placeholder',
        property: 'placeholder',
        type: 'text',
        defaultValue: 'Enter Phone No:',
      },
      {
        label: 'Required',
        property: 'required',
        type: 'checkbox',
        defaultValue: false,
      },
      {
        label: 'Label',
        property: 'label',
        type: 'text',
        defaultValue: 'Phone',
      },
      {
        label: 'Value',
        property: 'value',
        type: 'text',
        defaultValue:''
      },
      
    ],
  },
  DATETIME_PICKER: {
    svg: datepicker,
    type: 'DATETIME_PICKER',
    label: 'Date & Time',
    component: 'DateTimePicker',
    defaultStyles: {
      width: '100%',
      'border-radius': '20px',
      border: '1px solid #1d9bf0',
      padding: '12px 16px',
      'background-color': '#f7f9f9',
      'font-family':
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      'font-size': '15px',
      color: '#0f1419',
      transition: 'border-color 0.2s ease, background-color 0.2s ease',
      'focus-border-color': '#1d9bf0',
      'focus-background-color': '#ffffff',
      margin: '8px 0',
    },
    editableProperties: [
      {
        label: 'Placeholder',
        property: 'placeholder',
        type: 'text',
        defaultValue: 'Select date and time',
      },
      {
        label: 'Date Format',
        property: 'format',
        type: 'text',
        defaultValue: 'MMM D, YYYY h:mm A',
      },
      {
        label: 'Label',
        property: 'label',
        type: 'text',
        defaultValue: 'Date & Time',
      },
      {
        label: 'Show Calendar Icon',
        property: 'showIcon',
        type: 'checkbox',
        defaultValue: true,
      },
      {
        label: 'Value',
        property: 'value',
        type: 'date',
        defaultValue:''
      },
    ],
  },
  TEXT_INPUT: {
    svg: textinput,
    type: 'TEXT_INPUT',
    label: 'Text Input',
    component: 'TextInput',
    defaultStyles: {
      width: '100%',
      padding: '12px 16px',
      'border-radius': '20px',
     
      margin: '8px 0',
      'font-size': '15px',
      'font-family': '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      'background-color': '#ffffff',
      'transition': 'border-color 0.2s ease, background-color 0.2s ease',
      'color': '#0f1419',
      border: '1px solid #1d9bf0',
      'box-shadow': 'none',
      'box-sizing': 'border-box',
      'focus-border-color': '#1d9bf0',
      'focus-background-color': '#ffffff',
     
    },
    editableProperties: [
      {
        label: 'Input Type',
        property: 'type',
        type: 'select',
        options: [
          'text',
          'password',
          'email', 
          'number',
          
          'url',
          'search'
        ],
        defaultValue: 'text'
      },
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
      },
       {
        label: 'Value',
        property: 'value',
        type: 'text',
        defaultValue:''
      },
    ]
  },
  TEXTAREA_INPUT: {
    svg: textinput,
    type: 'TEXTAREA_INPUT',
    label: 'Textarea Input',
    component: 'TextareaInput',
    defaultStyles: {
      width: '100%',
      height: "300px",
      padding: '12px 16px',
      'border-radius': '20px',
      margin: '8px 0',
      'font-size': '15px',
      'font-family': '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      'background-color': '#ffffff',
      'transition': 'border-color 0.2s ease, background-color 0.2s ease',
      'color': '#0f1419',
      'box-shadow': 'none',
      'box-sizing': 'border-box',
      'focus-border-color': '#1d9bf0',
      'focus-background-color': '#ffffff',
    },
    editableProperties: [
      {
        label: 'Placeholder',
        property: 'placeholder',
        type: 'text',
        defaultValue: 'Tell us something..'
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
        defaultValue: 'Textarea Input'
      },
       {
        label: 'Value',
        property: 'value',
        type: 'text',
        defaultValue:''
      },
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
      'focus-border-color': '#1d9bf0',
      'margin': '12px 0',
      'font-family': '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      'box-shadow': '0 1px 3px rgba(0, 0, 0, 0.05)',
      color:'#000000'
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
      },
      {
        label: 'Value',
        property: 'value',
        type: 'text',
        defaultValue:'Option 1'
      },
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
      'focus-border-color': '#1d9bf0',

      color:'#000',
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
      },
       {
        label: 'Value',
        property: 'value',
        type: 'array',
        defaultValue:[]
      },
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
      'border-radius':'20px',
      'background-color': '#ffff',
      color:'#000000',
      margin: '5px 0',
      'position': 'relative',
      padding:'12px 16px',
    },
    editableProperties: [
       {
        label: 'Label',
        property: 'label',
        type: 'text',
        defaultValue: 'Select'
      },
      {
        label: 'Options',
        property: 'options',
        type: 'array',
        defaultValue: [
         'Option A',
         'Option B',
         'Option C'
        ]
      },
        {
        label: 'Value',
        property: 'value',
        type: 'text',
        defaultValue: 'Option C'
      },
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
      },
      {
        label: 'Value',
        property: 'value',
        type: 'text',
        defaultValue: ''
      },
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
      border: '1px solid #1d9bf0',
      'padding': '12px',
      'background-color': '#f7f9f9',
      'font-family': '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      'font-size': '15px',
      'color': '#0f1419',
      'transition': 'border-color 0.2s ease, 0.2s ease',
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
      },
      {
        label: 'Value',
        property: 'value',
        type: 'date',
        defaultValue: ''
      },
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
  },
  SLIDER: {
    svg: multisteps,
    type: 'SLIDER',
    label: 'Slider',
    component: 'Slider',
    defaultStyles: {
      width: '100%',
      padding: '8px 0',
      'background-color': '#f7f9f9',
      'border-radius': '8px',
      margin: '8px 0',
      'font-family': '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      color: '#0f1419',
      'box-shadow': 'none',
    },
    editableProperties: [
      {
        label: 'Min Value',
        property: 'min',
        type: 'number',
        defaultValue: 0,
      },
      {
        label: 'Max Value',
        property: 'max',
        type: 'number',
        defaultValue: 100,
      },
      {
        label: 'Step',
        property: 'step',
        type: 'number',
        defaultValue: 1,
      },
      {
        label: 'Label',
        property: 'label',
        type: 'text',
        defaultValue: 'Slider',
      },
      {
        label: 'Show Value',
        property: 'showValue',
        type: 'checkbox',
        defaultValue: true,
      },
    ],
  },
  CHECKBOX: {
    svg: multisteps,
    type: 'CHECKBOX',
    label: 'Checkbox',
    component: 'Checkbox',
    defaultStyles: {
      width: 'auto',
      padding: '2px 0',
      'font-size': '15px',
      'font-family': '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      color: '#0f1419',
      margin: '4px 0',
    },
    editableProperties: [
      {
        label: 'Label',
        property: 'label',
        type: 'text',
        defaultValue: 'Checkbox Label',
      },
      {
        label: 'Checked',
        property: 'checked',
        type: 'checkbox',
        defaultValue: false,
      },
      {
        label: 'Disabled',
        property: 'disabled',
        type: 'checkbox',
        defaultValue: false,
      },
      {
        label: 'Value',
        property: 'value',
        type: 'boolean',
        defaultValue: true
      },
    ],
  },
  YES_NO: {
    svg: multisteps,
    type: 'YES_NO',
    label: 'Yes/No',
    component: 'YesNo',
    defaultStyles: {
      width: '100%',
      padding: '12px 16px',
      'border-radius': '20px',
      border: '1px solid #eff3f4',
      'background-color': '#f7f9f9',
      'font-family': '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      'font-size': '15px',
      color: '#0f1419',
      margin: '8px 0',
      'box-shadow': 'none',
    },
    editableProperties: [
      {
        label: 'Question',
        property: 'question',
        type: 'text',
        defaultValue: 'Do you agree?',
      },
      {
        label: 'Default Answer',
        property: 'defaultValue',
        type: 'select',
        options: ['Yes', 'No'],
        defaultValue: 'Yes',
      },
      {
        label: 'label',
        property: 'label',
        type: 'text',
        defaultValue: 'Do you agree?',
      },
      {
        label: 'Required',
        property: 'required',
        type: 'checkbox',
        defaultValue: false,
      },
      {
        label: 'Value',
        property: 'value',
        type: 'boolean',
        defaultValue: true
      },
    ],
  },
};