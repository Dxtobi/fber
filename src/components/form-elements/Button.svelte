<script>
    export let element;
    console.log(element)
</script>

<button
    
    class="outline-none select-none"
    style={Object.entries(element.styles || {}).map(([k, v]) => `${k}: ${v}`).join('; ')}
>
    { 'Button'}
</button>