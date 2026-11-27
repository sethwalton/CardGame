// Refresh the offline copy after editing the decks or artwork. Run with Node.js.
import fs from 'node:fs';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const local = name => fileURLToPath(new URL(name, import.meta.url));
const decks = {};
const registry = { deck(key, block) { (decks[key] ??= []).push(block); } };
const scenarioDecks = ['crime', 'place', 'evidence', 'twist'];
for (const file of scenarioDecks) {
  vm.runInNewContext(fs.readFileSync(local('cards/' + file + '.js'), 'utf8'),
    { PleadTheFilth: registry }, { filename: file + '.js' });
}
for (const key of scenarioDecks) {
  if (!decks[key]?.length) throw new Error('Missing deck: ' + key);
}
const gavelImage = 'data:image/webp;base64,' + fs.readFileSync(local('assets/gavel.webp')).toString('base64');
const theme = fs.readFileSync(local('assets/courtroom.css'), 'utf8');
const json = JSON.stringify({ decks, gavelImage }).replaceAll('<', '\\u003c');
const indexFile = local('index.html');
let page = fs.readFileSync(indexFile, 'utf8');
function replace(pattern, replacement) {
  if (!pattern.test(page)) throw new Error('Missing HTML marker: ' + pattern);
  page = page.replace(pattern, () => replacement);
}
replace(/<style id="offline-theme"[\s\S]*?<\/style>/, '<style id="offline-theme" media="screen">\n' + theme + '\n</style>');
replace(/<script type="application\/json" id="offline-game">[\s\S]*?<\/script>/,
  '<script type="application/json" id="offline-game">' + json + '</script>');
fs.writeFileSync(indexFile, page);

// A shareable edition starts with the embedded resources and needs no network access.
replace(/<script src="cards\/[^"]+\.js"><\/script>\s*/g, '');
replace(/<link rel="stylesheet" href="assets\/courtroom\.css"[^>]*>/, '');
replace(/<link rel="stylesheet" href="https:\/\/fonts\.googleapis\.com[^>]*>/, '');
replace(/let gavelImage='assets\/gavel\.webp';/, 'let gavelImage=bundled.gavelImage;');
fs.writeFileSync(local('Plead-the-Filth.html'), page);
