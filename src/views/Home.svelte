<script lang="ts">
    import { Global } from '../services/Global';
    import { replace } from "svelte-spa-router";

    function deslogar() {
        Global.isLoggedIn = false;
        replace("/");
    }
</script>

<h1>Dashboard</h1>
<button on:click={deslogar} >DESLOGAR</button>