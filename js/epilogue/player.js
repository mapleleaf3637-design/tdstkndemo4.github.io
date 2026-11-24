import { scenes, comparisons, comparisonClosing, choices } from "./story.js";
import { epAssets } from "./assets.js";
import { bg, preload, view } from "./view.js";
import { PREVIEW_URL } from "../config.js?v=spark";

const steps = [];
for (const [scene, chapter] of scenes.entries()) {
  if (scene === 7) {
    steps.push({ scene, kind: "ending" });
    continue;
  }
  chapter.beats.forEach((beat, index) =>
    steps.push({
      scene,
      beat,
      index,
      kind: "dialogue",
      send: scene === 5 && index === chapter.beats.length - 1,
    }),
  );
  if (scene === 2) {
    steps.push({ scene, kind: "compare" });
    comparisonClosing.forEach((beat, index) =>
      steps.push({ scene, beat, index, kind: "closing" }),
    );
  }
  if (scene === 3) steps.push({ scene, kind: "choice" });
  if (scene === 4)
    steps.push({ scene, index: chapter.beats.length, kind: "reflection" });
  if (scene === 5) steps.push({ scene, kind: "transmission" });
}
const at = Object.fromEntries(
  ["compare", "choice", "transmission", "ending"].map((key) => [
    key,
    steps.findIndex((step) => step.kind === key),
  ]),
);
const fresh = () => ({
  cursor: 0,
  pair: 0,
  solved: [],
  selected: null,
  confirmed: null,
  transmitted: false,
  finished: false,
});
function restore(key) {
  try {
    const raw = JSON.parse(localStorage.getItem(key));
    if (!raw || !Number.isInteger(raw.cursor) || !steps[raw.cursor])
      return fresh();
    const valid = (value) =>
      choices.some((c) => c.id === value) ? value : null;
    const s = {
      ...fresh(),
      cursor: raw.cursor,
      pair: [0, 1, 2].includes(raw.pair) ? raw.pair : 0,
      solved: comparisons
        .filter((p) => Array.isArray(raw.solved) && raw.solved.includes(p.id))
        .map((p) => p.id),
      selected: valid(raw.selected),
      confirmed: valid(raw.confirmed),
      transmitted: raw.transmitted === true,
    };
    if (
      s.cursor > at.compare &&
      !comparisons.slice(0, 2).every((p) => s.solved.includes(p.id))
    )
      s.cursor = at.compare;
    if (s.cursor > at.choice && !s.confirmed) s.cursor = at.choice;
    if (s.cursor > at.transmission && !s.transmitted)
      s.cursor = at.transmission - 1;
    s.finished = s.cursor === at.ending && raw.finished === true;
    return s;
  } catch {
    return fresh();
  }
}
export class Epilogue {
  constructor(api) {
    this.api = api;
    this.active = false;
    this.root = document.createElement("div");
    this.root.id = "epilogue";
    this.root.addEventListener("click", (event) => {
      const b = event.target.closest("button[data-ep]");
      if (b) {
        event.stopPropagation();
        this.act(b.dataset.ep, b.dataset.value);
      }
    });
    this.root.addEventListener(
      "error",
      (e) => {
        if (e.target.tagName === "IMG") e.target.hidden = true;
      },
      true,
    );
  }
  get talking() {
    return this.active && this.mode === "dialogue";
  }
  start(preview, count) {
    this.active = true;
    this.preview = preview;
    this.count = preview ? 6 : count;
    this.gate = !preview && count < 6;
    this.key = "tdstkndemo4:epilogue:v1:" + (preview ? "preview" : "game");
    this.s = this.gate ? fresh() : restore(this.key);
    this.wrong = false;
    this.api.art.replaceChildren(this.root);
    this.api.stage.classList.add("ep-active");
    this.render();
  }
  leave() {
    if (!this.active) return;
    this.stop();
    this.active = false;
    this.root.remove();
    this.lastView = null;
    this.api.stage.classList.remove("ep-active");
  }
  stop() {
    cancelAnimationFrame(this.frame);
    clearTimeout(this.hold);
  }
  save() {
    if (!this.gate)
      try {
        localStorage.setItem(this.key, JSON.stringify(this.s));
      } catch {}
  }
  go(cursor, full = false) {
    if (!steps[cursor]) return;
    this.s.cursor = cursor;
    this.wrong = false;
    this.render(full);
  }
  render(full = false) {
    this.stop();
    const s = this.s,
      step = steps[s.cursor],
      scene = "E" + step.scene;
    const mode = this.gate
      ? "gate"
      : s.finished
        ? "finished"
        : ["dialogue", "closing", "reflection"].includes(step.kind)
          ? "dialogue"
          : step.kind;
    this.mode = mode;
    Object.assign(this.api.stage.dataset, {
      scene,
      beat: scene + "-" + step.kind + "-" + (step.index ?? 0),
      mode,
    });
    this.root.dataset.mode = mode;
    this.api.layout(mode, scene, this.preview, this.count);
    if (step.send && mode === "dialogue")
      document.querySelector("#skip").hidden = true;
    const background = bg(step, mode),
      box = this.api.backdrop;
    if (box.firstElementChild?.dataset.epBg !== background) {
      const im = new Image();
      im.alt = "";
      im.className = "visible";
      im.dataset.epBg = background;
      im.onerror = () => {
        im.hidden = true;
      };
      im.src = epAssets[background];
      box.replaceChildren(im);
    }
    const key =
      mode === "dialogue"
        ? [
            scene,
            step.kind,
            step.scene === 0
              ? step.index < 2
              : step.scene === 4
                ? step.index < 4
                : 0,
            !!step.send,
          ].join("-")
        : null;
    if (!key || key !== this.lastView) {
      const focused = this.root.contains(document.activeElement)
        ? { ...document.activeElement.dataset }
        : null;
      this.root.innerHTML = view(step, s, mode, this.wrong, this.count);
      if (focused?.ep) {
        const controls = Array.from(this.root.querySelectorAll("button"));
        (
          controls.find(
            (b) =>
              b.dataset.ep === focused.ep && b.dataset.value === focused.value,
          ) || controls[0]
        )?.focus({ preventScroll: true });
      }
    }
    this.lastView = key;
    if (this.talking) {
      const beat = step.beat || {
        speaker: "Nhà nghiên cứu",
        line: choices.find((c) => c.id === s.confirmed).reflection,
      };
      this.api.speak(beat, full);
      this.api.nav(s.cursor === 0, !!step.send);
    }
    if (!this.gate) preload(steps[s.cursor + 1]);
    this.save();
    if (mode === "transmission") this.animate();
  }
  advance() {
    if (this.talking && !steps[this.s.cursor].send) this.go(this.s.cursor + 1);
  }
  back() {
    const n = this.s.cursor;
    if (!this.talking || !n) return;
    if (steps[n].scene === 3 && steps[n].index === 0) this.go(at.compare);
    else if (n === at.transmission + 1) this.go(at.transmission - 1, true);
    else this.go(n - 1, true);
  }
  skip() {
    const n = this.s.cursor;
    if (this.mode === "transmission") return this.complete();
    if (!this.talking) return;
    if (n < at.compare) this.go(at.compare);
    else if (n < at.choice) this.go(at.choice);
    else if (n < at.transmission) this.go(at.transmission - 1, true);
    else this.go(at.ending);
  }
  animate() {
    const start = performance.now(),
      duration = this.api.motion.matches ? 150 : 2400;
    const meter = this.root.querySelector("progress"),
      label = this.root.querySelector("label"),
      percent = this.root.querySelector("#ep-percent");
    const tick = (now) => {
      const n = Math.max(
        0,
        Math.min(100, Math.floor((100 * (now - start)) / duration)),
      );
      meter.value = n;
      percent.textContent = n + "%";
      label.textContent =
        n === 100
          ? "100% COMPLETE"
          : n > 65
            ? "SAVING KNOWLEDGE RECORDS..."
            : "TRANSMITTING ARCHIVE...";
      if (n < 100) this.frame = requestAnimationFrame(tick);
      else
        this.hold = setTimeout(
          () => this.complete(),
          this.api.motion.matches ? 200 : 550,
        );
    };
    this.frame = requestAnimationFrame(tick);
  }
  complete() {
    if (this.mode !== "transmission") return;
    this.s.transmitted = true;
    this.go(at.transmission + 1);
  }
  act(action, value) {
    const s = this.s;
    if (action === "return") return this.api.resume();
    if (action === "preview" && this.gate) {
      location.hash = PREVIEW_URL;
      return;
    }
    if (this.mode === "compare") {
      const pair = comparisons[s.pair],
        solved = s.solved.includes(pair.id);
      switch (action) {
        case "answer":
          if (solved) return;
          this.wrong = Number(value) !== pair.correct;
          if (!this.wrong) s.solved.push(pair.id);
          break;
        case "pair-prev":
          if (s.pair === 0) return this.go(at.compare - 1, true);
          s.pair--;
          this.wrong = false;
          break;
        case "pair-next":
        case "optional":
          if (!solved || s.pair >= 2) return;
          s.pair++;
          this.wrong = false;
          break;
        case "comparison-done":
          if (comparisons.slice(0, 2).every((p) => s.solved.includes(p.id)))
            this.go(at.compare + 1);
          return;
        default:
          return;
      }
    } else if (this.mode === "choice") {
      if (action === "choice" && choices.some((c) => c.id === value))
        s.selected = value;
      else if (action === "confirm" && s.selected) {
        if (s.confirmed !== s.selected) s.transmitted = false;
        s.confirmed = s.selected;
        return this.go(at.choice + 1);
      } else if (action === "choice-back") return this.go(at.choice - 1, true);
      else return;
    } else if (action === "transmit" && this.talking && steps[s.cursor].send)
      return this.go(at.transmission);
    else if (
      ["ending", "finished"].includes(this.mode) &&
      action === "replay"
    ) {
      this.s = fresh();
      return this.go(0);
    } else if (this.mode === "ending" && action === "finish") s.finished = true;
    else return;
    this.render();
  }
}
