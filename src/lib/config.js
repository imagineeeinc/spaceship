import { writable, get } from "svelte/store"
import { parse } from "@std/yaml"
import { browser } from "$app/environment"

export var conf = writable('')
export var config = writable({})

// if (browser) {
// 	let res = await fetch('./api/v1/conf', { method: 'GET' })
// 	res = await res.text()
// 	conf.set(res)
// 	config.set(parse(res))
// }

conf.subscribe((value) => config.set(parse(value)))

export function updateConfig() {
	if (browser) {
		fetch('./api/v1/conf', {
			method: 'POST',
			body: get(conf)
		})
	}
}