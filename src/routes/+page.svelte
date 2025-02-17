<script>
	let { data } = $props()
	import { conf, config } from '$lib/config.js'
	import { writable } from 'svelte/store'
	import { onMount } from 'svelte'
	import '@mdi/font/css/materialdesignicons.css'
	
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
			
			let style = document.createElement('style')
			style.type = 'text/css'
			style.innerHTML = `
.appicon {
	--width: ${value.theme.icon_size} !important;
}
.app {
	background: ${value.theme.background} !important;
}`
			document.head.appendChild(style)
		})
	})
	function open(url, newtab) {
		if (newtab) {
			window.open(url, '_blank')
		} else {
			window.location.href = url
		}
	}
</script>

<div id="app">
	<nav>
		<img id="embelm" src="{$app.theme.embelm}" alt="{$config.name}">
		<h1>{$app.name}</h1>
	</nav>
	<div id="content">
		<div id="applications">
			{#each $applications as app}
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<a href="{app.url}" target="{app.newtab ? '_blank' : '_self'}" class="applink">
					<div class="application">
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
					</div>
				</a>
			{/each}
		</div>
	</div>
</div>

<style>
	nav {
		height: 40px;
		width: calc(100% - 40px);
		margin: 0;
		padding: 10px;
		background: rgba(0,0,0,0);
		backdrop-filter: blur(10px);
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: start;
		gap: 20px;
		user-select: none;
		border-radius: 20px;

		position: fixed;
		top: 10px;
		left: 10px;
		z-index: 2;
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
		background-position: center;
		background-size: cover;
		background-repeat: no-repeat;
		overflow: hidden;
		background: var(--bg);
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
		display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-around;
		align-content: center;
    gap: 20px;

		max-width: 1000px;
    margin: 0 auto;
    width: calc(100% - 40px);
		padding: 20px;
		overflow-y: auto;
	}
	.application {
		align-self: stretch;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

		width: calc(calc(1000px / 4) - 80px);
		cursor: pointer;
		padding: 20px;
		border-radius: 20px;
		transition-duration: .1s;
	}
	.application:hover {
		outline: 3px solid var(--accent);
	}
	.applink {
		text-decoration: none;
		color: inherit;
	}
	.appname {
		font-size: 16px;
		font-weight: bold;
	}
	.appdesc {
		font-size: 12px;
	}
	.appicon {
		--width: calc(calc(1000px / 4) - 120px);
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