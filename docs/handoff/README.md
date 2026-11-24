# Handoff guide — read this first (for ChatGPT or any assistant)

This folder lets an assistant pick up the project exactly where the last one
stopped. Read the files in this order:

1. **This file** — project map, rules, how to run and deploy.
2. [`WORK_LOG.md`](WORK_LOG.md) — every step done so far, in order, with the
   files touched and how each step was tested.
3. [`NEXT_STEPS.md`](NEXT_STEPS.md) — what is unfinished or worth doing next.

When you finish a step, **append it to `WORK_LOG.md`** (same format) and
update `NEXT_STEPS.md`, so the next assistant can continue.

---

## 1. What the project is

*The Lost Elephant Archive · Hồ sơ voi thất lạc* — a Vietnamese watercolor
visual novel for phones held sideways. A researcher from planet **SPARK**
(year 2060) visits Tây Nguyên, Vietnam, rebuilds a six-branch elephant
archive, and returns home for the Epilogue.

- Repository: `https://github.com/mapleleaf3637-design/tdstkndemo4.github.io`
- Live site: `https://mapleleaf3637-design.github.io/tdstkndemo4.github.io/`
  (a GitHub Pages **project subdirectory** — never use root-relative `/…` paths)
- Static site: HTML + CSS + vanilla ES modules. **No build step, no framework.**

## 2. Routes

| Hash | What plays |
| --- | --- |
| `#/` or `#/prologue` | Prologue on SPARK (9 scenes). **Opening it resets all progress.** |
| `#/chapter-1` | Forest: three elephant behaviours with documentary photos |
| `#/chapter-2` | Storehouse: find two objects (bành + đệm) |
| `#/chapter-3` | Festival hub: rope throw, 12-question quiz, souvenir shop |
| `#/epilogue` | Epilogue E0–E7 (gated until 6/6 branches) |
| `#/epilogue-preview` | Epilogue preview with a sample 6/6 state |

## 3. File map

| File | Role |
| --- | --- |
| `index.html` | Single page. Toolbar buttons: `#fullscreen`, `#sound`, `#field-book`, `#skip`. Rotate screen `#rotate` has `#rotate-fullscreen`. |
| `js/main.js` | Router, typewriter dialogue (`text()`), left/right tap navigation, modal, sound, Epilogue/field wiring. |
| `js/storage.js` | **All progress saving.** `sessionStorage` only; `resetProgress()`; deletes old `localStorage` saves on load. |
| `js/fullscreen.js` | Phone full-screen toggle + "Add to Home Screen" help fallback. |
| `js/actor.js` | **Shared character layer.** Shows every character big, centred and cut off by the dialogue box; slides it left (or right) when another visual is on screen. Edit `COMPANIONS` there to change which visuals push the character aside. CSS: `.actor` / `#actors` in `css/game.css`; `#stage[data-actor="left"]` rules at the end of `css/field.css` and `css/epilogue.css`. |
| `manifest.webmanifest` | Home-screen app: `display: fullscreen`, landscape, icons in `assets/shared/icon-*.png`. |
| `js/scenes.js`, `js/visuals.js`, `js/assets.js`, `css/game.css` | Prologue. |
| `js/field/story.js` | Chapter 1–3 dialogue, booth intros, quiz, shop orders, rank table (`ranks`). |
| `js/field/game.js` | Chapter logic, modes, timers, `act()` handles every button (`data-do`). |
| `js/field/games.js`, `js/field/ui.js` | Render mini-games and notebook. |
| `js/field/state.js` | Chapter state shape (`freshState`), load/save via `storage.js`. |
| `js/field/media.js` | Photo/illustration filenames and credits. |
| `js/epilogue/story.js` | Epilogue text (E0–E7), comparisons, three final messages. |
| `js/epilogue/player.js` | Epilogue step list, modes, Back/Skip, transmission animation. |
| `js/epilogue/view.js` | Epilogue HTML for each mode. |
| `css/field.css`, `css/epilogue.css` | Chapter and Epilogue styles. |
| `assets/field/CREDITS.txt`, `assets/epilogue/CREDITS.md` | Image/sound sources and licences. Keep them updated. |

## 4. Rules that must not be broken

- Planet name is **SPARK** everywhere (never `ABC` or `KEP-207`; the
  "ABC" letters in `js/field/games.js` are shop answer letters, not the planet).
- No living elephant ever appears on SPARK — only holograms, records, photos.
- Right half tap = next (first tap finishes the typing), left half = previous.
  Interactive cards must stop the tap from also advancing dialogue
  (`event.stopPropagation()` / `e.target.closest("button")` checks).
- Skip never chooses an answer for the player.
- All dialogue and button text is HTML (Vietnamese), never baked into images.
- Only use real photos with a known author, place and licence; label photos
  taken outside Vietnam as such. Do not generate fake "documentary" photos.
- **Progress must not survive closing the browser** (user requirement,
  2026-11-24). Never write progress to `localStorage`; use `js/storage.js`.
- Paths are relative (`./…`) so they work under the Pages subdirectory.
- Characters are drawn **only** by `js/actor.js`. Renderers keep emitting
  their `<img class="character|field-person|ep-person">`; CSS hides it and the
  actor layer shows it. Do not re-position those classes in CSS — change
  `.actor` / `data-side` instead. Keep characters big, centred when alone,
  lower body behind the dialogue box (user requirement, 2026-11-24).
- The dialogue box is plain paper colour; do not put the `ui_08` texture back
  (its curl covered the speaker name on phones).
- When you change a JS/CSS file that browsers may cache, bump the `?v=` query
  in `index.html` (currently `spark4` for `main.js` and all three CSS files).

## 5. How to run locally

Any static server from the repository root works, for example:

```powershell
npx serve .            # if Node is installed
python -m http.server  # if Python is installed
```

The author's PC has neither, so testing used a small PowerShell
`HttpListener` script. Open `http://localhost:PORT/#/epilogue-preview` etc.
Test at landscape phone sizes 844×390, 932×430, 740×360, 896×414, plus
1366×768 and 1920×1080, and in portrait (rotate screen must appear).

Testing tips:
- Progress lives in `sessionStorage` key `tdstkndemo4:field:v1` and
  `tdstkndemo4:epilogue:v1:game|preview`. To jump to a state, set the key
  **while on the Prologue page** (the field game is inactive there), then
  load `…/#/chapter-N` as a new page.
- Opening the Prologue clears these keys by design.

## 6. How to deploy

Commit to `main` and push; GitHub Pages serves the root of `main`
(Settings → Pages → "Deploy from a branch" → `main` / `(root)`, set on
2026-11-24). **Do not push to the old `gh-pages` branch** — it is stale
(`541da34`) and no longer published. Earlier, Pages was set to `gh-pages`,
so pushes to `main` silently never went live; if the live site ever lags,
compare the commit in the Actions tab's latest "pages build and deployment"
run with `git log -1 origin/main`. Wait
1–3 minutes, then open the live URL with a cache-buster (`?v=xyz`) and check
for console errors.

On the author's PC, Git comes with GitHub Desktop
(`%LOCALAPPDATA%\GitHubDesktop\app-*\resources\app\git\cmd\git.exe`). Pushing
from a script fails because it cannot ask for the GitHub login; **push with
GitHub Desktop** (File → Add local repository → this folder → Push origin).
