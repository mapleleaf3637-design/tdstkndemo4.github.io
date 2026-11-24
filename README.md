# The Lost Elephant Archive · Hồ sơ voi thất lạc

A Vietnamese watercolor visual novel following a researcher from SPARK to Tây Nguyên. Serve the repository root as a static site. All paths work under the GitHub Pages project subdirectory. There is no build step.

## Playing

Open the root or `#/prologue`. Dialogue types automatically. Tap right while the text is appearing to reveal the whole line. Once it is complete, tap right to advance. Tap left to return to a fully visible previous line. Reduced-motion mode shows the complete line immediately. Booth introductions have a separate return-to-festival button. Skip or finish the Prologue to enter `#/chapter-1` at the forest. The notebook records six discoveries. Progress (current scene, equipment, booth results, remaining active time, Epilogue checkpoint) is kept only for the current browser tab (`sessionStorage`, see `js/storage.js`). Reloading a chapter resumes it; closing the browser or opening the Prologue again starts a clean playthrough with no history. The storehouse search in Chapter 2 always restarts when entered. Direct links to later chapters respect progress earned in the current session.

On phones, the ⛶ button in the toolbar (and on the rotate-device screen) hides the browser bars with the Fullscreen API and locks landscape where supported. iPhone Safari cannot do this, so the button explains "Add to Home Screen"; `manifest.webmanifest` then opens the game full screen.

**Handing the project to another assistant:** read [`docs/handoff/README.md`](docs/handoff/README.md) first.

| Chapter | Activity |
| --- | --- |
| 1 | Observe three behaviors through documentary photographs and meet Đăm Săn. Open documentary photographs for the location, author, source and licence. |
| 2 | Find Dur and Vơng in the storehouse, then compare the two objects. |
| 3 | Visit the three booths in any order. Throw five rings in 60 seconds, answer 12 illustrated questions in 30 seconds, or serve three souvenir customers with 120 seconds of selection time each. |

The rope game scores 0, 1, 3, 5, 10 or 20 at impact and unlocks Social History at any score. Tap to aim, tap again or press the throw button to release. Drag/release and keyboard aiming are also supported. The trivia game requires more than 20% of all twelve questions, including when time expires. The shop pauses its clock during explanations and records unfulfilled orders separately. Notebook and background interruptions pause active timers.

## Project files

- `js/scenes.js`, `js/visuals.js`, `js/assets.js` and `css/game.css` hold the original Prologue.
- `js/main.js` routes the Prologue and chapters and shares navigation, Vietnamese type, sound and the modal with the main game.
- `js/field/story.js` contains chapter dialogue, booth introductions, questions and customer orders. `js/field/game.js` controls scenes, interactions and timers. `games.js` renders each game and `ui.js` renders common controls and the notebook.
- `js/field/state.js` stores chapter checkpoints. Completing the six branches unlocks the local Epilogue.
- `js/epilogue/` contains the SPARK scene data, artwork mapping and interactions. The routes `#/epilogue` and `#/epilogue-preview` keep independent checkpoints. Preview and replay preserve the main notebook. The illustrated transmission takes place locally. Both required comparisons have unlimited retries, and the third pair is optional.
- `js/field/media.js` maps the updated ZIP filenames to WebP copies and photo metadata. Shared forest artwork is reused. `assets/field/CREDITS.txt` preserves source credits, including the Yok Đôn illustration in P3-03. The web images are resized and compressed; customers, booth markers and storage props are isolated from the original sheets.
- The revised Q1 uses the province boundary before 1 July 2025. Q10 refers to the 2025 festival. Q12 places each supplied illustration beside its corresponding answer.
- `docs/screenshots/` contains in-game captures of the storehouse, all three festival booths, the hub, the completed notebook and the three interactive or closing Epilogue screens.

## Cultural references

The historical game uses cardboard targets and a board-game token. The Chapter 1 galleries document domestic Asian elephants in Đắk Lắk. Each photograph shows its source, location and licence. The foraging photograph by Hirako San is licensed CC BY-NC-SA 4.0 for noncommercial reuse.

- [Các danh hiệu lịch sử theo nghệ nhân Y Khu Êban — Báo Đại biểu Nhân dân](https://daibieunhandan.vn/noi-dai-ky-uc-10211187.html)
- [Hội voi Buôn Đôn năm 2025 — Bộ Văn hóa, Thể thao và Du lịch](https://bvhttdl.gov.vn/dak-lak-hoi-voi-buon-don-de-lai-an-tuong-sau-sac-voi-nhieu-du-khach-2025031314203164.htm)
- [Trải nghiệm quan sát voi — Vườn quốc gia Yok Đôn](https://tour.yokdonnationalpark.vn/)
- [Nguồn ảnh và giấy phép](assets/field/CREDITS.txt)
