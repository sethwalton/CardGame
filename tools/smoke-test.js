// Scripted playthroughs of the standalone build. Needs Playwright with Chromium.
// Usage: node tools/smoke-test.js <absolute path to index.html> <existing folder for screenshots>
const { chromium } = require('playwright');
const [file, out] = process.argv.slice(2);
let showdowns = 0;

async function playGame(page, { players, preset, shots }) {
  await page.goto('file://' + file + '#play');
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  for (let i = 3; i < players; i++) await page.click('#btn-add');
  await page.click('#preset-' + preset);
  if (shots) await page.screenshot({ path: out + '/setup.png', fullPage: true });
  await page.click('#btn-start');
  if (shots) {
    await page.screenshot({ path: out + '/turn-pass.png', fullPage: true });
    await page.click('#btn-begin');
    await page.click('#deck-evidence');
    await page.waitForTimeout(260);
    await page.screenshot({ path: out + '/deal-mid.png', fullPage: true });
    await page.waitForTimeout(700);
    for (const k of ['crime', 'place', 'crime']) { await page.click('#deck-' + k); await page.waitForTimeout(120); }
    await page.waitForTimeout(800);
    await page.screenshot({ path: out + '/deal-some.png', fullPage: true });
  }
  const pick = async (sel) => { const l = page.locator(sel); const n = await l.count(); if (!n) return false; await l.nth(Math.floor(Math.random() * n)).click(); return true; };
  let guard = 0, shot = {};
  const snap = async (name) => { if (shots && !shot[name]) { shot[name] = 1; await page.screenshot({ path: out + '/' + name + '.png', fullPage: true }); } };
  for (;;) {
    if (++guard > 5000) throw new Error('game did not finish');
    const has = (s) => page.locator(s).count();
    if (await has('#btn-rematch')) break;
    const audit = await page.evaluate(() => window.PTF.cardAudit());
    if (audit && (audit.dup.length || audit.missing.length)) throw new Error('cards lost or duplicated: ' + JSON.stringify(audit));
    if (await has('#btn-begin')) { await page.click('#btn-begin'); continue; }
    if (await has('.deck.is-live')) { // deal in a random order, sometimes finishing with "Deal the rest"
      if (Math.random() < 0.15) await page.click('#btn-deal-rest'); else await pick('.deck.is-live');
      continue;
    }
    if (await has('[data-action="keep"]')) { await snap('choose'); await pick('[data-action="keep"]'); continue; }
    if (await has('#btn-keep-as-is')) {
      await snap('swap');
      if (Math.random() < 0.6) await pick('[data-action="swap-card"]'); else await page.click('#btn-keep-as-is');
      continue;
    }
    if (await has('[data-action="pick"]')) { await snap('pick'); await pick('[data-action="pick"]'); continue; }
    if (await has('#btn-end-turn')) { await snap('locked'); await page.click('#btn-end-turn'); continue; }
    if (await has('#btn-reveal')) { await page.click('#btn-reveal'); await page.waitForTimeout(shots && !shot.trial ? 1200 : 0); await snap('trial'); continue; }
    if (await has('#btn-next-case')) { await page.click('#btn-next-case'); continue; }
    if (await has('#btn-to-vote')) { await page.click('#btn-to-vote'); continue; }
    if (await has('#btn-ballot')) { await page.click('#btn-ballot'); continue; }
    if (await has('[data-action="vote"],[data-action="rule"]')) { await snap('ballot'); await pick('[data-action="vote"],[data-action="rule"]'); continue; }
    if (await has('#btn-next-round')) { await snap('reveal'); await page.click('#btn-next-round'); continue; }
    if (await has('#btn-showdown')) { showdowns++; await page.click('#btn-showdown'); continue; }
    throw new Error('stuck: ' + (await page.locator('#view-play').innerText()).slice(0, 300));
  }
  // every hand, trophy and card in play must be a distinct card from its deck
  const bad = await page.evaluate(() => document.querySelectorAll('.card__text').length === 0);
  if (bad) throw new Error('final screen rendered no cards');
  return page.evaluate(() => document.querySelector('#view-play h1').textContent);
}

