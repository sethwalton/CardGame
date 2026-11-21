# Instructions for AI agents

Read `handoff.md` first. It holds the project goals, the owner's decisions, how the code is laid
out, what has been verified, and the open questions.

**Keep `handoff.md` current.** The owner asked for every change to the project to be recorded in
it. In the same commit as any change, update the sections it affects and add a row to the work log.

- Cards live in `cards/*.js`, one file per deck. The owner edits these by hand; keep their format
  and header comments intact.
- After changing `src/plead-the-filth.html` or any deck file, run `node tools/build.mjs`, then
  `node tools/smoke-test.js "$PWD/index.html" <screenshot folder>`.
