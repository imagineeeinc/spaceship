import * as file from '$lib/file.js'

export async function load({ params, url }) {
	return { conf: file.getConfig() }
}