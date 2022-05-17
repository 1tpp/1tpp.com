<script>
	// @ts-ignore
	import Header from '$lib/header/Header.svelte';
	import '../app.css';

	let year = new Date().getFullYear();
</script>

<Header />

<main class="container mx-auto">
	<slot />
</main>

<footer class="flex justify-center items-center">
	<p>Copyright © {year}</p>
</footer>

<style>
</style>
