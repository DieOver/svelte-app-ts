<script lang="ts">
import { onDestroy } from "svelte";

	import Router from "svelte-spa-router";
	import routes from "./routes";

	import { Global } from './services/Global';
	
	let name = '';
	let name$ = Global.name.subscribe(value => {
		name = value;
		console.log('name', name);
	});

	onDestroy(() => {
		name$();
	});
</script>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>

<main>
	<span>Name: {name}</span>
	<Router {routes} />
</main>
