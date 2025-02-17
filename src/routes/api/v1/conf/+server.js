import * as file from '$lib/file.js'

export function GET() {
	return new Response(file.getConfig())
}

export async function POST({ request }) {
	const formData = await request.formData()
	const conf = formData.get('conf')
	file.setConfig(conf)
	return new Response('OK')
}