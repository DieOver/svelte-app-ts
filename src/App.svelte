<script lang="ts">
	import Router from "svelte-spa-router";
	import routes from "./routes";
	import { onDestroy } from "svelte";
	import { Global } from "./services/Global";

	let name = "";
	let name$ = Global.name.subscribe((value) => {
		name = value;
	});

	onDestroy(() => {
		name$();
	});
</script>

<Router {routes} />
