<script>
	let { data } = $props()
	import { conf, config } from '$lib/config.js'
	import { writable } from 'svelte/store'
	import { onMount } from 'svelte'
	import Settings from '$lib/components/settings.svelte';
	import '@mdi/font/css/materialdesignicons.css'
	conf.set(data.conf)
	
	let applications = writable([])
	let app = writable({
		name: 'Spaceship',
		theme: {
			embelm: './spaceship.png'
		}
	})

	onMount(() => {
		config.subscribe(value => {
			let list = []
			if (value.application_sort == 'alphabetical') {
				list = value.application.sort((a, b) => a.name.localeCompare(b.name))
			} else {
				list = value.application
			}
			applications.set(list)

			app.set(value)
		})
	})
	function open(url, newtab) {
		if (newtab) {
			window.open(url, '_blank')
		} else {
			window.location.href = url
		}
	}
	var settings = writable(false)
</script>

<div id="app">
	<nav>
		<img id="embelm" src="{$app.theme.embelm}" alt="{$config.name}">
		<h1>{$app.name}</h1>
		<div id="nav-right-align">
			<button class="m-icon transperent" onclick={() => settings.set(true)}>settings</button>
		</div>
	</nav>
	<div id="content">
		<div id="applications">
			{#each $applications as app}
				<a href="{app.url}" target="{app.newtab ? '_blank' : '_self'}" class="application">
						{#if !app.icon}
							<span class="appicon mdi mdi-application"></span>
						{:else}
							{#if app.icon.startsWith('http://') || app.icon.startsWith('https://') || app.icon.startsWith('./') || app.icon.startsWith('/')}
								<img class="appicon img {app.invert_icon ? 'invert' : ''}" src={app.icon} alt={app.name}>
							{:else}
								<span class="appicon mdi {app.icon}"></span>
							{/if}
						{/if}
						<br>
						<span class="appname">{app.name}</span>
						{#if app.desc}
							<br>
							<span class="appdesc">{app.desc}</span>
						{/if}
				</a>
			{/each}
		</div>
	</div>
</div>
{#if $settings}
	<Settings close={settings} />
{/if}

<style>
	nav {
		height: 40px;
		width: calc(100% - 40px);
		margin: 0;
		padding: 10px;
		backdrop-filter: blur(10px);
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: start;
		gap: 20px;
		user-select: none;
		border-radius: 10px;

		position: fixed;
		top: 10px;
		left: 10px;
		z-index: 2;
	}
	#nav-right-align {
		margin-left: auto;
	}
	#embelm {
		width: 40px;
		height: 40px;
		margin: 0;
		padding: 0;
		-webkit-user-drag: none;
	}
	h1 {
		font-size: 20px;
		font-weight: bold;
		margin: 0;
		padding: 0;
	}
	#app {
		height: 100vh;
		width: 100%;
		margin: 0;
		padding: 0;
		overflow: hidden;
		background: var(--app-bg);
		background-position: center;
		background-size: cover;
		background-repeat: no-repeat;
	}
	#content {
		height: 100vh;
		width: 100%;
		margin: 0;
		padding: 0;
		padding-top: 60px;
		overflow-y: auto;
	}
	#applications {
		gap: 20px;
		max-width: var(--main-width);
    margin: 0 auto;
		margin-bottom: 60px;
    width: calc(100% - 40px);
		padding: 20px;
		overflow-y: auto;
	
		display: grid;
		grid-template-columns: repeat(1, 1fr);
	}

	@media (min-width: 300px) {
		#applications {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (min-width: 670px) {
		#applications {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	@media (min-width: 900px) {
		#applications {
			grid-template-columns: repeat(4, 1fr);
		}
	}

	.application {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

		min-width: 100px;
		width: calc(100% - 40px);
		backdrop-filter: blur(var(--tile-blur));
		cursor: pointer;
		padding: 20px;
		border-radius: 10px;
		transition-duration: .1s;
		user-select: none;
		-webkit-user-drag: none;

		text-decoration: none;
		color: inherit;
		background: var(--tile-bg);
	}
	.application:hover {
		outline: 3px solid var(--accent);
	}
	.application:active {
		transform: scale(0.9);
	}
	.appname {
		font-size: 16px;
		font-weight: bold;
	}
	.appdesc {
		font-size: 12px;
	}
	.appicon {
		--width: calc(calc(var(--main-width) / 4) - 120px);
	}
	.appicon.mdi {
		display: inline-block;
		font-size: var(--width);
		width: var(--width);
		height: var(--width);
	}
	.appicon.img {
		width: var(--width);
		height: var(--width);
	}
	.appicon.invert {
		filter: invert(1);
	}
</style>