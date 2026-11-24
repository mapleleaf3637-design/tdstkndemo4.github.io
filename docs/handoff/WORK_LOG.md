# Work log

Newest at the bottom. Each entry: who, date, request, what changed, files,
how it was tested, status. **Append a new entry for every step you do.**

---

## Steps 1–7 — earlier commits (before 2026-11-24, mostly ChatGPT)

Built from the commit history (`git log`):

1. `ab8b7e3` Initial commit.
2. `9d18643` Mobile SPARK Prologue with corrected researcher artwork.
3. `799fc74` Fixed detached Vietnamese tone marks in the Prologue
   (text is `normalize("NFC")`-ed and typed by grapheme).
4. `dd22945` Prologue connected to three playable Tây Nguyên chapters.
5. `9806ff6` Short Vietnamese captions for documentary photos.
6. `dfac00f` Festival dialogue navigation fix; rank milestones and photos.
7. `e8a6d91` Each dialogue line shown immediately (no interstitial prompt).

## Step 8 — ChatGPT, 2026-11-24 — commit `541da34`

Request: restore the typewriter effect; add photos of Asian elephants in
Tây Nguyên for Chapter 1; make the rank panel (Băk sai / Gru / Gru toih /
Vua Voi) compact while keeping its new text; build the full Epilogue
(E0–E7) from the "THE LAST MESSAGE" brief and the asset ZIP.

Changed:
- Typewriter restored in `js/main.js` (`text()` / `finishTyping()`).
- Chapter 1 photos `assets/field/vn_04–vn_07.webp` (Bản Đôn, Đắk Lắk,
  Yok Đôn, Hồ Lắk; CC licences) mapped in `js/field/media.js`,
  credits in `assets/field/CREDITS.txt`.
- Rank panel `.rank-sheet` in `css/field.css`, images `assets/field/rank-*.webp`.
- Epilogue: `js/epilogue/{story,player,view,assets}.js`, `css/epilogue.css`,
  assets in `assets/epilogue/…` (WebP), `assets/epilogue/CREDITS.md`.

Status: deployed and live.

## Step 9 — Claude, 2026-11-24 — commit `038aad0`

Request: continue where ChatGPT left off and finish the tasks above.

Checked on the live site at 844×390, 740×360, 1366×768 and portrait: typing,
left/right taps, Skip checkpoints, both comparisons with retry, three equal
choices, Back from E4 restores the choice, reflection line, transmission
0→100 %, ending buttons, rotate screen, no console errors. Rank panel and
Chapter 1 photos were already done.

Fixed:
- Tapping a Then & Now / final-message card replayed the panel fade, so the
  panel flashed blank. `js/epilogue/player.js` adds class `ep-steady` when the
  same interactive sheet re-renders; `css/epilogue.css` disables the
  animation for it.
- Final-message choice: selected card gets a gold/sage glow; the other two
  dim to 72 % opacity (not marked wrong). `css/epilogue.css`.
- `index.html`: `epilogue.css?v=spark2`.

Status: committed; pushed together with step 10 by the user via GitHub Desktop.

## Step 10 — Claude, 2026-11-24 — (commit after `038aad0`)

Request (user, from a phone screenshot): (a) phone full-screen option that
hides the browser bar; (b) the Chapter 2 storehouse search could not be
replayed once finished, and the Chapter 3 booths remembered past plays —
after leaving the browser and starting again, no history should remain;
(c) leave handoff instructions for ChatGPT.

Changed:
- **New `js/fullscreen.js`**: toolbar button `#fullscreen` (⛶ icon) and a
  button on the rotate screen `#rotate-fullscreen`. Uses
  `requestFullscreen({navigationUI:"hide"})`, then
  `screen.orientation.lock("landscape")` when allowed. If fullscreen is
  refused, unsupported (iPhone Safari) or never resolves within 1.5 s
  (some in-app browsers), it opens a help dialog explaining "Thêm vào MH
  chính" (Add to Home Screen). Hidden when already running as a home-screen app.
- **New `manifest.webmanifest`** + icons `assets/shared/icon-192.png`,
  `icon-512.png` (from `ui_02.png`), and apple/mobile meta tags in
  `index.html`, so the home-screen shortcut opens full screen, landscape.
- **New `js/storage.js`**: progress uses `sessionStorage` instead of
  `localStorage`; `resetProgress()` clears it; on load it deletes any old
  `localStorage` progress (`tdstkndemo4:field:*`, `tdstkndemo4:epilogue:*`).
  The sound preference stays in `localStorage`.
- `js/field/state.js`, `js/epilogue/player.js`: read/write via `storage.js`.
- `js/main.js`: opening the Prologue calls `resetProgress()` and
  `field.s = freshState()` — a new playthrough starts with no history.
  Wires `setupFullscreen()`.
- `js/field/game.js` `act("open-store")`: always `found = 0; mode = "find"`,
  so the storehouse search replays even if it was finished before.
- `css/game.css`: fullscreen button styles. `index.html`:
  `game.css?v=spark3`, `main.js?v=spark3`.
- `README.md`: progress/fullscreen notes and link to this folder.

Tested locally at 844×390 and 375×812:
- Fullscreen button visible; in the test browser fullscreen is blocked, so
  the help dialog appears (correct fallback). Real-phone fullscreen still
  needs a check on Android Chrome (see NEXT_STEPS).
- Old `localStorage` save removed on load; opening the Prologue clears
  session progress; direct `#/chapter-3` with no progress goes to Chapter 1 (0/6).
- Reloading inside Chapter 2 keeps the session progress (3/6).
- Storehouse with both objects already found reopens the search with all
  six objects.
- No console errors.

Status: committed locally in
`Materials\Epilogue\tdstkndemo4-repo`; **push with GitHub Desktop**.
