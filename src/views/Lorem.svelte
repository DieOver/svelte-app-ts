<script lang="ts">
    import { onDestroy } from "svelte";
    import { push, pop, replace } from "svelte-spa-router";
    import { Global } from "../services/Global";

    function goBack() {
        Global.name.set("ANONYMOUS");
        replace("/");
    }

    export let params: any = {};
    let repeat = 1;
    $: {
        repeat = 1;
        if (params && params.repeat) {
            repeat = parseInt(params.repeat, 10);
            if (repeat < 1) {
                repeat = 1;
            }
        }
    }

    let name = "";
    let name$ = Global.name.subscribe((value) => {
        name = value;
        console.log("name", name);
    });

    onDestroy(() => {
        name$();
    });
</script>

<style>
    h1 {
        color: #008cff;
        text-transform: uppercase;
        font-size: 4em;
        font-weight: 100;
    }
</style>

<span>Name: {name}</span>

<h1>Lorem ipsum</h1>
<p><button on:click={() => goBack()}>Go somewhere</button></p>
<p>
    Tip: try changing the number in the URL's fragment, e.g.
    <code>#/lorem/4</code>
</p>
{#each Array(repeat) as _}
    <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed
        consequatur dicta, explicabo delectus, cupiditate, rem illo repellat
        aperiam saepe id minus ipsa. Illum libero consectetur fuga neque
        officia, adipisci commodi.Porro eius harum sed architecto maxime,
        molestiae cum ad dignissimos eum, nihil eligendi? Non quo, modi officia
        doloribus distinctio pariatur sed? Veniam facere beatae ipsam
        reprehenderit suscipit! Sequi, distinctio debitis.
    </p>
{/each}
