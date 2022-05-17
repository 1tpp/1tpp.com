<script context="module">
	import { browser, dev } from '$app/env';

	// we don't need any JS on this page, though we'll load
	// it in dev so that we get hot module replacement...
	export const hydrate = dev;

	// ...but if the client-side router is already loaded
	// (i.e. we came here from elsewhere in the app), use it
	export const router = browser;

	// since there's no dynamic data here, we can prerender
	// it so that it gets served as a static asset in prod
	export const prerender = true;
</script>

<svelte:head>
	<title>About</title>
	<meta name="description" content="About this app" />
</svelte:head>

<div>
	<h1>About</h1>
	<p>
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, dolor. Soluta assumenda
		quisquam quis aut perferendis eveniet minus necessitatibus nam cum alias animi error impedit,
		recusandae distinctio doloribus tenetur? Laudantium. Suscipit laborum ratione voluptatibus odio
		earum distinctio beatae possimus nam. Illum ut rerum voluptatibus reprehenderit quo, tempora nam
		rem, quae sed facilis laboriosam repudiandae itaque commodi, mollitia odit illo? Eum.
	</p>
</div>
