import { history as beats } from "./scenes.js";
import { paint, image, warm } from "./visuals.js";
import { Soundscape } from "./audio.js";
import { TYPEWRITER_MS, NEXT_CHAPTER_URL } from "./config.js";
const $ = (s) => document.querySelector(s);
const stage = $("#stage"),
  art = $("#art"),
  modal = $("#modal"),
  body = $("#modal-body");
const typeMotion = matchMedia("(prefers-reduced-motion: reduce)");
const portrait = matchMedia("(orientation:portrait) and (max-width:900px)");
const sound = new Soundscape();
let index = 0,
  typing = false,
  timer = 0,
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
function complete() {
  clearInterval(timer);
  typing = false;
  stage.dataset.typing = "false";
  if (!handoff) $("#line").textContent = beats[index].line;
}
function text(beat, full) {
  complete();
  $("#speaker").textContent = beat.speaker;
  $("#spoken").textContent = beat.speaker + ". " + beat.line;
  if (full || typeMotion.matches || TYPEWRITER_MS <= 0) return;
  const chars = Array.from(beat.line);
  let pos = 0;
  $("#line").textContent = "";
  typing = true;
  stage.dataset.typing = "true";
  timer = setInterval(() => {
    pos++;
    $("#line").textContent = chars.slice(0, pos).join("");
    if (pos >= chars.length) complete();
  }, TYPEWRITER_MS);
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
function render(full = false, forward = true) {
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
  render(back, !back);
}
function next() {
  if (handoff || modal.open || inPortrait()) return;
  if (typing) {
    complete();
    return;
  }
  if (beats[index].action) return;
  if (index + 1 === beats.length) {
    toChapter();
    return;
  }
  go(index + 1);
}
function prev() {
  if (handoff || modal.open || inPortrait() || index === 0) return;
  go(index - 1, true);
}
function toChapter() {
  complete();
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
function chapter() {
  handoff = true;
  clearInterval(timer);
  clearTimeout(idle);
  typing = false;
  previousScene = "chapter";
  priorVisual = "";
  sound.enter("chapter", false);
  $("#dialogue").hidden = true;
  $("#skip").hidden = true;
  $("#tap-hint").hidden = true;
  $("#scene-count").textContent = "0 / 6";
  $("#chapter-label").textContent = "CHƯƠNG 1";
  stage.dataset.scene = "chapter";
  delete stage.dataset.beat;
  background("PR-BG06");
  const box = document.createElement("section");
  box.className = "handoff";
  const k = document.createElement("span");
  k.className = "eyebrow";
  k.textContent = "TÂY NGUYÊN, VIỆT NAM";
  const h = document.createElement("h1");
  h.textContent = "Tập tính của voi";
  const p = document.createElement("p");
  p.textContent = "Bạn đã đến bìa rừng. Phần chơi Chương 1 đang được chuẩn bị.";
  const replay = document.createElement("a");
  replay.className = "action";
  replay.href = "#/prologue";
  replay.textContent = "Đọc lại Prologue";
  box.append(k, h, p, replay);
  art.replaceChildren(box);
}
function route() {
  if (modal.open) closeDialog();
  if (location.hash === "#/chapter-1") chapter();
  else {
    index = 0;
    render(false, false);
  }
}
stage.addEventListener("click", (e) => {
  if (
    handoff ||
    modal.open ||
    inPortrait() ||
    e.target.closest("button,a,dialog")
  )
    return;
  const rect = stage.getBoundingClientRect();
  if (e.clientX - rect.left < rect.width / 2) prev();
  else next();
});
$("#prev").addEventListener("click", prev);
$("#next").addEventListener("click", next);
$("#skip").addEventListener("click", confirmSkip);
$("#sound").addEventListener("click", () => {
  const on = sound.toggle(previousScene);
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
    handoff ||
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
}
$("#portrait-play").addEventListener("click", () => {
  document.body.classList.add("allow-portrait");
  orientation();
  stage.focus();
});
portrait.addEventListener("change", orientation);
orientation();
typeMotion.addEventListener("change", () => {
  if (typeMotion.matches) complete();
});
document.addEventListener("visibilitychange", () => {
  if (document.hidden) sound.suspend();
  else sound.enter(previousScene, false);
});
window.addEventListener("hashchange", route);
route();
