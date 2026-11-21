// Checks the deck files in cards/ and builds index.html from src/plead-the-filth.html.
// Usage: node tools/build.mjs
//
// Editing a deck file does not need a rebuild: index.html loads cards/*.js when it opens.
// Run this after editing src/plead-the-filth.html, or any time to check the deck files.
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const FILES = ['crime', 'place', 'evidence', 'twist', 'special'];
const DECKS = { crime: 'C', place: 'P', evidence: 'E', twist: 'T', gavel: 'G' };
const CAP = 20;
const errors = [];
const warnings = [];

// Run each deck file the way the browser does, so a syntax slip (such as a stray backtick) is caught.
const raw = {};
for (const f of FILES) {
  const path = `cards/${f}.js`;
  let src;
  try { src = readFileSync(join(root, path), 'utf8'); } catch { errors.push(`${path} is missing`); continue; }
  try {
    vm.runInNewContext(src, { PleadTheFilth: { deck: (k, t) => (raw[k] = raw[k] || []).push(t) } }, { filename: path });
  } catch (e) {
    errors.push(`${path} could not be read: ${e.message}. Look for a stray \` character inside a card.`);
  }
}

// Same rules as parseDecks() in src/plead-the-filth.html.
const seen = new Set();
const cards = [];
for (const deck of Object.keys(DECKS)) {
  if (!raw[deck]) { errors.push(`no "${deck}" cards were found`); continue; }
  for (const line of raw[deck].join('\n').split(/\r?\n/)) {
    const t = line.trim();
    if (!t || t[0] === '#' || t.startsWith('//')) continue;
    const parts = t.split('|').map((x) => x.trim());
    let qty = 1;
    if (parts.length > 2 && /^[x×]\s*\d+$/i.test(parts.at(-1))) qty = parseInt(parts.pop().replace(/\D/g, ''), 10);
    let id = '', name, text;
    if (parts.length === 2) [name, text] = parts;
    else if (parts.length === 3) [id, name, text] = parts;
    else { errors.push(`${deck}: "${t}" needs to be  ID | Card name | Card text`); continue; }
    if (!name || !text) { errors.push(`${deck}: "${t}" is missing its ${name ? 'card text' : 'card name'}`); continue; }
    id = id.toUpperCase();
    if (id && seen.has(id)) { errors.push(`${deck}: the ID ${id} is used twice`); continue; }
    if (id) seen.add(id);
    cards.push({ id, deck, name, text, qty });
  }
}
for (const c of cards.filter((c) => !c.id)) {
  const n = Math.max(0, ...[...seen].map((id) => id.match(new RegExp(`^${DECKS[c.deck]}(\\d+)$`))).filter(Boolean).map((m) => +m[1]));
  c.id = DECKS[c.deck] + String(n + 1).padStart(2, '0');
  seen.add(c.id);
  warnings.push(`${c.deck}: "${c.name}" has no ID and will be numbered ${c.id}. Write ${c.id} in the file to keep it.`);
}

const count = (deck) => cards.filter((c) => c.deck === deck).reduce((n, c) => n + c.qty, 0);
for (const deck of ['crime', 'place', 'evidence', 'twist']) {
  if (count(deck) > CAP) warnings.push(`${deck} has ${count(deck)} cards. The printed game holds ${CAP}: cut ${count(deck) - CAP} before printing.`);
  for (const c of cards.filter((c) => c.deck === deck && c.text.length > 90)) {
    warnings.push(`${c.id} is ${c.text.length} characters long. Cards read best under 90.`);
  }
}
for (const deck of ['gavel']) {
  if (cards.filter((c) => c.deck === deck).length !== 1) errors.push(`there should be exactly one "${deck}" card`);
}

console.log(['crime', 'place', 'evidence', 'twist', 'gavel'].map((d) => `${d} ${count(d)}`).join(', '));
for (const w of warnings) console.log('warning: ' + w);
if (errors.length) {
  for (const e of errors) console.error('error: ' + e);
  console.error('index.html was not rebuilt.');
  process.exit(1);
}

const src = readFileSync(join(root, 'src/plead-the-filth.html'), 'utf8');
writeFileSync(join(root, 'index.html'), `<!doctype html>
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
`);
console.log(`index.html written: ${cards.reduce((n, c) => n + c.qty, 0)} cards in the deck files`);
