import * as file from '$lib/file.js'
import { parse } from '@std/yaml'

export function GET() {
	let conf = file.getConfig()
	conf = parse(conf)
	return new Response(`:root {
	${conf.theme.primary?`--primary: ${conf.theme.primary} !important;`:''}
	${conf.theme.secondary?`--secondary: ${conf.theme.secondary} !important;`:''}
	${conf.theme.accent?`--accent: ${conf.theme.accent} !important;`:''}
	${conf.theme.background?`--bg: ${conf.theme.background} !important;`:''}
	${conf.theme.tile_background?`--tile-bg: ${conf.theme.tile_background} !important;`:''}
	${conf.theme.tile_blur?`--tile-blur: ${conf.theme.tile_blur} !important;`:''}
	${conf.theme.main_width?`--main-width: ${conf.theme.main_width} !important`:''}
}
${conf.theme.icon_size?
	`.appicon {
	--width: ${conf.theme.icon_size} !important;
}`:''}
${conf.theme.hide_main_scrollbar?
	`#content::-webkit-scrollbar {
		width: 0;
		height: 0;
	}`:''}
`, { headers: { 'Content-Type': 'text/css' } })
}