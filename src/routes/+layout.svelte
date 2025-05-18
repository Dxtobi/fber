<script lang="ts">
	import '../app.css';
	import 'iconify-icon'
	let { children } = $props();
</script>


<main class=" bg-gray-100"> 

	{@render children()}
</main>
