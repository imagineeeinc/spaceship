export async function load({ params, url }) {
	let res = await fetch(url.origin + '/api/v1/conf', { method: 'GET' })
	res = res.text()
	return { conf: res }
}