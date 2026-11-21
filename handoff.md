# Handoff: Plead the Filth

This file brings a new agent or collaborator up to speed on the project: what it is for, what the
owner decided, what has been built, what has and has not been verified, and what comes next.

## 1. Project goal

Design a complete **physical** party card game that can be printed and played in real life. Before
any printing, the owner wants a **digital prototype playable in a browser by three people**, so the
rules and every card can be tried, edited and approved first.

The owner's original concept: players draw one card from each of four decks, which together
describe a ridiculous scenario they have been arrested for, then explain themselves as if in front
of a judge, and everyone votes for the funniest explanation.

The owner has since **changed the core rules** (see request 6 below). The game is now about
*building* the most ridiculous case, not explaining it: each turn a player draws three cases, keeps
one, may swap one card, and holds it secretly; then every case is revealed and the players vote.
There is no spoken defence any more.

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

1. **Play setup:** one shared screen. Everyone sits around one device and the device is passed for
   private turns and votes. Separate-device online play was not chosen.
2. **Humor level:** raunchy and dark, in Joking Hazard territory. Explicit sex jokes, drugs, bodily
   functions and dark humor are on the cards themselves.
3. **Deck structure:** Crime, Place, Evidence, Twist.
4. **Details of the three-case rules** (asked when the owner requested them):
   - A player **keeps one case whole**, exactly as dealt. No mixing cards between cases.
   - The end-of-turn swap is **"pick of 3"**: discard one card, look at the top three of that
     deck, keep one.
   - Phase two is **reveal and vote only**, with no speeches.
   - The **Plea Bargain cards are removed**, because the swap replaces them.

### Requests the owner made after the first version

1. **Push to GitHub.** Done; see section 11.
2. **A handoff file for other AI agents.** This file. Keep it current whenever the project changes.
3. **Tap-to-deal.** "A deck above the scene that the user has to tap, and each card turns over to
   the row below it, so the user feels like they are painting the scene." Done, and kept in the new
   rules; see section 4, "How a turn works".
4. **Cards in separate, human-editable files.** "Decouple the values behind each of the card decks
   into individual files that I can edit to add more scenarios", so the cards are not held in
   `index.html`. Done; see section 4, "The deck files".
5. **Keep this handoff updated with every change from now on.** Standing instruction. `CLAUDE.md`
   in the repository repeats it for future agents.
6. **New core rules.** In the owner's words: "When a player draws a card from each deck, we will
   refer to that as a case. Every turn a player takes consists of drawing three cases. At the end of
   the player's turn, they are allowed to replace a card from any case from any of the playing
   decks. The goal is for the player to create the most ridiculous case and hold this in their hand
   until all players have taken their turns. The game then enters a phase two where everyone shows
   their case and people act as a prosecutor who is going to pick the most humorous and ridiculous
   one presented by the players. One with the most votes wins that round." Done, with the details in
   decision 4 above. See section 2.

### Deliverables the owner asked for

Core pitch and win condition, full rules, complete card list as a table, balance check, example
round with three players, edge-case FAQ, card layout for a 2.5 × 3.5 inch card, and a playtest plan.
All eight exist and live in the Rulebook tab of the prototype (see section 4). All eight were
rewritten for the three-case rules.

## 2. The game as designed

**Working title:** Plead the Filth. It has **not** been checked for trademark conflicts.

**Components (81 cards):**

- 80 scenario cards: 20 each of Crime, Place, Evidence, Twist
- 1 Gavel card, which marks the Judge

**A case** is one card from each deck, read as one sentence: "You were arrested for *[Crime]*
*[Place]*. You were found in possession of *[Evidence]*. And to make matters worse: *[Twist]*."

**A round** has two phases.

*Phase one, building cases.* The player on the Judge's left goes first; play passes left, so the
Judge goes last. Cards stay hidden from other players throughout. On a turn:

