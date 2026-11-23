import { FieldGame } from "./field/game.js?v=dialogue3";
import { history as beats } from "./scenes.js";
import { paint, image, warm } from "./visuals.js";
import { Soundscape } from "./audio.js?field1";
import { NEXT_CHAPTER_URL } from "./config.js";
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
function text(beat) {
  const line = beat.line.normalize("NFC");
  $("#speaker").textContent = beat.speaker;
  $("#line").textContent = line;
  $("#spoken").textContent = beat.speaker + ". " + line;
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
function render(forward = true) {
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
  $("#prev").disabled = index === 0;
  $("#next").disabled = Boolean(b.action);
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
  text(b);
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
  render(!back);
}
function next() {
  if (modal.open || inPortrait() || (handoff && !field.talking)) return;
  if (handoff) return field.advance();
  if (beats[index].action) return;
  if (index + 1 === beats.length) {
    toChapter();
    return;
  }
  go(index + 1);
}
function prev() {
  if (modal.open || inPortrait()) return;
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
  nav: (first, gated) => {
    $("#prev").disabled = first;
    $("#next").disabled = gated;
  },
  count: (count) => {
    $("#scene-count").textContent = count + " / 6";
  },
  layout: (chapter, count, talking, skip) => {
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
function route() {
  if (modal.open) closeDialog();
  const chapter = location.hash.match(/^#\/chapter-([123])$/);
  if (chapter || location.hash === "#/epilogue") {
    clearTimeout(idle);
    handoff = true;
    previousScene = "chapter";
    priorVisual = "";
    sound.enter("chapter", false);
    field.start(chapter ? Number(chapter[1]) : "epilogue");
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
    (handoff && !field.talking) ||
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
  handoff ? field.skipDialogue() : confirmSkip(),
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
    (handoff && !field.talking) ||
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
