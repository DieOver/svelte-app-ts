<script lang="ts">
	import active from "svelte-spa-router/active";
</script>

<style>
	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}
	a.active {
		color: red;
	}
</style>

<h1>Hello world!</h1>
<p>
	<a href="#/lorem/2" use:active={{ path: '/', className: 'active' }}>Lorem ipsum</a>
</p>