1. **Deal three cases:** three rows of four cards face down, one card from each deck per row.
2. **Keep one case** exactly as dealt. No moving cards between rows. The other rows are discarded.
3. **Swap one card (optional):** discard it, look at the top three cards of the same deck, keep
   one, discard the other two.
4. **Lock it in:** hold the case face down until the trial.

*Phase two, the trial.* Starting left of the Judge, each player lays their case face up and the
player on their left reads it out like a prosecutor. The owner offers no defence. Then everyone
points at the most ridiculous case other than their own. The most votes is **Guilty**: that player
wins the round and keeps the Crime card on their **rap sheet** (1 point). Everything else is
discarded. The winner takes the Gavel.

**Vote ties:** the Judge's vote decides among the tied players. If the Judge voted for someone
outside the tie, the Judge picks again from the tied players. The Judge can never rule for
themself, so a tied Judge always loses. Because the Gavel passes to each winner, this is a mild
handicap on whoever is ahead.

**End of game:** fixed number of rounds, most convictions wins. Standard rounds by player count
are 3 players: 6, 4 players: 5, 5 players: 4, 6 players: 3. Long games are 8, 7, 5 and 4 rounds.
A speed trial is 1 round with two cases per turn and a blind swap (about 5 minutes).

**Final ties:** a Supreme Court showdown. Each tied leader takes one more normal turn, then their
cases go on trial. With two finalists only the other players vote. With three or more, everyone
votes for a finalist other than themself.

**Table rule:** any player can ask for any card to be struck, no explanation needed. Discard it
and replace it from the same deck. It does not count as the player's swap.

**Naming.** Because players now vote *for* the most outrageous case, the winner is "convicted"
("Guilty" stamp) rather than "acquitted", scores are "convictions" and trophies form a "rap sheet".
This was Claude's wording choice, not the owner's; change it if the owner prefers otherwise.

The authoritative rules text is the Rulebook tab in `src/plead-the-filth.html`. If this summary and
the rulebook ever disagree, the rulebook wins.

## 3. Card content rules

These were applied when writing all 80 scenario cards. Keep to them when adding or rewording cards.

- **Any card can combine with any other.** There are 160,000 possible cases, so a card must be
  acceptable next to every card in the other three decks.
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
- **The cards carry all the humour now.** With no spoken defence, a card that only works with a
  good explanation behind it is a weak card.
- **Deck size.** The owner's limit for the printed game is 20 cards per deck. The deck files may
  hold more while testing; the Cards tab and the build script say how many to cut.

## 4. What has been built

Everything is in one HTML page with three tabs.

| Tab | What it does |
| --- | --- |
| **Play** | Full game for 3 to 6 players on one screen. Setup screen with player names, length presets (speed, standard, long), rounds, cases per turn (2, 3 or 4), swap mode (look at 3, look at 2, blind, none) and first Judge. Private turns with a pass-the-device screen, tap-to-deal into three cases, keep one, swap. Trial with each case revealed and read out, sequential secret ballots, automatic tie handling, Gavel passing, Supreme Court showdown. End screen with playtest numbers: total time, average turn length, tied rounds, turns with a swap, per-round history. |
| **Cards** | All 81 cards drawn in their print layout. Open a card to edit its name and text, set a status (Unreviewed, Approved, Needs work, Cut) and add a note. Cut cards are left out of play. Filters by deck and status, a table view with per-card stats (drawn, kept, convicted, swapped out), a combo tester that deals random cases, deck-file and JSON export and import, and 9-up print sheets with backs (standalone copy only). |
| **Rulebook** | The eight deliverables, rewritten for the three-case rules. The card table in section 3 is generated from live card data, so it reflects edits. |

During the trial, each revealed card has a **Flag for rewrite** button that sets its status to
Needs work.

### How a turn works

1. **Pass screen.** "Pass the device to X. Everyone else, look away." X taps "I am X. Start my turn".
   The three cases are drawn from the decks at this point.
