// ===================================================================
// PLEAD THE FILTH: SPECIAL CARDS
// The Gavel and the Plea Bargain. These are rules cards, not scenarios.
// ===================================================================
//
// HOW TO EDIT THIS FILE
// - Same format as the deck files:   ID | Card name | Card text
// - An optional last column sets how many copies are printed, written
//   as x and a number, e.g. "| x6". Without it a card is printed once.
// - Don't use the | or ` characters inside a card.
// - The game expects exactly one "gavel" card and one "bargain" card.
//   Change their wording freely, but don't add more.
//
// Save this file and reload the game to see your changes.

PleadTheFilth.deck("gavel", `
G01 | The Gavel | You are the Judge. Plead last and call the vote. Your vote breaks ties, but never in your own favour. Pass this card to whoever is acquitted.
`);

PleadTheFilth.deck("bargain", `
B01 | Plea Bargain | Once per game, before your timer starts: turn this card face down to discard one card from your charge sheet and draw a replacement from the same deck. You must keep the new card. | x6
`);
