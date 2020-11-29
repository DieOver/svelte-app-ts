<script lang="ts">
    import { Global } from "../services/Global";
    import { replace } from "svelte-spa-router";
    import { createFieldValidator } from "../validators/validation.js";
    import {
        emailValidator,
        requiredValidator,
    } from "../validators/validators.js";

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
    * {
        box-sizing: border-box;
    }

    .text-align-center {
        text-align: center;
    }

    section.form-container {
        padding: 20px;
        width: 100%;
        margin: auto;
        form {
            div.input-form {
                margin-bottom: 20px;
                label {
                    font-weight: 200;
                    font-size: 0.8rem;
                }

                button {
                    appearance: none;
                    width: 100%;
                    margin: 0;
                }

                input {
                    appearance: none;
                    width: 100%;
                    outline: none;
                    border-width: 0;
                    border-bottom-width: 1px;
                    padding-left: 0;
                    margin: 0;

                    &.validation-hint {
                        color: #ff0040;
                        padding: 6px 0;
                    }

                    &.field-danger {
                        border-color: #ff0040;
                    }

                    &.field-success {
                        border-color: green;
                    }
                }
            }
        }
    }

    @media screen and (min-width: 768px) {
        section.form-container {
            width: 500px;
        }
    }
</style>

<h1 class="text-align-center">Faça o Login</h1>

{#if loginError}
    <p class="text-align-center">Usuário ou Senha inválido.</p>
{/if}

<section class="form-container">
    <form novalidate on:submit={onSubmit}>
        <div class="input-form">
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
        <div class="input-form">
            <label for="password">Senha</label>
            <input
                name="password"
                id="password"
                type="password"
                bind:value={password} />
        </div>
        <div class="input-form">
            <button disabled={!$validityEmail.valid}>LOGAR</button>
        </div>
    </form>
</section>
