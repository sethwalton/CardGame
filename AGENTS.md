# Plead the Filth

## Game overview

Plead the Filth is an adult courtroom party card game for **3–6 players ages 18 and older**. Players assemble absurd arrest reports from four decks, hear the cases read aloud, and vote on which one is funniest. The humor comes from the combination of cards and the deadpan reading. The owner does not give a defense speech.

A **case** is an ordered set of four cards. Each card has a **Years** value. A case's **sentence** is the sum of its four values. Only cases tied for the most votes earn their sentence, which the owner adds to their running score. A **conviction** marks a case that receives the most votes in a round. A **rap sheet** records a player's convictions and the Crime card associated with each one. The player with the most years at the end wins. Players tied for first share the win.

## Cards and reading order

The current game ships with 120 cards, 30 in each of four independently shuffled decks. Cards show their Years values during play and on printed card fronts. Drawing, keeping, or swapping a card does not award points.

| Order | Deck | What it contributes | How to write new entries |
| --- | --- | --- | --- |
| 1 | Crime | What the player was arrested for | Start with an “-ing” action that can be followed by a location. |
| 2 | Place | Where or when the action took place | Use a phrase starting with “at,” “in,” “on,” or similar. |
| 3 | Evidence | What was found on the player | Use a noun phrase that fits after “in possession of.” |
| 4 | Twist | A detail that makes the case worse | Write a complete sentence that can follow a colon. |

Read every case in this form.

> You were arrested for **[Crime] [Place]**. You were found in possession of **[Evidence]**. And to make matters worse: **[Twist]**

Crime, Place, and Evidence entries should omit a final period where the game supplies one. A Twist supplies its own punctuation. Keep each line usable with unrelated cards from the other three decks. Test combinations aloud in the sample-case tool before adding them to the set.

## Setup and game length

**Browser.** Open `Plead-the-Filth.html` directly for offline play. The group shares one screen or passes one device. In **Play**, enter player names in clockwise seating order, choose a game length, and click **Call the court to order**. The first listed player starts the first round. The starting seat moves one place clockwise each new round.

**Printed cards.** Separate the four decks, shuffle each one, and put them face down in reading order with room for separate discard piles. Pick a starting player. Agree on the number of rounds and keep a running years total and a written rap sheet for each player. Rotate the starting seat clockwise after each round.

| Players | Standard rounds | Long rounds |
| --- | ---: | ---: |
| 3 | 6 | 8 |
| 4 | 5 | 7 |
| 5 | 4 | 5 |
| 6 | 3 | 4 |

- **Standard and Long** deal three cases per turn. An optional swap offers three replacements from the selected deck.
- **Speed Trial** lasts one round. Deal two cases per turn. An optional swap draws one blind replacement, which the player keeps.
- **Custom browser settings** allow 1–12 rounds, 2–4 cases per turn, and no swap, a blind swap, or a choice of two or three replacements.

## How a round works

1. **Pass the device.** Only the active player sees the cases they are building. In the browser, confirm the handoff, then tap the decks to turn over cards or select **Deal the rest**. With printed cards, deal each case as a face-down row with one card from each deck.
2. **Keep one case.** Choose the funniest complete row. Discard all other rows into the corresponding deck piles. Cards cannot move between rows.
3. **Swap one card if you want.** Choose one slot in the retained case. Discard its original card and draw replacements from that slot’s deck. Keep one replacement and discard the rest. A blind replacement is mandatory once drawn. With swapping enabled, the player can also keep the original case by skipping the swap.
4. **Lock the case and hand off.** Keep the chosen row private. Repeat until every player has one case.
5. **Read the charges.** Reveal cases in the same order as the building turns. The person to the case owner’s left reads it aloud. Hear every case before voting.
6. **Vote.** Everyone casts one vote for the funniest case. A player cannot vote for their own case. The browser passes a private ballot to each player in turn and reveals the total after the last vote. With printed cards, have everyone point at the same time on a count of three and repeat any missing or self-directed vote.
7. **Record years and convictions.** Find the cases tied for the most votes. For each of those cases, add the final four cards' Years values to the owner's running score and record one conviction. Other cases earn zero years. Record the winning Crime card name for each conviction. Discard every card in every submitted case, including the winning Crime cards. Move the starting seat clockwise unless the game is over.

