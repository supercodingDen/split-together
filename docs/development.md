# Development

## Local data

`npm run db:local` creates the local tables once, before starting the app. Its configuration uses placeholder resource IDs and local storage only. If you have already initialized that database, do not run the initialization a second time.

`npm run dev` prints the development URL, normally http://localhost:5173. The example ledger is temporary. Real local ledgers are saved in the local database.

## Checks

`npm test` covers cent-based allocation, adjustments, multiple payers, receipt parsing, localization and live-preview consistency. `npm run typecheck` checks TypeScript; `npm run build` produces a production bundle.

For browser checks, install Chromium once:

```sh
npx playwright install chromium
```

Start the app in another terminal, then set `TEST_URL` to its address and run:

```sh
node tests/flow-ocr.mjs
node tests/localization-browser.mjs
node tests/redesign-browser.mjs
node tests/integration.mjs
```

The default test address is http://127.0.0.1:5177. You can start the app there with `npm run dev -- --port 5177`. `CHROME_PATH` optionally selects an existing Chrome executable.

These checks create and delete their own temporary ledgers. The OCR check creates a synthetic receipt; it is a smoke test, not a real-receipt accuracy benchmark.

## Hosting

The app runs on Cloudflare Workers with a D1 binding named `DB` and a private R2 binding named `BUCKET`. Apply both SQL migrations under `drizzle/` to a new database. Local emulators are included; production infrastructure and credentials are not.

The current hosted app uses Sites. `.openai/hosting.json` contains only binding declarations in this public snapshot. Register your own project before using the Sites publishing workflow. A build alone does not create a database, bucket or public deployment.

## Link access

Admin links can edit, publish and delete a ledger. Member upload links can submit and view only their own receipts. Read-only links show published expenses and settlement, without original images. Access tokens are stored as hashes on the server and are excluded from JSON backups.

The repository contains demonstration data and source code only. It does not include production receipts, ledgers, access links, local database files or deployment credentials.

## OCR assets

Run `npm run setup:ocr` before starting the app. It copies the worker and engine from the locked npm dependencies, and downloads English and Chinese language data from the Tesseract.js language-data host. The files are served locally by the app; receipt images are processed in the browser. The initial setup needs an internet connection.
