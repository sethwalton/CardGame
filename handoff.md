# Handoff: Plead the Filth

This file brings a new agent or collaborator up to speed on the project: what it is for, what the
owner decided, what has been built, what has and has not been verified, and what comes next.

## 1. Project goal

Design a complete **physical** party card game that can be printed and played in real life. Before
any printing, the owner wants a **digital prototype playable in a browser by three people**, so the
rules and every card can be tried, edited and approved first.

The owner's concept, in their words: players draw one card from each of four decks, which together
describe a ridiculous scenario they have been arrested for. They then explain themselves as if in
front of a judge. Once everyone has had a turn, players vote for the funniest and best explanation.

### Owner's brief

| Item | Requirement |
| --- | --- |
| Players | 3 to 6 |
| Play time | 4 to 60 minutes |
| Age | 18+ |
| Tone | Party, fun, humor |
| Inspiration | Superfight, Joking Hazard |
| Hard limit | No more than 20 cards per deck |
| Other components | Allowed where needed, for example to settle tied votes |

### Decisions the owner made when asked

1. **Play setup:** one shared screen. Everyone sits around one device, pleas are spoken aloud, and
   the device is passed for votes. Separate-device online play was not chosen.
2. **Humor level:** raunchy and dark, in Joking Hazard territory. Explicit sex jokes, drugs, bodily
   functions and dark humor are on the cards themselves.
3. **Deck structure:** Crime, Place, Evidence, Twist.

### Requests the owner made after the first version

1. **Push to GitHub.** Done; see section 11.
2. **A handoff file for other AI agents.** This file. Keep it current whenever the project changes.
3. **Tap-to-deal hearings.** "A deck above the scene that the user has to tap, and each card turns
   over to the row below it, so the user feels like they are painting the scene." Done; see
   section 4, "How a hearing is dealt".
4. **Cards in separate, human-editable files.** "Decouple the values behind each of the card decks
   into individual files that I can edit to add more scenarios", so the cards are not held in
   `index.html`. Done; see section 4, "The deck files".
5. **Keep this handoff updated with every change from now on.** Standing instruction. `CLAUDE.md`
   in the repository repeats it for future agents.

### Deliverables the owner asked for

Core pitch and win condition, full rules, complete card list as a table, balance check, example
round with three players, edge-case FAQ, card layout for a 2.5 × 3.5 inch card, and a playtest plan.
All eight exist and live in the Rulebook tab of the prototype (see section 4).

## 2. The game as designed

**Working title:** Plead the Filth. It has **not** been checked for trademark conflicts.

**Components (87 cards plus a phone timer):**

- 80 scenario cards: 20 each of Crime, Place, Evidence, Twist
- 1 Gavel card, which marks the Judge
- 6 Plea Bargain cards, one per player

**A round:** one hearing per player, then one vote.