**Example verdict.** Ada votes for Ben. Ben and Cam vote for Ada. If Ada's four cards show 4, 2, 1, and 3 years, Ada earns ten years and one conviction. Ben and Cam earn zero years. If Ada votes for Ben, Ben votes for Cam, and Cam votes for Ada, each player earns their own case's sentence and one conviction. There is no Judge role or separate tie-break ballot.

**Decks and boundaries.** When a printed deck runs out, shuffle its discard pile into a new draw pile. The tabletop rulebook also lets anyone strike a card and replace it from the same deck without spending the optional swap. The browser’s **Flag for rewrite** action marks a card for editorial review. Use **Cut** in the Cards tab to exclude it from future games and print exports.

## Project files and handoff

| File | Purpose |
| --- | --- |
| `index.html` | Main editable entry point. Contains game logic, screen rendering, rulebook, card editor, and print/export code. Also carries fallback copies of the decks and theme. |
| `cards/crime.js`, `cards/place.js`, `cards/evidence.js`, `cards/twist.js` | Editable source for the four scenario decks. |
| `assets/courtroom.css`, `assets/gavel.webp` | Screen theme and hero artwork. |
| `build-offline.mjs` | Bundles the current decks, style, and artwork and regenerates the standalone HTML. |
| `Plead-the-Filth.html` | Generated, self-contained website for offline play and download. |
| `README.md` | Short run, hosting, and content-editing instructions. |

Use a static host with `index.html`, `cards/`, and `assets/` in the same relative locations, or distribute `Plead-the-Filth.html` by itself. The game runs entirely in the browser without a game server. Use `node build-offline.mjs` from the project root after editing the game, cards, or assets. Make changes in the source files and regenerate the bundled copy.

### Deck data and saved state

- Each deck script registers a block with `PleadTheFilth.deck(deckKey, text)`. A card line is `ID | Name | Text | y3`, with a Years value from `y1` through `y5` and an optional trailing `| x2` or other copy count. Older lines without a value use default years by deck (Crime 3, Place 1, Evidence 2, Twist 2). Browser play draws by card ID. Copy counts are expanded by the print exporter.
- Preserve unique IDs across edits. Existing IDs use `C`, `P`, `E`, and `T` prefixes. A leading `#` or `//` comments out a line. Keep pipes and backticks out of card text. Escape literal backslashes and avoid template interpolation sequences in the JavaScript deck blocks.
- Editable deck files take precedence over the bundled data. The **Cards** tab can review, edit, approve, flag, or cut cards and import/export review data. Its browser-local overrides are stored by card ID under `ptf-review`. Export permanent deck changes via **Export / import** and update the deck files before rebuilding.
- Setup preferences use `ptf-setup`. The experimental active game uses `ptf-years-game` with schema version `4`. Prior builds keep their games under `ptf-game2`. The saved state is local to the browser. Keep stable IDs and account for older saves if changing the state shape.
- In `index.html`, `chargeHTML` assembles the case, `beginTurn` and `keepCase` handle the deal and selection, `castVote` and `tally` enforce ballot rules and record years and convictions, and `buildPrint` creates the printable fronts and backs.

### Print export

Under **Cards → Print sheets**, choose **Desktop Supplies 55521** for six cards per US Letter sheet, or **Plain Letter cardstock** for nine cards per sheet. The export includes only approved cards and uses their current text. The 55521 layout rotates the poker-size cards to fit the perforated grid and mirrors the back positions for long-edge duplex. Approving all 120 cards uses 20 double-sided 55521 sheets. Use **Print / Save as PDF** or **Download sheets** for a separate printable HTML file. Print in portrait at 100% with headers and footers off. Verify the first front and back against the perforations on your printer before printing the entire deck. The perforation spacing was estimated from the product photo.

### Verify changes before handing them off

- Open both `index.html` and the regenerated standalone file. Confirm that all four decks appear and that the console reports no parse errors.
- Play a three-player Speed Trial from setup through verdict. Confirm that private cases stay hidden until the trial and that self-votes cannot be submitted.
- Test a standard swap, a tied round, a shared game win, and rotation of the starting seat in a second round. Check that only top-voted cases earn years, that swaps affect the sentence, and that scores accumulate exactly once across rounds and after resuming a saved game. Check that the winning Crime cards are recorded on the rap sheets and returned to their discard pile.
- For print changes, verify that fronts and backs match across rows and that the 55521 layout exports 40 US Letter pages when all 120 cards are approved. Inspect a rendered first and last card row and confirm that no card is clipped.