2. **Deal.** Four face-down deck piles sit at the top, each showing how many cards it still has to
   deal. Below them are three case panels, each with four empty slots and a charge sentence full of
   blanks. Tapping a deck flips a card and animates it down into the **first case still missing a
   card from that deck**, and that part of the sentence fills in. "Deal the rest" finishes at once.
   Decks can be tapped in any order.
3. **Choose.** Each case gets a "Keep case N" button. The other cases go to the discard piles.
4. **Swap.** The kept case is shown with "Swap the Crime / Place / Evidence / Twist" and "Keep it as
   it is". Swapping discards that card. With pick-of-3, the top three cards of that deck are shown
   with "Keep this one" buttons and the other two are discarded. With a blind swap the new card is
   placed straight in.
5. **Locked in.** "Hide my case and pass to Y", or after the last player "Hide my case and go to
   trial".
6. **Trial.** One case at a time: four face-down cards, "Reveal X's case", a staggered flip, the full
   sentence, and a note naming the reader (the owner's left neighbour). Earlier cases are listed
   below. After the last case, "Go to the vote".

### The deck files

All card wording lives in `cards/`, one file per deck, so the owner can add and edit scenarios in
any text editor. Nothing about the cards is stored in `index.html` or `src/`.

| File | Holds |
| --- | --- |
| `cards/crime.js` | Crime deck, IDs C01 upward |
| `cards/place.js` | Place deck, IDs P01 upward |
| `cards/evidence.js` | Evidence deck, IDs E01 upward |
| `cards/twist.js` | Twist deck, IDs T01 upward |
| `cards/special.js` | The Gavel (G01) |

Each file starts with a comment explaining how to edit it, then calls
``PleadTheFilth.deck("<deck>", `...`)`` with one card per line:

```
C05 | Solicitation | offering handjobs in exchange for chicken nuggets
Streaking | streaking through a funeral wearing only the casket flag
```

- `ID | Card name | Card text`. The ID may be left off; the card then gets the next free number for
  its deck (C21, C22 ...) in file order. The build script prints the number it will get so it can
  be written in.
- An optional last column like `| x2` sets the number of printed copies. No card uses it now that
  the Plea Bargain (which was printed six times) is gone.
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
  problems (bad lines, duplicate IDs). If a scenario deck or the Gavel is missing, `showLoadError()`
  replaces the page with a list of what went wrong. Otherwise problems are shown at the top of the
  Cards tab.
- **Two parsers.** `parseDecks()` in the page and the parser in `tools/build.mjs` implement the same
  rules. Change both together. The header comments are also duplicated: `deckFileText()` in the page
  rebuilds them for the export, so editing a file's header means editing `DECK_HEAD` (or the special
  header) in the page too, or the smoke test's export check fails.
- **Removed cards.** If a saved game or saved review refers to an ID that is no longer in the files,
  `card(id)` returns a "Removed card" placeholder instead of crashing.
- **Review state** is `review = { cards: { [id]: { name?, text?, status?, note? } }, stats: { [id]:
  { drawn, kept, won, swapped } }, updatedAt }`. It holds only differences from the base card data.
  `card(id)` merges base and overrides. `kept` counts cards in the case a player chose to keep; `won`
  counts cards on convicted cases.
- **Settings** are `setup = { names, preset, rounds, cases, swap, firstJudge }`. `swap` is the number
  of cards looked at when swapping: 3 or 2 (pick one), 1 (blind), 0 (no swap). Presets only set
  `rounds`, `cases` and `swap`.
