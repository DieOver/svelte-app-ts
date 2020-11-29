<script lang="ts">
    import { replace } from "svelte-spa-router";
    import { Global } from "../services/Global";

    function goBack() {
        Global.name.set("ANONYMOUS");
        replace("/");
    }
</script>

<style>
    h1 {
        color: #008cff;
        text-transform: uppercase;
        font-size: 4em;
        font-weight: 100;
    }
</style>

<h1>Lorem ipsum</h1>
<button on:click={() => goBack()}>Go Back</button>
