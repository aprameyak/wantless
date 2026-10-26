# WantLess

A wishlist built to slow down impulse buying. Type an item or paste a link, press Enter, and it lands in an inbox where you can see how long you have wanted it before deciding.

## Features

- One-field capture: type a name or paste a URL and press Enter, with no other required fields
- Pasted links are saved with the site's hostname as the item name
- Each item shows how many days it has been on your list
- Move items from Inbox to Wishlist, mark them purchased, or delete them
- Entries are saved to a local JSON file

## Getting started

Requires Node.js.

```bash
npm install
npm start
```

Then open http://localhost:3026. `npm run dev` runs the same command.

## How it works

- `index.html` is a single page with the capture box, Inbox / Wishlist / Archived tabs, and the item list. It calls the API at `http://localhost:3026`.
- `server.js` is an Express app that serves the page and exposes:
  - `POST /api/items` and `GET /api/items?listId=inbox` to add and list items.
  - `PUT /api/items/:id/list`, `/purchase`, `/archive`, and `/desire` to move, mark, archive, or rate an item.
  - `DELETE /api/items/:id` and `GET /api/lists`.
- Items also store price, image, price history, and a desire rating (default 5), but the page does not expose those fields yet.
- Data is written to `data.json`, created on first run and ignored by git.

## Status

Prototype. Single user, no accounts. The Archived tab stays empty for now because the item list endpoint excludes archived items.

## License

MIT, see [LICENSE](LICENSE).
