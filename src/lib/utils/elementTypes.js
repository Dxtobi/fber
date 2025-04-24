import datepicker from '../svgs/datepicker.svelte';
import textinput from '../svgs/textinput.svelte';
import buttonicon from '../svgs/buttonicon.svelte';
import vote from '../svgs/vote.svelte';
import text from '../svgs/text.svelte';
import dividers from '../svgs/dividers.svelte';
import multisteps from '../svgs/multisteps.svelte';
import fileupload from '../svgs/fileupload.svelte';
import Qa from '$lib/svgs/qa.svelte';



export const ELEMENT_TYPES = {
    TEXT_INPUT: {
      svg:textinput,
      type: 'TEXT_INPUT',
      label: 'Text Input',
      component: 'TextInput',
      defaultStyles: {
        width: '300px',
        padding: '8px',
        'border-radius': '4px',
        border: '1px solid #ccc',
        margin:'0px'
      },
      editableProperties: [
        {
          label: 'Placeholder',
          property: 'placeholder',
          type: 'text',
          defaultValue: ''
        },
        {
          label: 'Required',
          property: 'required',
          type: 'checkbox',
          defaultValue: false
        }
      ]
    },
    BUTTON: {
      svg:buttonicon,
      type: 'BUTTON',
      label: 'Button',
      component: 'Button',
      defaultStyles: {
        width: '300px',
        padding: '10px 20px',
        'border-radius': '4px',
        border: '1px solid gray',
        'background-color': '#4CAF50',
        'hover-background-color': '#45a049', 
        color: 'white',
        cursor: 'pointer'
      },
      editableProperties: [
        {
          label: 'Button Text',
          property: 'text',
          type: 'text',
          defaultValue: 'Button'
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
        }

      ]
    },
    VOTING: {
      svg:vote ,
      type: 'VOTING',
      label: 'Voting Component',
      component: 'VotingComponent',
      defaultStyles: {
        width: '300px',
        padding: '20px',
        'background-color': '#fff',
        'border-radius': '8px'
      },
      editableProperties: [
        {
          label: 'Question',
          property: 'question',
          type: 'text',
          defaultValue: 'What do you think?'
        },
        {
          label: 'Options',
          property: 'options',
          type: 'array',
          defaultValue: ['Option 1', 'Option 2']
        }
      ]
    },
    TEST: {
      svg:Qa,
      type: 'TEST',
      label: 'Test Component',
      component: 'TestComponent',
      defaultStyles: {
        width: '400px',
        padding: '20px',
        'background-color': '#ffff',
        'border-radius': '8px'
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
            { text: 'Option B', correct: false }
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
      svg:dividers,
      type: 'SECTION_DIVIDER',
      label: 'Section Divider',
      component: 'SectionDivider',
      defaultStyles: {
          width: '100%',
          height: '2px',
          'background-color': '#e5e7eb',
          margin: '40px 0'
      },
      editableProperties: [
          {
              label: 'Title',
              property: 'title',
              type: 'text',
              defaultValue: 'Section Title'
          },
          {
              label: 'Show Title',
              property: 'showTitle',
              type: 'checkbox',
              defaultValue: true
          }
      ]
  },

  MULTI_STEP_CONTAINER: {
      svg:multisteps,
      type: 'MULTI_STEP_CONTAINER',
      label: 'Multi-Step Form',
      component: 'MultiStepContainer',
      defaultStyles: {
          width: '100%',
          padding: '20px',
          'background-color': '#f9fafb',
          'border-radius': '8px'
      },
      editableProperties: [
          {
              label: 'Step Titles',
              property: 'steps',
              type: 'array',
              defaultValue: ['Step 1', 'Step 2']
          },
          {
              label: 'Show Progress Bar',
              property: 'showProgress',
              type: 'checkbox',
              defaultValue: true
          }
      ]
  },

  FILE_UPLOAD: {
      svg:fileupload,
      type: 'FILE_UPLOAD',
      label: 'File Upload',
      component: 'FileUpload',
      defaultStyles: {
          width: '100%',
          padding: '20px',
          border: '2px dashed #cbd5e1',
          'border-radius': '8px'
      },
      editableProperties: [
          {
              label: 'Accept File Types',
              property: 'accept',
              type: 'text',
              defaultValue: 'image/*,.pdf,.doc,.docx'
          },
          {
              label: 'Multiple Files',
              property: 'multiple',
              type: 'checkbox',
              defaultValue: false
          }
      ]
  },

  DATE_PICKER: {
      svg:datepicker,
      type: 'DATE_PICKER',
      label: 'Date Picker',
      component: 'DatePicker',
      defaultStyles: {
          width: '300px',
          padding: '8px',
          'border-radius': '4px',
          border: '1px solid #ccc'
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
              defaultValue: 'YYYY-MM-DD'
          }
      ]
  }
  };