<script lang="ts">
    import { Global } from "../services/Global";
    import { replace } from "svelte-spa-router";

    function deslogar() {
        Global.isLoggedIn = false;
        replace("/");
    }
</script>

<style type="text/scss">
    * {
        box-sizing: border-box;
    }

    .text-align-center {
        text-align: center;
    }

    button {
        margin: auto;
        display: block;
    }
</style>

<h1 class="text-align-center">Dashboard</h1>
<button on:click={deslogar}>DESLOGAR</button>
