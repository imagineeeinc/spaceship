import * as fs from 'node:fs'
// import { env } from "$env/st/private"

let dataFolder = "./data"
if (!fs.existsSync(dataFolder)) {
  fs.mkdirSync(dataFolder)
}
if (!fs.existsSync(`${dataFolder}/config.yaml`)) {
	fs.copyFileSync('./example/config.yaml', `${dataFolder}/config.yaml`)
}

export function getConfig() {
	return fs.readFileSync(`${dataFolder}/config.yaml`, "utf-8")
}

export function setConfig(conf) {
	fs.writeFileSync(`${dataFolder}/config.yaml`, conf)
}