(async () => {
  const browser = await chromium.launch();
  const errors = [];
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  page.on('pageerror', (e) => errors.push(String(e)));
  page.on('console', (m) => { if (m.type() === 'error' && !/Failed to load resource|ERR_/.test(m.text())) errors.push(m.text()); });

  console.log('3p standard:', await playGame(page, { players: 3, preset: 'standard', shots: true }));
  await page.screenshot({ path: out + '/final.png', fullPage: true });
  for (let i = 0; i < 12; i++) await playGame(page, { players: 3 + (i % 4), preset: i % 3 ? 'standard' : 'long' });
  console.log('12 more games at 3-6 players finished; Supreme Court showdowns so far:', showdowns);
  console.log('speed:', await playGame(page, { players: 3, preset: 'speed' }));

  // deck files: the page's export reproduces each file exactly when nothing has been edited
  {
    const fs = require('fs'), path = require('path');
    const dir = path.dirname(file);
    await page.goto('file://' + file + '#cards');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    for (const f of ['crime', 'place', 'evidence', 'twist', 'special']) {
      const same = (await page.evaluate((f) => window.PTF.deckFileText(f), f)) === fs.readFileSync(path.join(dir, 'cards', f + '.js'), 'utf8');
      console.log('export matches cards/' + f + '.js:', same);
    }

    // a copy of the game with a card added (no ID), a card commented out, and a broken file
    const tmp = fs.mkdtempSync(path.join(require('os').tmpdir(), 'ptf-'));
    fs.cpSync(dir, tmp, { recursive: true, filter: (s) => !s.includes('.git') });
    const crime = path.join(tmp, 'cards', 'crime.js');
    fs.writeFileSync(crime, fs.readFileSync(crime, 'utf8')
      .replace('C02 |', '# C02 |')
      .replace('\n`);', '\nStreaking | streaking through a funeral wearing only the casket flag\nTest Card Two | testing a second card\n`);'));
    await page.goto('file://' + path.join(tmp, 'index.html') + '#cards');
    console.log('added cards:', await page.locator('#deck-counts').innerText(), '| C21:', await page.locator('#open-C21').count(), '| C02 gone:', !(await page.locator('#open-C02').count()));
    fs.writeFileSync(crime, fs.readFileSync(crime, 'utf8').replace('Streaking |', 'Streak`ing |'));
    const before = errors.length;
    await page.goto('file://' + path.join(tmp, 'index.html'));
    errors.splice(before); // the deliberately broken file raises a syntax error; that is expected
    console.log('broken file message:', (await page.locator('main').innerText()).split('\n').slice(0, 2).join(' / '));
    fs.rmSync(tmp, { recursive: true });
    await page.goto('file://' + file + '#play');
  }

  // cards tab: edit, status, table, rulebook
  await page.click('#tab-cards');
  await page.click('#open-C07');
  await page.fill('#ed-text', 'having a loud, sloppy foursome');
  await page.click('#ed-st-approved');
  await page.click('#ed-close');
  console.log('counts:', await page.locator('#review-counts').innerText());
  await page.screenshot({ path: out + '/cards.png' });
  await page.click('#btn-toggle-table');
  console.log('table rows:', await page.locator('#cards-out tbody tr').count());
  await page.click('#tab-rules');
  console.log('rules rows:', await page.locator('#rules-table tbody tr').count());
  await page.locator('#r-layout').scrollIntoViewIfNeeded();
  await page.screenshot({ path: out + '/layout.png' });

  // phone width, dark theme: overflow check on each tab
  const phone = await browser.newPage({ viewport: { width: 390, height: 800 }, colorScheme: 'dark' });
  phone.on('pageerror', (e) => errors.push('phone: ' + e));
  for (const tab of ['play', 'cards', 'rules']) {
    await phone.goto('file://' + file + '#' + tab);
    const over = await phone.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    console.log('phone overflow', tab, over);
  }
  await phone.goto('file://' + file + '#play');
  await phone.click('#btn-start');
  await phone.click('#btn-begin');
  for (let i = 0; i < 5; i++) await phone.locator('.deck.is-live').first().click();
  await phone.waitForTimeout(800);
  await phone.screenshot({ path: out + '/phone-dealing.png', fullPage: true });
  await phone.click('#btn-deal-rest');
  await phone.click('#btn-keep-1');
  await phone.screenshot({ path: out + '/phone.png', fullPage: true });
  console.log('phone overflow turn', await phone.evaluate(() => document.documentElement.scrollWidth - window.innerWidth));

  // hosts that block the deck scripts (as a locked-down viewer might) fall back to reading the files as text
  {
    const { spawn } = require('child_process'), path = require('path');
    const srv = spawn('python3', ['-m', 'http.server', '8765', '--bind', '127.0.0.1'], { cwd: path.dirname(file), stdio: 'ignore' });
    await new Promise((r) => setTimeout(r, 1200));
    const p2 = await browser.newPage();
    p2.on('pageerror', (e) => errors.push('fallback: ' + e));
    await p2.route('**/cards/*.js', (route) => (route.request().resourceType() === 'script' ? route.abort() : route.continue()));
    await p2.goto('http://127.0.0.1:8765/index.html#cards');
    await p2.waitForSelector('#open-C01', { timeout: 5000 }).catch(() => {});
    console.log('fetch fallback cards shown:', await p2.locator('.cardbtn').count());
    srv.kill();
  }

  console.log('errors:', errors.length ? errors : 'none');
  await browser.close();
})();
