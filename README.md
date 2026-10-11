# WantLess

Frictionless shopping wishlist. Capture desires, reduce impulse buying.

## The Idea

WantLess makes managing shopping desires effortless. Add items in 1-2 seconds. Reflect on them over time. Make better purchasing decisions.

**Core UX:** No friction. No forms. No questions. Just type, hit Enter, done.

## Features

- **Instant Capture** - Type or paste. Press Enter. Done. No required fields.
- **Progressive Disclosure** - Simple by default. Advanced features available but not forced.
- **Smart Defaults** - New items go to Inbox. Automatic date tracking. Optional price history.
- **Anti-Impulse** - See how long items have been on your wishlist. Let desire fade. Reflect before buying.
- **Fast Mobile-First UI** - Built for speed. Works perfectly on phone and desktop.

## Quick Start

```bash
npm install
npm start
```

Open `http://localhost:3026`

1. Type anything (product name or URL)
2. Press Enter
3. Boom. Saved.

## The UX Test

- Open the app
- Type "Sony headphones" or paste `https://amazon.com/Sony-Headphones`
- Press Enter
- Close app
- Item is safely stored forever

No forms. No questions. No friction.

## Design Principles

- **Instant capture** - 1-2 interactions max
- **No mandatory fields** - Only item name/URL required
- **Progressive disclosure** - Hide advanced features until needed
- **Mobile-first** - Touch-friendly, keyboard shortcuts
- **Autosaving** - Changes save instantly
- **Undo-friendly** - No confirmation for reversible actions
- **Calm interface** - Minimal navigation, fast perceived performance

## Architecture

- Backend: Node.js + Express
- Database: JSON (file-based for MVP)
- Frontend: Vanilla JS (no build step)
- Mobile: Responsive design

## Future Features (Optional)

- Price tracking
- Budget limits
- Desire rating trends
- Cooldown timers
- Category organization
- Sharing wishlists
- Browser extension for instant capture
- Mobile app

