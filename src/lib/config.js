import { writable } from "svelte/store"
import { parse, stringify } from "@std/yaml"
import { browser } from "$app/environment"

export var conf = writable('')
export var config = writable({})

if (browser) {
	let res = await fetch('./api/v1/conf', { method: 'GET' })
	res = await res.text()
	conf.set(res)
	config.set(parse(res))
}