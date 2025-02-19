# Spaceship
A Selfhosted Start page for your Home labs. Inspired by [flame](https://github.com/pawelmalak/flame), this is more geared toward presentation, while not compromising functionality.

Configuration is done through a YAML file, which can be edited in the browser.
## Functionality
- ✏️ Create application tiles with icon, name and description
- 🔖 Create bookmarks (*Work in progress*)
- 🌃 Customise background, icons and colours.
- 🔍 Search (*Not Implemented*)
- 💉 Inject Custom CSS, for max customisability (*Not Implemented*)
- 🪶 Lightweight, built with SvelteKit

## Installation
### Docker
As of right now you need to clone the repo to build the docker image.

Config and other files are stored in the `/app/data` folder, set that as a volume to persist data.
```bash
# Build from Dockerfile
docker build -t spaceship:latest .
# Run the container
docker run -p 3000:3000 -v ./data:/app/data spaceship:latest
```
### From Source
#### Node
You need node to be installed, and [pnpm](https://pnpm.io/installation) is recommended as the preferred package manager.
```bash
# Install dependencies
pnpm install
# Build the project
pnpm build
# Run the server
node build
```
`data` folder is where your config is stored.
#### Deno
Modern JavaScript runtime.
```bash
# Install dependencies
deno install
# Build the project
deno build
# Run the server
deno --allow-env --allow-read --allow-net build/index.js
```

## License
This project is under **GNU General Public License v3.0**.