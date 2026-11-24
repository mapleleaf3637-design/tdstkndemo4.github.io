import { FieldGame } from "./field/game.js?v=spark";
import { history as beats } from "./scenes.js";
import { paint, image, warm } from "./visuals.js";
import { Soundscape } from "./audio.js?v=spark";
import {
  NEXT_CHAPTER_URL,
  EPILOGUE_URL,
  PREVIEW_URL,
} from "./config.js?v=spark";
import { currentChapter } from "./field/state.js?v=spark";
import { Epilogue } from "./epilogue/player.js";
const $ = (s) => document.querySelector(s);
const stage = $("#stage"),
  art = $("#art"),
  modal = $("#modal"),
  body = $("#modal-body");
const typeMotion = matchMedia("(prefers-reduced-motion: reduce)");
const portrait = matchMedia("(orientation:portrait) and (max-width:900px)");
const sound = new Soundscape();
let index = 0,
  previousScene = "",
  handoff = false,
  lastFocus = null;
let idle = 0,
  priorVisual = "";
function inPortrait() {
  return (
    portrait.matches && !document.body.classList.contains("allow-portrait")
  );
}
let frame = 0,
  lineText = "",
  gated = false;
function nav(first, needsAction) {
  $("#prev").disabled = first;
  gated = needsAction;
  $("#next").disabled = gated && !frame;
}
function finishTyping() {
  if (!frame) return false;
  cancelAnimationFrame(frame);
  frame = 0;
  $("#line").textContent = lineText;
  $("#next").setAttribute("aria-label", "Lời thoại tiếp");
  $("#next").disabled = gated;
  return true;
}
function text(beat, full = false) {
  finishTyping();
  lineText = beat.line.normalize("NFC");
  $("#speaker").textContent = beat.speaker;
  $("#spoken").textContent = beat.speaker + ". " + lineText;
  if (full || typeMotion.matches) {
    $("#line").textContent = lineText;
    return;
  }
  const letters = lineText.match(/\P{M}\p{M}*|\p{M}+/gu) || [];
  const start = performance.now();
  $("#line").textContent = letters[0] || "";
  $("#next").disabled = false;
  $("#next").setAttribute("aria-label", "Hiện hết câu");
  const draw = (now) => {
    const count = Math.max(1, 1 + Math.floor((now - start) / 20));
    if (count >= letters.length || typeMotion.matches) return finishTyping();
    $("#line").textContent = letters.slice(0, count).join("");
    frame = requestAnimationFrame(draw);
  };
  frame = requestAnimationFrame(draw);
}
function talking() {
  return ep.active ? ep.talking : !handoff || field.talking;
}
function background(id) {
  const box = $("#backdrop"),
    old = box.lastElementChild;
  if (old?.dataset.id === id) return;
  const im = image(id, "landscape");
  im.dataset.id = id;
  const show = () => {
    if (im.parentNode !== box) return;
    im.classList.add("visible");
    for (const earlier of [...box.children].filter((x) => x !== im)) {
      earlier.classList.remove("visible");
      setTimeout(() => earlier.remove(), 320);
    }
  };
  im.addEventListener(
    "load",
    () => {
      if (im === box.lastElementChild) show();
    },
    { once: true },
  );
  im.addEventListener("error", () => {
    if (im.hidden && im === box.lastElementChild) show();
  });
  box.append(im);
  if (im.complete && im.naturalWidth) show();
}
function render(forward = true, full = false) {
  handoff = false;
  const b = beats[index];
  const changed = previousScene !== b.scene;
  stage.dataset.scene = b.scene;
  stage.dataset.beat = b.id;
  $("#dialogue").hidden = false;
  $("#skip").hidden = false;
  $("#chapter-label").textContent = "PROLOGUE";
  $("#scene-count").textContent =
    String(b.number + 1).padStart(2, "0") + " / 09";
  nav(index === 0, Boolean(b.action));
  background(b.bg);
  const key = b.scene + "|" + (b.visual || "");
  if (key !== priorVisual)
    paint(art, b, {
      accept: () => {
        if (beats[index].action === "accept") go(index + 1);
      },
      showPhoto,
    });
  priorVisual = key;
  text(b, full);
  if (changed) sound.enter(b.scene, forward);
  previousScene = b.scene;
  clearTimeout(idle);
  idle = setTimeout(() => {
    warm(beats[index + 1]);
    warm(beats[index + 2]);
  }, 140);
  $("#tap-hint").hidden = index !== 0;
}
function go(i, back = false) {
  if (i < 0 || i >= beats.length) return;
  index = i;
  render(!back, back);
}
function next() {
  if (modal.open || inPortrait() || !talking() || finishTyping()) return;
  if (ep.active) return ep.advance();
  if (handoff) return field.advance();
  if (beats[index].action) return;
  if (index + 1 === beats.length) {
    toChapter();
    return;
  }
  go(index + 1);
}
function prev() {
  if (modal.open || inPortrait() || !talking()) return;
  if (ep.active) return ep.back();
  if (handoff) return field.back();
  if (index === 0) return;
  go(index - 1, true);
}
function toChapter() {
  location.assign(new URL(NEXT_CHAPTER_URL, document.baseURI).href);
}
function button(label, cls, fn) {
  const b = document.createElement("button");
  b.type = "button";
  b.className = cls;
  b.textContent = label;
  b.addEventListener("click", fn);
  return b;
}
function openDialog(title) {
  lastFocus = document.activeElement;
  body.replaceChildren();
  const h = document.createElement("h2");
  h.id = "modal-title";
  h.textContent = title;
  body.append(h);
  modal.showModal();
}
function closeDialog() {
  modal.close();
  if (lastFocus?.isConnected) lastFocus.focus({ preventScroll: true });
  else stage.focus({ preventScroll: true });
}
function showPhoto(data) {
  openDialog(data.title);
  modal.dataset.kind = "photo";
  const p = document.createElement("p");
  p.textContent = data.caption;
  body.append(image(data.id, "expanded-photo", data.title), p);
  $("#modal-close").focus();
}
function confirmSkip() {
  openDialog("Bỏ qua phần mở đầu?");
  modal.dataset.kind = "skip";
  const p = document.createElement("p");
  p.textContent = "Bạn sẽ đến Chương 1 với 0/6 nhánh tri thức đã phục dựng.";
  const cancel = button("Đọc tiếp", "secondary", closeDialog);
  body.append(
    p,
    cancel,
    button("Đến Chương 1", "action", () => {
      closeDialog();
      toChapter();
    }),
  );
  cancel.focus();
}
const field = new FieldGame({
  stage,
  art,
  modal,
  backdrop: $("#backdrop"),
  portrait: inPortrait,
  speak: text,
  cue: () => sound.note(),
  nav,
  count: (count) => {
    $("#scene-count").textContent = count + " / 6";
  },
  layout: (chapter, count, talking, skip) => {
    if (!talking) finishTyping();
    $("#dialogue").hidden = !talking;
    $("#skip").hidden = !skip;
    $("#skip").textContent = "Lướt thoại";
    $("#skip").setAttribute("aria-label", "Lướt đoạn thoại này");
    $("#field-book").hidden = false;
    $("#tap-hint").hidden = true;
    $("#chapter-label").textContent = "CHƯƠNG " + chapter;
    $("#scene-count").textContent = count + " / 6";
  },
  open: (title, kind, content) => {
    openDialog(title);
    modal.dataset.kind = kind;
    const page = document.createElement("div");
    page.className = "field-modal-content";
    page.innerHTML = content;
    body.append(page);
    $("#modal-close").focus();
  },
});
$("#field-book").addEventListener("click", () => field.openBook());
const ep = new Epilogue({
  stage,
  art,
  backdrop: $("#backdrop"),
  speak: text,
  nav,
  motion: typeMotion,
  layout(mode, scene, preview, count) {
    if (mode !== "dialogue") finishTyping();
    $("#dialogue").hidden = mode !== "dialogue";
    $("#tap-hint").hidden = true;
    $("#field-book").hidden = true;
    $("#skip").hidden = !["dialogue", "transmission"].includes(mode);
    $("#skip").textContent = "Lướt thoại";
    $("#skip").setAttribute("aria-label", "Lướt đến phần tương tác kế tiếp");
    $("#chapter-label").textContent = preview
      ? "EPILOGUE · CHƠI THỬ"
      : "EPILOGUE";
    $("#scene-count").textContent = count + " / 6";
    const track = mode === "transmission" ? "transmission" : scene;
    if (track !== previousScene) {
      previousScene = track;
      sound.enter(track, true);
    }
  },
  resume() {
    if (field.s.unlocked.length === 6) field.s.mode = "hub";
    location.hash = "#/chapter-" + currentChapter(field.s);
  },
});
function route() {
  if (modal.open) closeDialog();
  finishTyping();
  ep.leave();
  if ([EPILOGUE_URL, PREVIEW_URL].includes(location.hash)) {
    clearTimeout(idle);
    if (field.active) field.leave();
    handoff = false;
    priorVisual = "";
    stage.classList.remove("field-active");
    ep.start(location.hash === PREVIEW_URL, field.s.unlocked.length);
    return;
  }
  const chapter = location.hash.match(/^#\/chapter-([123])$/);
  if (chapter) {
    clearTimeout(idle);
    handoff = true;
    previousScene = "chapter";
    priorVisual = "";
    sound.enter("chapter", false);
    field.start(Number(chapter[1]));
  } else {
    if (field.active) field.leave();
    stage.classList.remove("field-active");
    delete stage.dataset.mode;
    $("#field-book").hidden = true;
    $("#skip").innerHTML = 'SKIP <span aria-hidden="true">»</span>';
    $("#skip").setAttribute("aria-label", "Bỏ qua Prologue");
    index = 0;
    previousScene = "";
    priorVisual = "";
    render(false);
  }
}
stage.addEventListener("click", (e) => {
  if (
    !talking() ||
    modal.open ||
    inPortrait() ||
    e.target.closest("button,a,dialog")
  )
    return;
  const surface = e.target.closest("#dialogue") || stage;
  const rect = surface.getBoundingClientRect();
  if (e.clientX - rect.left < rect.width / 2) prev();
  else next();
});
$("#prev").addEventListener("click", prev);
$("#next").addEventListener("click", next);
$("#skip").addEventListener("click", () =>
  ep.active ? ep.skip() : handoff ? field.skipDialogue() : confirmSkip(),
);
$("#sound").addEventListener("click", () => {
  const on = sound.toggle(previousScene);
  try {
    localStorage.setItem("tdstkndemo4:sound", String(on));
  } catch {}
  $("#sound").setAttribute("aria-pressed", on);
  $("#sound").setAttribute("aria-label", on ? "Tắt âm thanh" : "Bật âm thanh");
});
$("#modal-close").addEventListener("click", closeDialog);
modal.addEventListener("cancel", (e) => {
  e.preventDefault();
  closeDialog();
});
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    const b = modal.getBoundingClientRect();
    if (
      e.clientX < b.left ||
      e.clientX > b.right ||
      e.clientY < b.top ||
      e.clientY > b.bottom
    )
      closeDialog();
  }
});
document.addEventListener("keydown", (e) => {
  if (
    inPortrait() ||
    modal.open ||
    !talking() ||
    e.repeat ||
    e.altKey ||
    e.ctrlKey ||
    e.metaKey
  )
    return;
  if (e.key === "ArrowLeft") {
    e.preventDefault();
    prev();
  } else if (e.key === "ArrowRight") {
    e.preventDefault();
    next();
  } else if (
    (e.key === "Enter" || e.key === " ") &&
    !e.target.closest("button,a,input,dialog")
  ) {
    e.preventDefault();
    next();
  }
});
stage.addEventListener("pointermove", (e) => {
  if (e.pointerType !== "mouse" || previousScene !== "P1" || typeMotion.matches)
    return;
  const bounds = stage.getBoundingClientRect();
  stage.style.setProperty(
    "--pan",
    ((e.clientX - bounds.left) / bounds.width - 0.5) * 5 + "px",
  );
});
function orientation() {
  stage.inert = inPortrait();
  field.syncClock();
}
$("#portrait-play").addEventListener("click", () => {
  document.body.classList.add("allow-portrait");
  orientation();
  stage.focus();
});
portrait.addEventListener("change", orientation);
orientation();
document.addEventListener("visibilitychange", () => {
  if (document.hidden) sound.suspend();
  else sound.enter(previousScene, false);
});
try {
  if (localStorage.getItem("tdstkndemo4:sound") === "true") {
    sound.on = true;
    $("#sound").setAttribute("aria-pressed", "true");
    $("#sound").setAttribute("aria-label", "Tắt âm thanh");
  }
} catch {}
window.addEventListener("hashchange", route);
route();
