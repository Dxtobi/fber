<!-- DeviceSimulator.svelte -->
<script>
    // @ts-nocheck
    import { onMount } from 'svelte';
    import * as FormElements from "../form-elements/index";
    import { formStore } from '../../stores/formStore';
    
    let elements = $state($formStore);

    formStore.subscribe((value) => {
      elements = value;
    });

    $effect(()=>{

    })

    onMount(() => {

    });

</script>

 <div class="device-simulator w-full flex flex-col bg-gray-100 ">
    {#each elements as element (element.id)}
    {@const Component = FormElements[element.component]}
        <Component  {element} />
    {/each}
 </div>