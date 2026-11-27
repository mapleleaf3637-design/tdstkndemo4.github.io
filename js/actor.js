// Shared visual-novel character layer.
//
// The Prologue (js/visuals.js), the chapters (js/field/game.js) and the
// Epilogue (js/epilogue/view.js) still output their character <img> as before
// (classes .character / .field-person / .ep-person). CSS hides those, and this
// module shows the same sprite in one persistent layer (#actors) behind the
// scene content and the dialogue box:
//
//   • alone on screen          → big, centred, lower body under the text box
//   • with another visual      → slides to the left (smooth CSS transition)
//   • chapter-title openings   → slides to the right (the title is on the left)
//   • a sprite change          → cross-fades in place
//
// To force a side for one image, give it data-side="left|center|right".
// To make a new visual push the character aside, add its selector to
// COMPANIONS below.
const PERSON = "img.character, img.field-person, img.ep-person";
const COMPANIONS = [
  // Prologue
  ".holo",
  ".signal-status",
  ".signal-beacon",
  ".notebook",
  ".mission",
  ".portal",
  ".geo",
  ".photo-card",
  ".fragments",
  ".archive",
  // Chapters
  ".field-animal",
  ".behavior-photo",
  ".care-supplies",
  ".intro-board",
  ".rank-sheet",
  // Epilogue
  ".ep-title",
  "#epilogue > .ep-map",
  ".ep-terminal",
  ".ep-ribbons",
  ".ep-saved",
].join(",");

export function setupActors(stage, art) {
  const layer = document.createElement("div");
  layer.id = "actors";
  layer.setAttribute("aria-hidden", "true");
  art.before(layer);

  let current = null;
  let side = "center";
  let queued = 0;

  const place = (img, where) => {
    img.dataset.side = where;
  };
  const leave = (img) => {
    if (img.classList.contains("out")) return;
    img.classList.remove("in");
    img.classList.add("out");
    setTimeout(() => img.remove(), 700);
  };
  // Fade out every sprite except `keep`. Guards against fast tapping, where
  // an older sprite could finish decoding late and stay on screen.
  const clearExcept = (keep) => {
    for (const other of [...layer.children]) if (other !== keep) leave(other);
  };
  const decide = (person) => {
    if (person.dataset.side) return person.dataset.side;
    if (person.classList.contains("opening-person")) return "right";
    return art.querySelector(COMPANIONS) ? "left" : "center";
  };

  const sync = () => {
    queued = 0;
    const person = [...art.querySelectorAll(PERSON)].find((p) => !p.hidden);
    if (!person) {
      stage.dataset.actor = "none";
      clearExcept(null);
      current = null;
      return;
    }
    const src = person.getAttribute("src") ? person.src : "";
    const target = decide(person);
    stage.dataset.actor = target;
    if (current && current.dataset.src === src) {
      place(current, target);
      side = target;
      clearExcept(current);
      return;
    }
    const img = new Image();
    img.className = "actor";
    img.alt = "";
    img.draggable = false;
    img.dataset.src = src;
    // A replacement starts where the previous sprite stands, so both travel
    // together while they cross-fade. A first entrance starts at its target.
    place(img, current ? side : target);
    img.src = src;
    img.onerror = () => img.remove();
    layer.append(img);
    const old = current;
    current = img;
    side = target;
    const show = () => {
      // Only the newest sprite may appear; a superseded one stays hidden.
      if (img !== current || !img.isConnected) return;
      void img.offsetWidth; // commit the start position so the move animates
      img.classList.add("in");
      place(img, side);
      if (old?.isConnected) place(old, side);
      clearExcept(img);
    };
    if (img.decode) img.decode().then(show, show);
    else show();
  };

  // Mutation records are already batched per task, so sync right away.
  new MutationObserver(() => {
    if (queued) return;
    queued = 1;
    queueMicrotask(sync);
  }).observe(art, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["src", "hidden"],
  });
  sync();
}