- **Game state** is the single object `g`, with `v: 2` to mark the three-case rules. Key fields:
  `names`, `n`, `rounds`, `casesPer`, `swapPick`, `round`, `judge`, `order` (turn order, starting left
  of the Judge), `turn`, `phase`, `step`, `cur`, `hands`, `trialPos`, `shown`, `votes`, `voters`,
  `scores` (each player's rap sheet, as Crime card IDs), `decks`, `discards`, `history`, `turnLog`
  (seconds per turn), `swaps`, `showdown`, `champion`.
- **Phases:** `turn` → `trial` → `vote` → (`tie`) → `reveal` (round result) → next round, or `final`.
  Within `turn`, `step` is `pass` → `deal` → `choose` → `swap` → (`pick`) → `done`.
- **The turn in progress** is `g.cur = { cases: [[4 ids] × casesPer], up: [[4 booleans] × casesPer],
  kept, swapAt, options, startedAt }`. All cases are drawn when the turn begins; `up[c][i]` turns true
  as each card is dealt. After `keepCase(c)`, `cur.cases` holds only the kept case. During `pick`,
  the swapped slot is `null` and `cur.options` holds the cards to choose from. `endTurn()` copies the
  case into `g.hands[player]` and clears `cur`.
- **Card bookkeeping.** Every playable card is always in exactly one place: a deck, a discard pile,
  a hand, `g.cur`, or a rap sheet. `resolve()` discards every case except the winner's Crime as soon
  as the vote is decided; the hands are still shown on the verdict screen but are already in the
  discard piles, and `nextRound()` clears them. `window.PTF.cardAudit()` checks the rule, and the
  smoke test calls it after every action.
- **Game flow functions:** `startGame`, `startRound`, `beginTurn`, `dealOne`, `keepCase`, `swapCard`,
  `pickOption`, `endTurn`, `nextCase`, `castVote`, `tally`, `resolve`, `nextRound`, `startShowdown`.
  Tie logic is in `tally`. `draw()` reshuffles a deck's discard pile when it runs out.
- **Rendering:** each view is a function returning an HTML string (`viewSetup`, `viewTurn`,
  `viewTrial`, `viewVote`, `viewTie`, `viewReveal`, `viewFinal`), chosen by `renderPlay`. `caseFile()`
  draws one case panel. Card faces and backs come from `cardFace` and `cardBack`. Events use
  delegation on `data-action` attributes, handled in `act` (game) and `actCards` (Cards tab). A deck
  pile carries `data-action="deal"` and `data-i` (0 Crime, 1 Place, 2 Evidence, 3 Twist).
- **The deal animation** is `animateDraw(c, i)`, called by `renderPlay` after it redraws the turn.
  The new card is rendered in slot `slot-<case>-<deck index>` inside a `.flipper` holding its face
  and a temporary back. The Web Animations API moves it from the deck's position and size to the
  slot while rotating it from back to face (640 ms), then removes the temporary back. The trial
  reveal uses a CSS animation (`.flipper.is-turning`) staggered 180 ms per card. With reduced motion,
  or without `Element.animate`, cards simply appear.
- **Storage:** `localStorage` keys `ptf-review`, `ptf-setup` and `ptf-game2` (a game in progress can
  be resumed). Games saved under the old rules (`ptf-game`, or any `g` without `v: 2`) are ignored.
  When the page runs as an artifact, review state is also written to the page database at document
  `review/cards`; the newer of the two copies wins on load. In the standalone copy `window.claude`
  does not exist and only `localStorage` is used.
- **Printing** is offered only in the standalone copy, because the artifact viewer blocks the print
  dialog.
- **Live counts.** The rulebook's card-list summary and the "possible cases" figure in the balance
  check are computed from the deck files. Other numbers in the rulebook prose (for example "four
  decks of 20") describe the printed design and are written by hand.

### Gotchas

- Card sizes use container-query units (`cqw`) so cards scale to any width. These units resolve
  against an **ancestor** container, so the frame styles are on the inner `.card__in`, not on
  `.card` itself. Putting `cqw` borders on `.card` makes them viewport-sized.
- In the artifact viewer, `alert`, `confirm`, `prompt`, `window.print` and file downloads do
  nothing. Confirmations are built into the page (see the two-step End game button).
- Cards keep their own paper and ink colors in dark theme on purpose. They are physical objects.
- The deal animation measures positions after a full re-render. If the turn view's markup changes,
  keep the `id="deck-<deck>"` piles and `id="slot-<case>-<i>"` slots or `animateDraw` falls back to
  no animation.
- Case panels always show four cards in a row, even on a phone (`.casefile .sheet` overrides the
  two-column phone layout). The card text is tiny there; the sentence under each case is what
  players read.
- `viewTrial` sets `g.shown` from `'fresh'` to `true` while rendering, so the reveal animation plays
  once. This is the one place a view changes state.

## 6. Build and test

```
node tools/build.mjs                                   # check the decks, regenerate index.html
node tools/smoke-test.js "$PWD/index.html" /tmp/shots   # scripted playthroughs + screenshots
```

`tools/build.mjs` runs each deck file in a sandbox the same way the browser does, so a stray
backtick is caught. It prints the count per deck, warns about decks over 20 cards, scenario cards
over 90 characters and cards with no ID, and stops without rebuilding on errors such as duplicate
IDs or malformed lines.

The smoke test needs Playwright with Chromium. It plays 14 full games at 3 to 6 players across the
speed, standard and long presets. Each turn it deals in a random order (sometimes finishing with
"Deal the rest"), keeps a random case, swaps about 60% of the time, and votes at random. After
every action it runs `PTF.cardAudit()` and fails if any card is lost or duplicated. It prints how
many games went to a Supreme Court showdown. It also exercises the Cards editor, the table view and
the rulebook table, checks for horizontal overflow at phone width, and reports any page errors.
Screenshots include the pass screen (`turn-pass.png`), a card mid-flight (`deal-mid.png`), a
part-dealt turn (`deal-some.png`), choosing (`choose.png`), the swap and pick steps (`swap.png`,
`pick.png`), a revealed case at trial (`trial.png`), a ballot, the verdict, and a turn on a phone in
dark theme (`phone-dealing.png`, `phone.png`).

It also checks the deck files: the Cards-tab export of each deck matches the file on disk; a copy
of the game with one card commented out and two added without IDs shows the new cards as C21 and
C22 and the Crime deck as 21 of 20; a copy with a stray backtick shows the load-error page; and,
served over HTTP with the deck scripts blocked, the page still loads every card by fetching the
files (the path a locked-down host would take).

## 7. Verified and not verified

**Verified**

- 14 scripted games at 3 to 6 players under the three-case rules, across speed, standard and long
  presets, all ran to a winner with no script errors and no lost or duplicated cards. Six of them
  went to a Supreme Court showdown. This covers mechanics only.
- Layout checked at desktop width in light theme and phone width (390 px) in dark theme, with no
  horizontal overflow on any tab, including a turn in progress.
- Deck counts: 20 per scenario deck and 1 Gavel, 81 cards in total.
- Deck files: loading from disk, adding cards with and without IDs, commenting cards out, the
  error page for a broken file, the export round trip, and the fetch fallback, all as described
  in section 6.
- A bug found while testing the new rules is fixed: going into a showdown used to put the last
  round's cases into the discard piles a second time, duplicating cards.

**Not verified**

- **Whether the game is fun.** No humans have played it, under either set of rules. This is the
  point of the prototype. The three-case rules put all the humour on the cards, so card quality is
  now the main thing to test.
- **Saving card edits to the hosted page.** A real save and reload has not been observed.
- **Printed output.** The print sheets have not been test-printed. Front and back alignment for
  double-sided printing is untested.
- **The title.** No trademark search has been done.
- **The hosted copy loading its deck files.** The files are published beside the page, but the
  page has not been watched loading there. Either loading path works in testing.
- **How the animations feel.** Checked only from still screenshots, not watched in motion or tried
  on a touch screen.
- **The time estimates** for the new rules (rulebook table, setup screen) are guesses based on
  assumed turn lengths, not measured.

## 8. Known gaps

- The **strike rule** is in the rulebook but has no button in the app.
- The app uses **sequential ballots** with a pass-the-device step. The physical rule is simultaneous
  pointing. The outcomes are the same but the feel differs.
- **Downtime.** Turns are private and one at a time, as the owner described. With five or six
  players this means a long wait between turns. The playtest plan suggests a simultaneous-building
  variant; it is not in the app.
- Several tuning options in the playtest plan are **not settings in the app**: simultaneous
  building, a 30-second spoken defence, a final round worth 2 points, passing the Gavel left instead
  of to the winner, two swaps per turn, and one point per vote received. Rounds, cases per turn and
  swap mode are settings.
- A **player leaving mid-game** is covered in the FAQ but not supported in the app.
- Cards have **no illustrations**. The art window shows the deck icon as a placeholder.
- No online or multi-device play. This was a deliberate choice by the owner.
- The earlier open question about **dealing order** (any order in the app, fixed order in the
  rules) no longer applies: under the three-case rules a player deals their own cases privately and
  the order does not matter.

## 9. Suggested next steps

1. The owner plays three games with three people, following the playtest plan in the Rulebook tab,
   and marks cards as Approved, Needs work or Cut. Watch average turn time and downtime first.
2. Read the owner's review state (from the hosted page's `review/cards` document, or from a JSON
   export pasted by the owner) and write the approved wording into `cards/*.js`. Cut cards can be
   commented out with `#`. Run the build, commit, and republish the hosted copy with the deck files.
3. Use the Kept column in the Cards tab's table view: cards drawn often but rarely kept are the
   weakest. Replace cut and weak cards so each deck is back to 20, following section 3.
4. Adjust rules from the playtest numbers. Change one number per game.
5. Close whichever gaps in section 8 the owner cares about. The strike button and the simultaneous
   variant are the most likely.
6. Before print: trademark check on the title, card art, a test print of the sheets, and a decision
   on a print service and its bleed requirements (the layout spec assumes 0.125 inch bleed).

## 10. Work log

| Commit | Change |
| --- | --- |
| `a1a4ade` | First playable prototype: game, 87 cards, Cards review tab, full rulebook, build script, README. |
| `49f7be9` | Added this handoff file and the Playwright smoke test. |
| `b2a6b4b` | Owner request: hearings dealt by tapping four deck piles that flip cards down into a scene row, with an animated deal, Plea Bargain redraws from the deck, and the smoke test updated to deal in random order. |
| `bf41a52` | Handoff updated for tap-to-deal; work log added. |
| `7e191ca` | Owner request: all card wording moved out of the page into `cards/crime.js`, `place.js`, `evidence.js`, `twist.js` and `special.js`. IDs optional for new cards, `#` to comment cards out, deck-file export in the Cards tab, live counts and over-20 warnings, load-error page, build script now checks the decks, smoke test covers the deck files, README rewritten for editing cards, `CLAUDE.md` added. |
| `6900b76` | Handoff work-log table fixed. |
| "Switch to three-case turns and a reveal-and-vote trial" | Owner request: new core rules. Each turn deals three cases privately; the player keeps one whole and may swap one card (pick of 3); then every case is revealed, read out and voted on with no defence. Plea timer, cross-examination and the six Plea Bargain cards removed (81 cards). New settings for cases per turn and swap mode. Winner is "convicted" and builds a rap sheet. Rulebook sections 1, 2, 4, 5, 6 and 8 rewritten. Card stats gain "kept". Smoke test rewritten for the new flow, with a card audit after every action; fixed a double discard before a showdown. |

Rows without a hash are named by their commit subject; find them with `git log`. The hosted artifact
was republished after the three-case change (version 4), so it matches the repository.

## 11. Repository state

- Repository: `sethwalton/CardGame`
- Branch: `ccr-48a8fd81-4ui757`. The repository was empty before this work, so this is the only
  branch and there is no `main`. The owner has been told and has not yet asked for one.
- No pull requests are open. Do not open one unless the owner asks.
