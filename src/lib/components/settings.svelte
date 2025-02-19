<script>
	import { writable } from "svelte/store";
	import { conf, updateConfig } from "$lib/config.js"
	export let close = writable(true)
	let config = writable($conf)

	function save() {
		conf.set($config)
		updateConfig()
		close.set(false)
	}
</script>

<div id="settings">
	<div id="settings-content">
		<div id="top">
			<button class="m-icon transperent" onclick={save}>save</button>
			<h1>Settings</h1>
			<button class="m-icon transperent" onclick={() => close.set(false)}>close</button>
		</div>
		<textarea id="config-editor" bind:value={$config}></textarea>
	</div>
</div>

<style>
	#settings {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		display: grid;
		place-items: center;
		background: rgba(0,0,0,0.5);
		backdrop-filter: blur(10px);
		z-index: 10;
	}
	#settings-content {
		margin: 20px;
		height: calc(100% - 80px);
		max-width: var(--main-width);
    margin: 0 auto;
    width: calc(100% - 80px);
		background: var(--tile-bg);
		backdrop-filter: blur(calc(var(--tile-blur) * 2));
		padding: 20px;
		border-radius: 10px;
		overflow-y: auto;
	}
	#top {
		position: sticky;
		top: 0;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		user-select: none;
		background: var(--tile-bg);
		backdrop-filter: blur(var(--tile-blur));
		border-radius: 10px;
	}
	#top h1 {
		font-size: x-large;
		margin: 0;
	}
	#config-editor {
		width: calc(100% - 30px);
		height: 75%;
		resize: vertical;
		transition-duration: 0;
	}
</style>