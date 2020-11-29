<script lang="ts">
	import Router from "svelte-spa-router";
	import routes from "./routes";

	import { Global } from "./services/Global";

	let loadingPage: boolean;
	Global.loadingPage.subscribe((value) => loadingPage = value);

</script>

<Router {routes} />

{#if loadingPage}
    <section id="loadingPage">Carregando...</section>
{/if}

<style type="text/scss">
	section {
		#loadingPage {
			position: absolute;
			top: 0;
			left: 0;
			width: 100vw;
			height: 100vw;
			background-color: rgba(0, 0, 0, 0.2);
			
			align-items: center;
			justify-content: center;
			display: flex;
			font-weight: bold;
			font-size: 40px;
		}
	}
</style>