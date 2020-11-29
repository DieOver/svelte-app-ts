<script lang="ts">
    import { Global } from "../services/Global";
    import { replace } from "svelte-spa-router";

    import { emailValidator, requiredValidator } from "../validators/validators.js";
    import { createFieldValidator } from "../validators/validation.js";

    const [validityEmail, validateEmail]: any = createFieldValidator(
        requiredValidator(),
        emailValidator()
    );

    let email: string = "admin@admin.com";
    let password: string = "admin";

    let loginError: boolean = false;

    function onSubmit(ev: Event) {
        ev.preventDefault();
        if (email === "admin@admin.com" && password === "admin") {
            Global.isLoggedIn = true;
            loginError = false;
            replace("/home");
        } else {
            loginError = true;
        }
    }
</script>

<style type="text/scss">
    input {
        outline: none;
        border-width: 2px;

        &.validation-hint {
            color: red;
            padding: 6px 0;
        }

        &.field-danger {
            border-color: red;
        }

        &.field-success {
            border-color: green;
        }
    }
</style>

<h1>Faça o Login</h1>

{#if loginError}
    <p>Usuário ou Senha inválido.</p>
{/if}

<form novalidate on:submit={onSubmit}>
    <div>
        <label for="email">Email</label>
        <input
            name="email"
            id="email"
            type="email"
            bind:value={email}
            class:field-danger={$validityEmail.dirty && !$validityEmail.valid}
            class:field-success={$validityEmail.valid}
            use:validateEmail={email} />
        {#if $validityEmail.dirty && !$validityEmail.valid}
            <span class="validation-hint">{$validityEmail.message}</span>
        {/if}
    </div>
    <div>
        <label for="password">Senha</label>
        <input
            name="password"
            id="password"
            type="password"
            bind:value={password} />
    </div>
    <div><button disabled={!$validityEmail.valid}>LOGAR</button></div>
</form>
