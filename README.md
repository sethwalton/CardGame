# Plead the Filth — playable prototype

A courtroom party card game for 3-6 adults. The game runs in a browser with one HTML page and four card-deck scripts. No build step, no server code, no dependencies to install.

## Files

```
index.html          the game, rulebook, card reference and playtest tools
Plead-the-Filth.html  standalone game for opening or sharing as a single file
build-offline.mjs   refreshes bundled cards, styles and artwork after edits
cards/crime.js      Crime deck
cards/place.js      Place deck
cards/evidence.js   Evidence deck
cards/twist.js      Twist deck
assets/             screen styles and the illustrated gavel
```

Keep `cards/` and `assets/` next to `index.html`. Each scenario deck contains 30 cards. Every player casts one vote for another player's case. Each case tied for the most votes earns one conviction for its owner.

## Deploying

Upload the whole folder, as is, to any static host: Netlify (drag and drop the folder), Vercel, GitHub Pages, Cloudflare Pages, an S3 bucket, itch.io (zip upload, "HTML" project type), or any ordinary web server. `index.html` is the entry page.

Double-click `Plead-the-Filth.html` to play offline. You can copy that one file anywhere. The editable `index.html` also carries backup copies of the decks and artwork for use when its folders are missing.

## Differences from the Claude-hosted version

- **Card review saving:** on Claude the review notes and stats were saved to a shared store. Elsewhere they save in each player's own browser (localStorage), so they aren't shared between people or devices.
- **Print sheets:** open the Cards tab to preview and print approved cards with their latest edits. The sheets can be downloaded as a separate HTML file if an embedded preview blocks printing.
- **Fonts:** loaded from Google Fonts, so they need an internet connection; offline it falls back to system fonts.

## Editing cards

Each file in `cards/` has instructions at the top. One card per line; save and reload the page.
Open `index.html` alongside the folders to see your edits. After editing, run `node build-offline.mjs` to refresh its embedded backup and regenerate the standalone game.
