# Next steps / open items

Update this list whenever you finish or discover something.

## To do now

- [ ] **Push** the step-11 commit with GitHub Desktop. Then on a phone check
      the big centred characters and the slide when a photo/panel appears,
      in all three parts (Prologue, chapters, Epilogue). Watch for any panel
      that still overlaps the character; fix by adding a
      `#stage[data-actor="left"] .that-panel { left: … }` rule.
- [ ] After the deploy, also check (step 10 features):
      - Toolbar shows the ⛶ button; on Android Chrome it hides the address
        bar and turns the screen sideways.
      - On iPhone Safari the button shows the "Add to Home Screen" help;
        after adding, the home-screen icon opens with no browser bars.
      - Finish the storehouse, go back to Chapter 2, enter the storehouse
        again → the search restarts.
      - Close the browser completely, reopen the site → Prologue, 0/6,
        booths without ✓.

## Known limits (by design / platform)

- iPhone Safari does not let any web page hide its bars; the home-screen
  shortcut is the only way there.
- Some phones restore closed tabs together with their `sessionStorage`.
  That is why opening the Prologue (the start of the game) also wipes
  progress. A restored tab sitting on `#/chapter-2` would still resume —
  acceptable, since the player did not "start again".
- In the Claude test browser, `requestFullscreen` never resolves; the
  1.5 s timeout in `js/fullscreen.js` handles that.

## Ideas (not requested yet)

- Optional "Skip whole Epilogue" confirmation menu (brief §6) is not built;
  Skip goes checkpoint to checkpoint.
- The E4 personalized reflection is skipped when the player presses Skip
  after the choice; it could be shown on the E6 screen as well.
