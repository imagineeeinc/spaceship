import * as file from '$lib/file.js'

export function GET() {
	return new Response(file.getConfig())
}

export async function POST({ request }) {
	try {
		let conf = await request.text()
		file.setConfig(conf)
		return new Response('OK')
	} catch (e) {
		return new Response(e.message, { status: 500 })
	}
}