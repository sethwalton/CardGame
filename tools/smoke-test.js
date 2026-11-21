// Scripted playthroughs of the standalone build. Needs Playwright with Chromium.
// Usage: node tools/smoke-test.js <absolute path to index.html> <existing folder for screenshots>
const { chromium } = require('playwright');
const [file, out] = process.argv.slice(2);

async function playGame(page, { players, preset, shots }) {
  await page.goto('file://' + file + '#play');
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  for (let i = 3; i < players; i++) await page.click('#btn-add');
  await page.click('#preset-' + preset);
  if (shots) await page.screenshot({ path: out + '/setup.png', fullPage: true });
  await page.click('#btn-start');
  if (shots) {
    await page.screenshot({ path: out + '/deal-start.png', fullPage: true });
    await page.click('#deck-evidence');
    await page.waitForTimeout(260);
    await page.screenshot({ path: out + '/deal-mid.png', fullPage: true });
    await page.waitForTimeout(700);
    await page.click('#deck-crime');
    await page.waitForTimeout(800);
    await page.screenshot({ path: out + '/deal-two.png', fullPage: true });
  }
  let guard = 0, swapped = false, shotHearing = false, shotReveal = false;
  for (;;) {
    if (++guard > 3000) throw new Error('game did not finish');
    const has = (s) => page.locator(s).count();
    if (await has('#btn-rematch')) break;
    if (await has('.deck.is-live')) { // draw in a random order
      const live = page.locator('.deck.is-live');
      await live.nth(Math.floor(Math.random() * (await live.count()))).click(); continue;
    }
    if (await has('#btn-bargain') && !swapped) { swapped = true; await page.click('#btn-bargain'); await page.click('#btn-swap-evidence'); continue; }
    if (await has('#btn-plea')) {
      if (shots && !shotHearing) { shotHearing = true; await page.screenshot({ path: out + '/hearing.png', fullPage: true }); }
      await page.click('#btn-plea'); continue;
    }
    if (await has('#btn-rest')) { await page.click('#btn-rest'); continue; }
    if (await has('#btn-next')) { await page.click('#btn-next'); continue; }
    if (await has('#btn-ballot')) { await page.click('#btn-ballot'); continue; }
    const votes = page.locator('[data-action="vote"],[data-action="rule"]');
    const n = await votes.count();
    if (n) { await votes.nth(Math.floor(Math.random() * n)).click(); continue; }
    if (await has('#btn-next-round')) {
      if (shots && !shotReveal) { shotReveal = true; await page.screenshot({ path: out + '/reveal.png', fullPage: true }); }
      await page.click('#btn-next-round'); continue;
    }
    if (await has('#btn-showdown')) { await page.click('#btn-showdown'); continue; }
    throw new Error('stuck: ' + (await page.locator('#view-play').innerText()).slice(0, 300));
  }
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
  console.log('12 more games at 3-6 players finished');
  console.log('speed:', await playGame(page, { players: 3, preset: 'speed' }));

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
  for (let i = 0; i < 2; i++) await phone.locator('.deck.is-live').first().click();
  await phone.waitForTimeout(800);
  await phone.screenshot({ path: out + '/phone-dealing.png', fullPage: true });
  for (let i = 0; i < 2; i++) await phone.locator('.deck.is-live').first().click();
  await phone.waitForTimeout(800);
  await phone.screenshot({ path: out + '/phone.png', fullPage: true });
  console.log('phone overflow hearing', await phone.evaluate(() => document.documentElement.scrollWidth - window.innerWidth));

  console.log('errors:', errors.length ? errors : 'none');
  await browser.close();
})();
