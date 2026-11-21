// Wraps src/plead-the-filth.html (the page body) in a full HTML document so the
// game can be opened straight from disk or served by any static host.
// Usage: node tools/build.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const src = readFileSync(join(root, 'src/plead-the-filth.html'), 'utf8');

const cards = JSON.parse(src.match(/<script type="application\/json" id="card-data">([\s\S]*?)<\/script>/)[1]);
const count = (deck) => cards.filter((c) => c.deck === deck).reduce((n, c) => n + (c.qty || 1), 0);
for (const deck of ['crime', 'place', 'evidence', 'twist']) {
  if (count(deck) > 20) throw new Error(`${deck} deck has ${count(deck)} cards; the cap is 20`);
}

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<style>body{margin:0}img{max-width:100%}[hidden]{display:none!important}</style>
</head>
<body>
${src}
</body>
</html>
`;
writeFileSync(join(root, 'index.html'), html);
console.log(`index.html written: ${cards.reduce((n, c) => n + (c.qty || 1), 0)} cards`);
