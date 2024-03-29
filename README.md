# My Nuxt 3 Simple To Do App
Simple To Do Web App powered by Nuxt 3 and Pinia

## Notes
Node v21.0.0 makes the sass preprocessor getting an error so make sure that you install the LTS or latest version of node on your local machine

## Fake REST API Setup
To start, I'm using this [package](https://github.com/typicode/json-server) for setting up the fake REST API on this app

To guide you up, kindly please follow the steps below:

---`there's a instructions on the package's documentation if you want to follow your own setup or if you want to install this locally in the app`---
* do `yarn install -g json-server`
* then create a directory inside the app called `data`
    * filepath: `./data`
* Inside the directory, create an file called `db.json`
    * filepath: `./data/db.json`
* Inside `db.json` file, paste this JSON data in order to have a initial setup for our fake REST API:
    * in this way, the `todos` will set up from the `json-server` as our fake REST API endpoint
```
{
  "todos": []
}
```
* Open a new terminal, then run `json-server -w --port=8000 ./data/db.json`
* Open `localhost:8000` on your browser and you should be able to see the fake REST API endpoint page

## My Nuxt 3 Simple To Do App Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
