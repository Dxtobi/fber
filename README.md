# SvelteKit Form Builder Project Structure

```
form-builder/
├── src/
│   ├── components/
│   │   ├── canvas/
│   │   │   ├── Canvas.svelte
│   │   │   ├── ComponentPreview.svelte
│   │   │   └── Sidebar.svelte
│   │   ├── form-elements/
│   │   │   ├── TextInput.svelte
│   │   │   ├── Button.svelte
│   │   │   ├── VotingComponent.svelte
│   │   │   ├── TestComponent.svelte
│   │   │   ├── SectionDivider.svelte
│   │   │   ├── MultiStepContainer.svelte
│   │   │   ├── FileUpload.svelte
│   │   │   ├── DatePicker.svelte
│   │   │   └── TextComponent.svelte
│   │   ├── editor/
│   │   │   ├── PropertyEditor.svelte
│   │   │   └── StyleEditor.svelte
│   │   └── preview/
│   │       ├── FormPreview.svelte
│   │       └── StepNavigation.svelte
│   ├── lib/
│   │   ├── svgs/
│   │   │   ├── datepicker.svelte
│   │   │   ├── textinput.svelte
│   │   │   ├── buttonicon.svelte
│   │   │   ├── vote.svelte
│   │   │   ├── text.svelte
│   │   │   ├── dividers.svelte
│   │   │   ├── multisteps.svelte
│   │   │   ├── fileupload.svelte
│   │   │   └── qa.svelte
│   │   ├── db/
│   │   │   ├── client.js
│   │   │   ├── forms.js
│   │   │   └── submissions.js
│   │   └── utils.js
│   ├── routes/
│   │   ├── +layout.svelte
│   │   ├── +page.svelte
│   │   ├── builder/
│   │   │   ├── +page.svelte
│   │   │   └── +page.server.js
│   │   ├── forms/
│   │   │   ├── [id]/
│   │   │   │   ├── +page.svelte
│   │   │   │   └── +page.server.js
│   │   │   ├── +page.svelte
│   │   │   └── +page.server.js
│   │   ├── dashboard/
│   │   │   ├── +page.svelte
│   │   │   └── +page.server.js
│   │   └── api/
│   │       ├── forms/
│   │       │   ├── +server.js
│   │       │   └── [id]/
│   │       │       ├── +server.js
│   │       │       └── submissions/+server.js
│   │       └── submissions/+server.js
│   └── stores/
│       ├── formStore.js
│       └── uiStore.js
├── static/
│   └── favicon.png
├── .env
├── .gitignore
├── package.json
├── svelte.config.js
└── vite.config.js
```