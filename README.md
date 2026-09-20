# Node / Express API starter

A Node / Express JSON API that deploys to [Dockhold](https://dockhold.eu) with
zero config. It's already a long-running server — it just listens on the port
Dockhold assigns.

[![Deploy on Dockhold](https://dockhold.eu/button.svg)](https://app.dockhold.eu/new?repo=https://github.com/dockhold/express-api-starter&name=express-api-starter&ref=button)

## Deploy it

1. Click **Use this template** (or fork this repo) to get your own copy.
2. Click the **Deploy to Dockhold** button above, or open
   [app.dockhold.eu/new](https://app.dockhold.eu/new), connect GitHub, and pick
   your repo.
3. Dockhold builds the included [`Dockerfile`](Dockerfile) and starts the API.
   It goes live at `https://<your-app>.dockhold.app` with HTTPS handled.

`GET /` returns a JSON greeting; `GET /health` returns `{ "status": "ok" }`.
Every later push to your main branch redeploys.

## Deploy with your AI tool

Install the Dockhold plugin or MCP server in your AI coding tool
([setup guide](https://dockhold.eu/docs/recipes/deploy-from-your-ai-tool)), then
say "put this online" in a folder with this template. The tool signs you in
through the browser once and reports the URL when the app is live.

Or from a terminal: `npx dockhold login`, then `npx dockhold deploy`.

## The one rule

In [`server.js`](server.js):

```js
const port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0", () => console.log(`listening on ${port}`));
```

Listen on `process.env.PORT` and bind `0.0.0.0`. Binding `localhost` or a fixed
port means no traffic reaches you.

## Config and secrets

Set plain config (feature flags, public URLs) in the dashboard. Put secrets —
API keys, tokens, passwords — in the Vault; they're encrypted and injected at
runtime. Read everything from `process.env`. See [`.env.example`](.env.example).

## Add a database

Enable the managed database add-on and Dockhold injects `DATABASE_URL`:

```js
const { Pool } = require("pg");
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
```

Apps are stateless — the filesystem is wiped on every restart and deploy.
Persist state in the database, not on local disk.

## Run it locally

```bash
npm install
PORT=3000 npm start
# curl http://localhost:3000/health
```

## Full walkthrough

[Deploy a Node / Express API](https://dockhold.eu/docs/recipes/deploy-a-node-express-api)
— the step-by-step recipe, including CORS and database fixes.
