<script>
    export let element;
</script>

<button
    style={Object.entries(element.styles || {}).map(([k, v]) => `${k}: ${v}`).join('; ')}
    type={element.editableProperties.find((/** @type {{ property: string; }} */ prop) => prop.property === 'submit')?.defaultValue || 'button'}
    class="outline-none select-none"
>
    {element.label || 'Button'}
</button>