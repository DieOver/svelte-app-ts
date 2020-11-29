<script lang="ts">
    import { Global } from '../services/Global';
    import { replace } from "svelte-spa-router";

    let username: string = '';
    let password: string = '';

    function onSubmit(ev: Event) {
        ev.preventDefault();
        console.log('onSubmit', ev);
        if (username === 'admin' && password === 'admin') {
            console.log('Correct!!!');
            Global.isLoggedIn = true;
            replace("/home");
        } else {
            console.log('asrasrasras');
        }
    }
</script>

<h1>Faça o Login</h1>

<form novalidate on:submit={onSubmit}>
    <div>
        <label for="username">Username</label>
        <input name="username" id="username" type="text" bind:value={username} />
    </div>
    <div>
        <label for="password">Senha</label>
        <input name="password" id="password" type="password" bind:value={password} />
    </div>
    <div>
        <button>LOGAR</button>
    </div>
</form>