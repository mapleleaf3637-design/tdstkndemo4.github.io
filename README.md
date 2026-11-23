# The Lost Elephant Archive · Hồ sơ voi thất lạc

A Vietnamese watercolor visual novel about a researcher on SPARK in 2060 and a transmission from Tây Nguyên, Việt Nam. Open the site root or `#/prologue`.

The right half reveals or advances the current line. The left half goes back one line, including across scenes. Arrow keys also navigate. Select the mission button to enter the portal. Sound starts muted. Skip and the normal ending both reach Chapter 1 with six incomplete knowledge branches.

## Project files

- `js/scenes.js` holds the Vietnamese script and scene sequence P0–P8.
- `js/main.js`, `js/visuals.js` and `js/audio.js` handle input, scene composition and sound.
- `js/assets.js` maps checklist IDs and original filenames to web assets. Background PNGs and the corrected PR-CH03 PNG are included alongside their WebP versions.
- `js/config.js` sets typewriter speed and `NEXT_CHAPTER_URL`. The default opens the local Chapter 1 handoff. Replace it with the first playable Chapter 1 URL when available.
- `assets/photos/` contains web copies of the team's photographs at the Vietnam Museum of Ethnology. Open either display card in P4 for a larger view.

Serve the repository root with any static HTTP server. All runtime paths are relative to the project. The plain HTML, CSS and ES modules require no build command.
