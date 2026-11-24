// Game progress is kept for the current browser tab only (sessionStorage).
// Closing the browser/tab forgets it, and returning to the Prologue (the
// start of the game) wipes it, so every new playthrough starts clean:
// the storehouse can be searched again and the festival booths show no ✓.
//
// Only the sound on/off preference stays in localStorage.
const PREFIX = "tdstkndemo4:";
const PROGRESS = [PREFIX + "field:", PREFIX + "epilogue:"];
const isProgress = (key) => PROGRESS.some((p) => key?.startsWith(p));

function session() {
  try {
    return window.sessionStorage;
  } catch {
    return null;
  }
}

export function readProgress(key) {
  try {
    return JSON.parse(session()?.getItem(key) ?? "null");
  } catch {
    return null;
  }
}

export function writeProgress(key, value) {
  try {
    session()?.setItem(key, JSON.stringify(value));
  } catch {
    /* Play continues in memory. */
  }
}

function clearFrom(store) {
  if (!store) return;
  try {
    for (let i = store.length - 1; i >= 0; i--) {
      const key = store.key(i);
      if (isProgress(key)) store.removeItem(key);
    }
  } catch {}
}

// Forget every chapter and Epilogue checkpoint.
export function resetProgress() {
  clearFrom(session());
}

// Earlier versions saved progress in localStorage, which survived closing the
// browser. Remove those old records once on load.
try {
  clearFrom(window.localStorage);
} catch {}
