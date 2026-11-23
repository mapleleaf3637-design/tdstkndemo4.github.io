# The Lost Elephant Archive · Hồ sơ voi thất lạc

A Vietnamese watercolor visual novel following a researcher from SPARK to Tây Nguyên. Serve the repository root as a static site. All paths work under the GitHub Pages project subdirectory. There is no build step.

## Playing

Open the root or `#/prologue`. Tap right to reveal or advance and left to revisit the previous line. Skip or finish the Prologue to enter `#/chapter-1` at the forest. The notebook records six discoveries. The main game remembers the current scene, equipment, booth results and remaining active time on this browser. The chapter routes resume the corresponding checkpoint. Direct links to later chapters respect earned progress.

| Chapter | Activity |
| --- | --- |
| 1 | Observe three behaviors and meet Đăm Săn. Open documentary photographs for the location, author, source and licence. |
| 2 | Find Dur and Vơng in the storehouse, then compare the two objects. |
| 3 | Visit the three booths in any order. Throw five rings in 60 seconds, answer 12 illustrated questions in 30 seconds, or serve three souvenir customers with 120 seconds of selection time each. |

The rope game scores 0, 1, 3, 5, 10 or 20 at impact and unlocks Social History at any score. Tap to aim, tap again or press the throw button to release. Drag/release and keyboard aiming are also supported. The trivia game requires more than 20% of all twelve questions, including when time expires. The shop pauses its clock during explanations and records unfulfilled orders separately. Notebook and background interruptions pause active timers.

## Project files

- `js/scenes.js`, `js/visuals.js`, `js/assets.js` and `css/game.css` hold the original Prologue.
- `js/main.js` routes the Prologue and chapters and shares navigation, Vietnamese type, sound and the modal with the main game.
- `js/field/story.js` contains chapter dialogue, booth introductions, questions and customer orders. `js/field/game.js` controls scenes, interactions and timers. `games.js` renders each game and `ui.js` renders common controls and the notebook.
- `js/field/state.js` stores checkpoints and the configured Epilogue destination. The final book passes earned branches and the corresponding stage completions to the existing demo3 Epilogue on the same GitHub Pages origin. Browsers that disallow local storage can use its playable preview at completion.
- `js/field/media.js` maps the updated ZIP filenames to WebP copies and photo metadata. Shared forest artwork is reused. `assets/field/CREDITS.txt` preserves source credits, including the Yok Đôn illustration in P3-03. The web images are resized and compressed; customers, booth markers and storage props are isolated from the original sheets.
- The revised Q1 uses the province boundary before 1 July 2025. Q10 refers to the 2025 festival. Q12 places each supplied illustration beside its corresponding answer.
- `docs/screenshots/` contains in-game captures of the storehouse, all three festival booths, the hub and the completed notebook.

## Cultural references

The historical game uses cardboard targets and a board-game token. Photographs of Asian elephants outside Vietnam are labeled with their original locations.

- [Hội voi Buôn Đôn năm 2025 — Bộ Văn hóa, Thể thao và Du lịch](https://bvhttdl.gov.vn/dak-lak-hoi-voi-buon-don-de-lai-an-tuong-sau-sac-voi-nhieu-du-khach-2025031314203164.htm)
- [Trải nghiệm quan sát voi — Vườn quốc gia Yok Đôn](https://tour.yokdonnationalpark.vn/)
- [Nguồn ảnh và giấy phép](assets/field/CREDITS.txt)
