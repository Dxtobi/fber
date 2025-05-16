<script lang="ts">
	import '../app.css';
	import 'iconify-icon'
	let { children } = $props();
</script>


<main class=" bg-neutral-100"> 

	{@render children()}
</main>