1. The player on the Judge's left pleads first. Play passes left, so the Judge pleads last.
2. In each hearing the **Prosecutor** (the player on the Defendant's left) turns over one card from
   each deck and reads them as one sentence: "You were arrested for *[Crime]* *[Place]*. You were
   found in possession of *[Evidence]*. And to make matters worse: *[Twist]*."
3. The Defendant may use their **Plea Bargain** once per game to swap one card for a new one from the
   same deck. They must keep the replacement.
4. The Defendant gets a **60-second plea**. Every card is true. They may explain it but not deny it.
5. The Prosecutor asks **one follow-up question** (cross-examination).
6. After all hearings, everyone votes for the funniest plea. No self-votes.
7. The winner is acquitted and keeps their **Crime card as a 1-point trophy**. All other cards are
   discarded. The winner takes the Gavel.

**Vote ties:** the Judge's vote decides among the tied players. If the Judge voted for someone
outside the tie, the Judge picks again from the tied players. The Judge can never rule for
themself, so a tied Judge always loses. Because the Gavel passes to each winner, this is a mild
handicap on whoever is ahead.

**End of game:** fixed number of rounds, most trophies wins. Standard rounds by player count are
3 players: 6, 4 players: 5, 5 players: 4, 6 players: 3. Long games are 8, 7, 5 and 4 rounds.
A speed trial is 1 round with 30-second pleas and no cross-examination.

**Final ties:** a Supreme Court showdown between the tied leaders. Fresh charge sheets, 30-second
pleas, no Plea Bargains, no cross-examination. With two finalists only the other players vote. With
three or more, everyone votes for a finalist other than themself.

**Table rule:** any player can ask for any card to be struck, no explanation needed. Discard and
redraw. It does not cost a Plea Bargain.

The authoritative rules text is the Rulebook tab in `src/plead-the-filth.html`. If this summary and
the rulebook ever disagree, the rulebook wins.

## 3. Card content rules

These were applied when writing all 80 scenario cards. Keep to them when adding or rewording cards.

- **Any card can combine with any other.** There are 160,000 possible charge sheets, so a card must
  be acceptable next to every card in the other three decks.
- **No children anywhere.** No card names or implies minors, because Crime cards include sex acts.
- **No real people and no brand names.** Places and props are generic (for example "a moving
  rideshare", "a 24-hour supermarket").
- **No slurs and no sexual violence played as a joke.**
- **Grammar must chain.** Crime is a gerund phrase ("offering handjobs in exchange for chicken
  nuggets"). Place is a prepositional phrase ("at a nursing home bingo night"). Evidence is a noun
  phrase ("a heavily sedated swan"). Twist is a full sentence in the second person ("You were
  stone-cold sober.").
- **Keep card text under about 90 characters** so it can be read aloud at a glance.
  `node tools/build.mjs` warns about longer scenario cards.
- **Deck size.** The owner's limit for the printed game is 20 cards per deck. The deck files may
  hold more while testing; the Cards tab and the build script say how many to cut.

## 4. What has been built

Everything is in one HTML page with three tabs.

| Tab | What it does |
| --- | --- |
| **Play** | Full game for 3 to 6 players on one screen. Setup screen with player names, length presets, rounds, plea timer, first Judge, and toggles for cross-examination and Plea Bargains. Hearings dealt by hand (see below), Plea Bargain swap, countdown timer with pause, cross-examination prompt. Sequential ballots, automatic tie handling, Gavel passing, Supreme Court showdown. End screen with playtest numbers: total time, average plea length, tied rounds, Plea Bargains used, per-round history. |
| **Cards** | All 87 cards drawn in their print layout. Open a card to edit its name and text, set a status (Unreviewed, Approved, Needs work, Cut) and add a note. Cut cards are left out of play. Filters by deck and status, a table view with per-card stats (drawn, acquitted, swapped out), a combo tester that deals random charge sheets, JSON export and import, and 9-up print sheets with backs (standalone copy only). |
| **Rulebook** | The eight deliverables. The card table in section 3 is generated from live card data, so it reflects edits. |

During play, each revealed card has a **Flag for rewrite** button that sets its status to Needs work.

### How a hearing is dealt

The owner asked for dealing to feel like **painting the scene**, so each hearing is built by hand:

1. Four face-down deck piles (Crime, Place, Evidence, Twist) sit in a row at the top, each marked
   "Tap to draw" with a red outline.
2. Below them, under a "The scene" divider, are four empty dashed slots in reading order.
3. Tapping a deck flips its top card over and animates it down into its slot. The deck then dims and
   shows how many cards are left. Decks can be tapped **in any order**.
4. The charge sentence under the scene starts as blanks (`[Crime]`, `[Place]` ...) and each part
   fills in as its card lands.
5. Once all four are dealt, the Defendant can start the plea or use a Plea Bargain. A Plea Bargain
   empties the chosen slot and relights that one deck, which is tapped to draw the replacement.
6. When the plea starts, the decks are hidden and only the scene, sentence and timer remain.

### The deck files

All card wording lives in `cards/`, one file per deck, so the owner can add and edit scenarios in
any text editor. Nothing about the cards is stored in `index.html` or `src/` any more.

| File | Holds |
| --- | --- |
| `cards/crime.js` | Crime deck, IDs C01 upward |
| `cards/place.js` | Place deck, IDs P01 upward |
| `cards/evidence.js` | Evidence deck, IDs E01 upward |
| `cards/twist.js` | Twist deck, IDs T01 upward |
| `cards/special.js` | The Gavel (G01) and the Plea Bargain (B01, printed six times) |

Each file starts with a comment explaining how to edit it, then calls
``PleadTheFilth.deck("<deck>", `...`)`` with one card per line:

```
C05 | Solicitation | offering handjobs in exchange for chicken nuggets
Streaking | streaking through a funeral wearing only the casket flag
```

- `ID | Card name | Card text`. The ID may be left off; the card then gets the next free number for
  its deck (C21, C22 ...) in file order. The build script prints the number it will get so it can
  be written in.
- An optional last column `| x6` sets the number of printed copies. Only the Plea Bargain uses it.
- Lines starting with `#` or `//`, and blank lines, are ignored. `#` is how a card is taken out
  without deleting it.
- Cards may not contain `|` or a backtick. A backtick breaks the whole file.
- IDs are how review statuses, edits and stats are stored, so an existing card's ID must not change.

The files are JavaScript only so that `index.html` can load them with `<script>` tags when opened
straight from disk, where browsers do not allow a page to read other files. The owner never needs
to rebuild after editing a deck: saving the file and reloading the page is enough.

**Getting Cards-tab edits back into the files.** Edits made in the browser are stored as overrides
(see "Review state" in section 5), not in the files. The Cards tab's **Export / import** dialog
can produce the full text of any deck file with those edits written in and cut cards commented out
as `# CUT  ...`, ready to paste over the file. With no edits, that export is identical to the file
on disk; the smoke test checks this.

### Where things are

| Path | What it is |
| --- | --- |
| `cards/*.js` | The card decks (see above). The owner edits these by hand. |
| `src/plead-the-filth.html` | The game: styles, rulebook HTML and game logic. **Edit this file** to change the game. |
| `index.html` | Standalone copy generated from `src/`. **Do not edit by hand.** It loads `cards/*.js`. |
| `tools/build.mjs` | Checks the deck files, then regenerates `index.html` (see section 6). |
| `tools/smoke-test.js` | Scripted playthroughs and deck-file checks with Playwright (see section 6). |
| `README.md` | Short human-facing overview, including how to edit the decks. |
| `CLAUDE.md` | Standing instructions for AI agents: read this file first and keep it updated. |
| `handoff.md` | This file. |

### Hosted copy

A private hosted copy is published as a Claude artifact:
https://claude.ai/artifact/ToXCEVUkYzE681AXkRbpGC

Only the owner can open it unless they share it. It is published from `src/plead-the-filth.html`
with the five deck files alongside it at `cards/crime.js` and so on, and with the `db` runtime
capability so that card edits can be saved to the page. Whenever a deck file or `src/` changes,
republish both: pass the deck files in the publish call's `files` map, keyed by `cards/<name>.js`.
An agent in a new conversation that wants to update it must read it first and pass that URL when
publishing, otherwise a separate artifact is created.

## 5. How the code is organized

`src/plead-the-filth.html` is written as a page **body**: it has no doctype, `<html>`, `<head>` or
`<body>` tags, because the artifact host adds them. `tools/build.mjs` wraps it for standalone use.
It is plain JavaScript with no libraries and no build step other than that wrapper.

- **Loading cards.** Before the main script, an inline script defines
  `window.PleadTheFilth = { decks: {}, deck(k, text) }`, then five `<script src="cards/....js">`
  tags call `deck()`. At boot, `start()` awaits `loadDecks()`. If any deck is missing (a host that
  blocks those scripts) and the page is not on `file:`, it fetches the missing files as text and
  pulls out the `PleadTheFilth.deck(...)` blocks with a regular expression. `parseDecks()` then turns
  the text into `BASE`, an array of `{ id, deck, name, text, qty? }`, plus `BASE_BY_ID`, and collects
  problems (bad lines, duplicate IDs). If a scenario deck, the Gavel or the Plea Bargain is missing,
  `showLoadError()` replaces the page with a list of what went wrong. Otherwise problems are shown
  at the top of the Cards tab.
- **Two parsers.** `parseDecks()` in the page and the parser in `tools/build.mjs` implement the same
  rules. Change both together. The header comments are also duplicated: `deckFileText()` in the page
  rebuilds them for the export, so editing a file's header means editing `DECK_HEAD` (or the special
  header) in the page too, or the smoke test's export check fails.
- **Removed cards.** If a saved game or saved review refers to an ID that is no longer in the files,
  `card(id)` returns a "Removed card" placeholder instead of crashing.
- **Review state** is `review = { cards: { [id]: { name?, text?, status?, note? } }, stats: { [id]:
  { drawn, won, swapped } }, updatedAt }`. It holds only differences from the base card data.
  `card(id)` merges base and overrides.
- **Game state** is the single object `g`. Key fields: `names`, `n`, `rounds`, `plea`, `cross`,
  `round`, `judge`, `order`, `turn`, `sheets`, `votes`, `voters`, `scores`, `bargains`, `decks`,
  `discards`, `history`, `pleaLog`, `phase` (`hearing`, `vote`, `tie`, `reveal`, `final`), `step`
  within a hearing (`charges`, `ready`, `swap`, `plea`, `after`), `showdown`, `champion`.
- **A charge sheet** is `g.sheets[player] = { cards: [4 card ids], up: [4 booleans], swapped }`.
  All four cards are drawn from the decks when the hearing starts; `up[i]` turns true when the
  player taps deck `i` and that card is dealt into the scene. `step` stays `charges` until every
  `up` is true, then becomes `ready`. A Plea Bargain replaces `cards[i]`, sets `up[i]` back to
  false and returns `step` to `charges`. Games saved before this change used a `flipped` count;
  `viewHearing` converts it to `up` on load.
- **Game flow functions:** `startGame`, `startRound`, `startHearing`, `endPlea`, `nextHearing`,
  `castVote`, `tally`, `resolve`, `nextRound`, `startShowdown`. Tie logic is in `tally`.
- **Rendering:** each view is a function returning an HTML string (`viewSetup`, `viewHearing`,
  `viewVote`, `viewTie`, `viewReveal`, `viewFinal`), set by `renderPlay`. Card faces and backs come
  from `cardFace` and `cardBack`. Events use delegation on `data-action` attributes, handled in
  `act` (game) and `actCards` (Cards tab). A deck pile carries `data-action="flip"` and
  `data-i` (0 Crime, 1 Place, 2 Evidence, 3 Twist).
- **The deal animation** is `animateDraw(i)`, called by `renderPlay` after it redraws the hearing.
  The new card is rendered in its slot inside a `.flipper` holding its face and a temporary back.
  The Web Animations API moves it from the deck's position and size to the slot while rotating it
  from back to face (640 ms), then removes the temporary back. With reduced motion, or without
  `Element.animate`, the card simply appears.
- **Storage:** `localStorage` keys `ptf-review`, `ptf-setup` and `ptf-game` (a game in progress can
  be resumed). When the page runs as an artifact, review state is also written to the page database
  at document `review/cards`; the newer of the two copies wins on load. In the standalone copy
  `window.claude` does not exist and only `localStorage` is used.
- **Printing** is offered only in the standalone copy, because the artifact viewer blocks the print
  dialog.
- **Live counts.** The rulebook's card-list summary and the "possible charge sheets" figure in the
  balance check are computed from the deck files. Other numbers in the rulebook prose (for example
  "four decks of 20") describe the printed design and are written by hand.

### Gotchas

- Card sizes use container-query units (`cqw`) so cards scale to any width. These units resolve
  against an **ancestor** container, so the frame styles are on the inner `.card__in`, not on
  `.card` itself. Putting `cqw` borders on `.card` makes them viewport-sized.
- In the artifact viewer, `alert`, `confirm`, `prompt`, `window.print` and file downloads do
  nothing. Confirmations are built into the page (see the two-step End game button).
- Cards keep their own paper and ink colors in dark theme on purpose. They are physical objects.
- The deal animation measures positions after a full re-render. If the hearing view's markup
  changes, keep the `id="deck-<deck>"` piles and `id="slot-<i>"` slots or `animateDraw` falls back
  to no animation.

## 6. Build and test

```
node tools/build.mjs                                   # check the decks, regenerate index.html
node tools/smoke-test.js "$PWD/index.html" /tmp/shots   # scripted playthroughs + screenshots
```

`tools/build.mjs` runs each deck file in a sandbox the same way the browser does, so a stray
backtick is caught. It prints the count per deck, warns about decks over 20 cards, scenario cards
over 90 characters and cards with no ID, and stops without rebuilding on errors such as duplicate
IDs or malformed lines.

The smoke test needs Playwright with Chromium. It plays 14 full games at 3 to 6 players, tapping the
decks in a random order and voting at random. It exercises the Plea Bargain redraw, the Cards
editor, the table view and the rulebook table, checks for horizontal overflow at phone width, and
reports any page errors. It also saves screenshots, including the hearing before dealing
(`deal-start.png`), a card mid-flight (`deal-mid.png`), two cards dealt (`deal-two.png`) and a
half-dealt hearing on a phone in dark theme (`phone-dealing.png`).

It also checks the deck files: the Cards-tab export of each deck matches the file on disk; a copy
of the game with one card commented out and two added without IDs shows the new cards as C21 and
C22 and the Crime deck as 21 of 20; a copy with a stray backtick shows the load-error page; and,
served over HTTP with the deck scripts blocked, the page still loads every card by fetching the
files (the path a locked-down host would take).

## 7. Verified and not verified

**Verified**

- 14 scripted games at 3 to 6 players, across speed, standard and long presets, all ran to a winner
  with no script errors. This covers mechanics only.
- Layout checked at desktop width in light theme and phone width (390 px) in dark theme, with no
  horizontal overflow on any tab, including a half-dealt hearing.
- Tap-to-deal: decks drawn in random order across all 14 games, and Plea Bargain redraws, all
  reached the plea correctly.
- Deck counts: 20 per scenario deck, 87 cards in total.
- Deck files: loading from disk, adding cards with and without IDs, commenting cards out, the
  error page for a broken file, the export round trip, and the fetch fallback, all as described
  in section 6. The hosted copy's file list was confirmed to contain all five deck files.

**Not verified**

- **Whether the game is fun.** No humans have played it. This is the point of the prototype.
- **Saving card edits to the hosted page.** The page database was empty when checked, which is
  expected before any edit, but a real save and reload has not been observed.
- **Printed output.** The print sheets have not been test-printed. Front and back alignment for
  double-sided printing is untested.
- **The title.** No trademark search has been done.
- **The hosted copy loading its deck files.** The files are published beside the page, but the
  page has not been watched loading there. Whether the viewer runs them as scripts or the page
  falls back to fetching them is unknown; either path works in testing.
- **How the deal animation feels.** It has only been checked from still screenshots taken mid-move,
  not watched in motion or tried on a touch screen.

## 8. Known gaps

- The **strike rule** is in the rulebook but has no button in the app. A struck card currently has
  to be handled with a Plea Bargain or by ending the hearing.
- **Open decision: dealing order.** The app lets the four decks be drawn in any order, but the
  rulebook (section 2) still says the Prosecutor turns them over Crime, Place, Evidence, Twist. The
  owner has been asked whether to lock the app to that order or loosen the rule, and has not
  answered. Until they do, leave both as they are.
- The app uses **sequential ballots** with a pass-the-device step. The physical rule is simultaneous
  pointing. The outcomes are the same but the feel differs.
- Several tuning options in the playtest plan are **not settings in the app**: two cross-examination
  questions, a final round worth 2 points, passing the Gavel left instead of to the winner, two Plea
  Bargains per player, and one point per vote received. Rounds, plea timer, cross-examination on or
  off and Plea Bargains on or off are settings.
- A **player leaving mid-game** is covered in the FAQ but not supported in the app.
- Cards have **no illustrations**. The art window shows the deck icon as a placeholder.
- No online or multi-device play. This was a deliberate choice by the owner.

## 9. Suggested next steps

1. The owner plays three games with three people, following the playtest plan in the Rulebook tab,
   and marks cards as Approved, Needs work or Cut.
2. Read the owner's review state (from the hosted page's `review/cards` document, or from a JSON
   export pasted by the owner) and write the approved wording into `cards/*.js`. Cut cards can be
   commented out with `#`. Run the build, commit, and republish the hosted copy with the deck files.
3. Replace cut cards so each deck is back to 20, following the content rules in section 3. The
   owner may also add cards to the deck files directly; check them against the same rules.
4. Adjust rules from the playtest numbers. Change one number per game.
5. Settle the dealing-order decision in section 8 and make the app and rulebook agree.
6. Close whichever other gaps in section 8 the owner cares about. The strike button is the most
   likely.
7. Before print: trademark check on the title, card art, a test print of the sheets, and a decision
   on a print service and its bleed requirements (the layout spec assumes 0.125 inch bleed).

## 10. Work log

| Commit | Change |
| --- | --- |
| `a1a4ade` | First playable prototype: game, 87 cards, Cards review tab, full rulebook, build script, README. |
| `49f7be9` | Added this handoff file and the Playwright smoke test. |
| `b2a6b4b` | Owner request: hearings dealt by tapping four deck piles that flip cards down into a scene row, with an animated deal, Plea Bargain redraws from the deck, and the smoke test updated to deal in random order. |
| `bf41a52` | Handoff updated for tap-to-deal; work log added. |
| `7e191ca` | Owner request: all card wording moved out of the page into `cards/crime.js`, `place.js`, `evidence.js`, `twist.js` and `special.js`. IDs optional for new cards, `#` to comment cards out, deck-file export in the Cards tab, live counts and over-20 warnings, load-error page, build script now checks the decks, smoke test covers the deck files, README rewritten for editing cards, `CLAUDE.md` added. |

The hosted artifact was republished with the deck files after `7e191ca` (version 3), so it matches
the repository.

## 11. Repository state

- Repository: `sethwalton/CardGame`
- Branch: `ccr-48a8fd81-4ui757`. The repository was empty before this work, so this is the only
  branch and there is no `main`. The owner has been told and has not yet asked for one.
- No pull requests are open. Do not open one unless the owner asks.
