# Plead the Filth

A courtroom party card game for 3 to 6 adults (18+). A case is four cards read as one sentence:
a Crime, a Place, a piece of Evidence and a Twist. On your turn you secretly deal yourself three
cases, keep the most ridiculous one, and may swap one card. Then every case goes on trial, the
players vote for the most outrageous, and its owner is convicted and wins the round. Most
convictions wins.

"Plead the Filth" is a working title. Check it for trademark conflicts before printing.

## Play the prototype

Open `index.html` in a browser. Keep it next to the `cards` folder, which holds the decks. One
screen is the table. Each turn is private: pass the device, tap the decks to deal your three cases,
keep one and hide it. At the trial every case is revealed and read out, then each player taps their
vote in turn.

The page has three tabs:

- **Play** runs a full game for 3 to 6 players, including the Gavel tiebreak and the Supreme Court
  showdown. Rounds, cases per turn and the swap can be changed for playtesting. It records turn
  lengths, round lengths, swaps and ties.
- **Cards** shows every card. Reword, approve, flag or cut each one. Cut cards are left out of
  play. From `index.html` you can also print 9-up card sheets with backs.
- **Rulebook** holds the pitch, full rules, card list, balance notes, an example round, the FAQ,
  the card layout spec and the playtest plan.

## Editing the cards

Every card lives in the `cards` folder, one file per deck:

| File | Deck |
| --- | --- |
| `cards/crime.js` | Crime: what you did |
| `cards/place.js` | Place: where it happened |
| `cards/evidence.js` | Evidence: what was found on you |
| `cards/twist.js` | Twist: what makes it worse |
| `cards/special.js` | The Gavel |

Open one in any text editor. Each card is one line:

```
C05 | Solicitation | offering handjobs in exchange for chicken nuggets
```

- **Add a card:** add a line. You can leave the ID off (`Card name | Card text`) and the game numbers
  it for you.
- **Take a card out:** put `#` at the start of its line.
- **Reword a card:** change its name or text. Keep the ID the same.
- Don't use `|` or `` ` `` inside a card.

Save the file and reload `index.html`. No rebuild is needed. The printed game holds 20 cards per
deck; you can keep more while testing, and the Cards tab shows how many each deck is over.

Edits made in the browser's Cards tab are stored in the browser, not in these files. To make them
permanent, use **Export / import** in the Cards tab, pick a deck file, and paste the text over that
file.

To check the deck files for mistakes, run `node tools/build.mjs`.

## Files

| Path | What it is |
| --- | --- |
| `cards/*.js` | The card decks. Edit these to change cards. |
| `src/plead-the-filth.html` | The game: styles, rulebook and game logic. Edit this to change how the game works. |
| `index.html` | Standalone copy built from `src/`. Do not edit by hand. |
| `tools/build.mjs` | Checks the deck files and rebuilds `index.html`. Run it after editing `src/`. |
| `tools/smoke-test.js` | Scripted playthroughs and deck-file checks (needs Playwright). |
| `handoff.md` | Full project handoff for other people and AI agents. |

## Components

- 80 scenario cards: 20 each of Crime, Place, Evidence and Twist
- 1 Gavel card
