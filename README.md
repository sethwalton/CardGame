# Plead the Filth

A courtroom party card game for 3 to 6 adults (18+). Each round every player is dealt a four-card
charge sheet (Crime, Place, Evidence, Twist) and has 60 seconds to explain it to the court. The
table votes for the funniest plea. Most acquittals wins.

"Plead the Filth" is a working title. Check it for trademark conflicts before printing.

## Play the prototype

Open `index.html` in a browser. One screen is the table: the Prosecutor taps to turn the cards and
reads them out, the Defendant pleads out loud, and each player taps their vote in turn.

The page has three tabs:

- **Play** runs a full game for 3 to 6 players, including the Gavel tiebreak, Plea Bargains and the
  Supreme Court showdown. It records plea lengths, round lengths and ties.
- **Cards** shows all 87 cards. Reword, approve, flag or cut each one. Cut cards are left out of
  play. From `index.html` you can also print 9-up card sheets with backs.
- **Rulebook** holds the pitch, full rules, card list, balance notes, an example round, the FAQ,
  the card layout spec and the playtest plan.

## Files

| Path | What it is |
| --- | --- |
| `src/plead-the-filth.html` | The game: styles, rulebook, card data and game logic in one file. Edit this. |
| `index.html` | Standalone copy built from `src/`. Do not edit by hand. |
| `tools/build.mjs` | Rebuilds `index.html` and checks no deck is over 20 cards. |

The card list lives in the `<script id="card-data">` block of `src/plead-the-filth.html`.
After changing it, run:

```
node tools/build.mjs
```

## Components

- 80 scenario cards: 20 each of Crime, Place, Evidence and Twist
- 1 Gavel card
- 6 Plea Bargain cards
- A 60-second timer (any phone)
