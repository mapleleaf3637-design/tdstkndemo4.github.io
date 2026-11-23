import {
  beats,
  booths,
  branches,
  branchIds,
  discoveries,
  orders,
  questions,
  ranks,
  titles,
} from "./story.js?v=dialogue2";
import { assetUrl, media } from "./media.js";
import {
  currentChapter,
  epilogueDestination,
  loadState,
  saveState,
  unlock,
} from "./state.js";
import { control, notebook, pad, panel, photoPage, pic } from "./ui.js";
import { equipment, quiz, results, rope, shop, storehouse } from "./games.js";

export class FieldGame {
  constructor(api) {
    this.api = api;
    this.s = loadState();
    this.active = false;
    this.remainingAt = 0;
    this.aim = { x: 0.5, y: 0.5 };
    this.photos = [];
    this.photoIndex = 0;
    this.root = document.createElement("div");
    this.root.id = "field";
    this.root.addEventListener("click", (e) => {
      const el = e.target.closest("[data-do]");
      if (el) {
        e.stopPropagation();
        this.act(el.dataset.do, el.dataset.value);
      }
    });
    this.root.addEventListener(
      "error",
      (e) => {
        if (e.target.tagName === "IMG") {
          e.target.hidden = true;
          console.warn("Field image unavailable", e.target.src);
        }
      },
      true,
    );
    this.root.addEventListener("pointerdown", (e) => this.down(e));
    this.root.addEventListener("pointermove", (e) => this.move(e));
    this.root.addEventListener("pointerup", (e) => this.up(e));
    this.root.addEventListener("pointercancel", () => {
      this.drag = null;
    });
    this.root.addEventListener("keydown", (e) => this.ropeKey(e));
    this.api.modal.addEventListener("close", () => this.syncClock());
    this.api.modal.addEventListener("click", (e) => {
      const b = e.target.closest("[data-do]");
      if (this.active && b) this.act(b.dataset.do, b.dataset.value);
    });
    document.addEventListener("visibilitychange", () => this.syncClock());
    window.addEventListener("pagehide", () => {
      this.stopClock();
      if (this.active) saveState(this.s);
    });
    window.addEventListener("pageshow", () => this.syncClock());
  }
  get talking() {
    return this.active && ["story", "intro"].includes(this.s.mode);
  }
  start(request) {
    const wasActive = this.active;
    this.active = true;
    const s = this.s,
      chapter = currentChapter(s);
    if (request === "epilogue" && s.unlocked.length === 6) {
      s.mode = "final";
    } else if (
      request === 1 &&
      (chapter !== 1 || (wasActive === false && s.mode === "final"))
    ) {
      // A deliberate revisit retains earned notebook pages.
      s.mode = "story";
      s.beat = 0;
    } else if (request === 2 && chapter !== 2 && s.unlocked.includes("care")) {
      s.beat = beats.findIndex((b) => b.chapter === 2);
      s.mode = "story";
    } else if (
      request === 3 &&
      chapter !== 3 &&
      s.unlocked.includes("domestication")
    ) {
      s.mode = "hub";
      s.beat = beats.findIndex((b) => b.chapter === 3);
    }
    this.render();
  }
  leave() {
    this.stopClock();
    this.cancelEffects();
    this.active = false;
    this.root.remove();
  }
  cancelEffects() {
    clearTimeout(this.impact);
    clearTimeout(this.quizDelay);
    this.locked = false;
    this.drag = null;
    this.aimed = false;
  }
  render() {
    this.stopClock();
    this.cancelEffects();
    const s = this.s,
      b = beats[s.beat],
      mode = s.mode,
      booth = booths[s.booth],
      chapter = currentChapter(s);
    const stage = this.api.stage;
    stage.classList.add("field-active");
    stage.dataset.scene = "C" + chapter;
    stage.dataset.mode = mode;
    stage.dataset.beat = b.place + "-" + s.beat;
    const hash = "#/chapter-" + chapter;
    if (location.hash !== hash) history.replaceState(null, "", hash);
    this.api.art.replaceChildren(this.root);
    const bg =
      mode === "story"
        ? b.bg
        : ["find", "equipment"].includes(mode)
          ? "bg_08"
          : ["hub", "final"].includes(mode)
            ? "bg_09"
            : booth.bg;
    if (this.bg !== bg || !this.api.backdrop.querySelector("[data-field-bg]")) {
      const img = new Image();
      img.alt = "";
      img.dataset.fieldBg = bg;
      img.className = "visible";
      img.src = assetUrl(bg);
      img.onerror = () => {
        img.hidden = true;
        console.warn("Field background unavailable", bg);
      };
      this.api.backdrop.replaceChildren(img);
      this.bg = bg;
    }
    this.api.layout(chapter, s.unlocked.length, this.talking, this.talking);
    this.root.dataset.view = mode;
    let markup = "";
    if (mode === "story") {
      const opening =
        b.first && ["opening", "village", "festival"].includes(b.place);
      if (b.person)
        markup += pic(
          b.person,
          "field-person" + (opening ? " opening-person" : ""),
        );
      if (b.observation) {
        const [id, label] = b.observation;
        markup +=
          '<figure class="behavior-photo">' +
          pic(id, "", media[id].title) +
          "<figcaption>Ảnh tư liệu · " +
          label +
          "</figcaption></figure>";
      } else if (b.animal)
        markup += pic(
          b.animal,
          "field-animal " + (b.person ? "paired" : "alone"),
        );
      if (b.place === "caretaker") markup += pic("p1_04", "care-supplies");
      if (opening)
        markup +=
          '<div class="field-chapter-title"><small>CHƯƠNG ' +
          chapter +
          "</small><h1>" +
          titles[chapter - 1] +
          "</h1></div>";
      if (b.photos.length)
        markup += control("photos", "Ảnh tư liệu", "photo-trigger");
      if (b.award !== undefined) {
        unlock(s, branchIds[b.award]);
        markup +=
          '<div class="unlock-note">' +
          pic("ui_" + pad(b.award + 2)) +
          "<span>Đã ghi vào sổ<strong>" +
          branches[b.award][0] +
          "</strong></span></div>";
      }
      this.api.speak(b);
      this.api.nav(s.beat === 0, b.place === "store");
      if (b.place === "store")
        markup += control(
          "open-store",
          "Vào kho tìm đồ",
          "field-primary start-booth",
        );
      const upcoming = beats[s.beat + 1];
      if (upcoming?.observation && upcoming.observation !== b.observation) {
        const nextPhoto = new Image();
        nextPhoto.src = assetUrl(upcoming.observation[0]);
      }
      if (upcoming && upcoming.bg !== b.bg) {
        const next = new Image();
        next.src = assetUrl(upcoming.bg);
      }
    } else if (mode === "intro") {
      markup =
        pic(booth.npc, "field-person") +
        control("leave-intro", "Về sân hội", "leave-intro");
      if (s.booth === 0 && s.intro > 0 && s.intro < 4)
        markup +=
          '<div class="rank-sheet">' +
          pic("p2_05") +
          "<div>" +
          ranks
            .map(
              ([name, milestone]) =>
                "<span><b>" + name + "</b><em>" + milestone + "</em></span>",
            )
            .join("") +
          "</div></div>";
      if (s.booth === 1) markup += pic("p3_01", "intro-board");
      if (s.booth === 2) markup += pic("p4_11", "intro-board");
      const ready = s.intro === booth.intro.length - 1;
      if (ready)
        markup += control("start", booth.start, "field-primary start-booth");
      this.api.speak({ speaker: "Chủ sạp", line: booth.intro[s.intro] });
      this.api.nav(s.intro === 0, ready);
    } else {
      if (mode === "find") markup = storehouse(s);
      if (mode === "equipment") markup = equipment(s);
      if (mode === "hub") markup = this.hub();
      if (mode === "rope") markup = rope(s);
      if (mode === "quiz") markup = quiz(s);
      if (["shop", "explain", "request"].includes(mode)) markup = shop(s);
      if (mode === "result") markup = results(s);
      if (mode === "final")
        markup =
          '<section class="field-paper final-book"><small>ELEPHANT ARCHIVE · 6/6</small><h1>Hồ sơ voi đã hoàn chỉnh</h1>' +
          notebook(s) +
          '<p>Cuối cùng, sáu mảnh tư liệu đã kết nối. Đã đến lúc mang hồ sơ này trở về SPARK.</p><div class="actions">' +
          control("hub", "Về sân hội", "secondary") +
          control("epilogue", "Tiếp tục đến Epilogue") +
          "</div></section>";
    }
    this.root.innerHTML = markup;
    this.root.style.setProperty("--steps", s.correct);
    this.api.count(s.unlocked.length);
    if (mode === "rope") this.updateAim(false);
    this.syncClock();
    saveState(s);
  }
  hub() {
    const s = this.s;
    return (
      '<div class="field-heading hub-heading"><small>CHƯƠNG 3 · NGÀY HỘI CỦA BUÔN LÀNG</small><h1>Khám phá 3 gian hàng</h1></div><div class="booths">' +
      booths
        .map((b, i) => {
          const done = s.unlocked.includes(branchIds[i + 3]);
          return (
            '<button class="booth ' +
            (done ? "done" : "") +
            '" data-do="booth" data-value="' +
            i +
            '">' +
            pic("ui_13-" + (i + 1)) +
            "<strong>" +
            (i + 1) +
            "</strong><span>" +
            b.name +
            "</span><small>" +
            (done
              ? "✓ Đã ghi sổ"
              : i === 1 && s.quizFailed
                ? "Thử lại"
                : b.topic) +
            "</small></button>"
          );
        })
        .join("") +
      '</div><div class="hub-foot">' +
      (s.unlocked.length === 6
        ? control("final", "Mở hồ sơ hoàn chỉnh")
        : "Chọn một gian hàng. Bạn có thể ghé từng sạp theo bất kỳ thứ tự nào.") +
      "</div>"
    );
  }
  advance() {
    if (!this.talking) return;
    const s = this.s,
      b = beats[s.beat];
    if (s.mode === "intro") {
      if (s.intro < booths[s.booth].intro.length - 1) {
        s.intro++;
        this.render();
      }
      return;
    }
    if (b.place === "store") return;
    if (s.beat === beats.length - 1) s.mode = "hub";
    else s.beat++;
    this.render();
  }
  back() {
    if (!this.talking) return;
    const s = this.s;
    if (s.mode === "intro") {
      if (s.intro === 0) return;
      s.intro--;
    } else if (s.beat > 0) s.beat--;
    this.render();
  }
  skipDialogue() {
    if (!this.talking) return;
    const s = this.s;
    if (s.mode === "intro") {
      s.intro = booths[s.booth].intro.length - 1;
      this.render();
      return;
    }
    const b = beats[s.beat];
    while (s.beat < beats.length - 1 && beats[s.beat + 1].place === b.place) {
      s.beat++;
      const award = beats[s.beat].award;
      if (award !== undefined) unlock(s, branchIds[award]);
    }
    if (b.place === "store") {
      this.render();
      return;
    }
    if (s.beat === beats.length - 1) s.mode = "hub";
    else s.beat++;
    this.render();
  }
  act(action, value) {
    const s = this.s;
    if (
      [
        "find",
        "start",
        "equipment-next",
        "product",
        "choose",
        "booth",
      ].includes(action)
    )
      this.api.cue();
    switch (action) {
      case "leave-intro":
        if (s.mode !== "intro") return;
        s.mode = "hub";
        break;
      case "book":
        return this.openBook();
      case "photos":
        this.photos = beats[s.beat].photos;
        this.photoIndex = Math.max(
          0,
          this.photos.indexOf(beats[s.beat].observation?.[0]),
        );
        return this.openPhotos();
      case "photo-prev":
      case "photo-next":
        this.photoIndex =
          (this.photoIndex +
            (action === "photo-next" ? 1 : -1) +
            this.photos.length) %
          this.photos.length;
        return this.photoContent();
      case "booth":
        s.booth = Number(value);
        s.intro = 0;
        s.mode = "intro";
        break;
      case "replay":
        s.intro = booths[s.booth].intro.length - 1;
        s.mode = "intro";
        break;
      case "start":
        if (s.mode !== "intro" || s.intro !== booths[s.booth].intro.length - 1)
          return;
        if (s.booth === 0)
          Object.assign(s, {
            mode: "rope",
            remaining: 60000,
            throws: 0,
            score: 0,
          });
        else if (s.booth === 1)
          Object.assign(s, {
            mode: "quiz",
            remaining: 30000,
            question: 0,
            correct: 0,
          });
        else
          Object.assign(s, {
            mode: "request",
            order: 0,
            matched: 0,
            expired: 0,
            choice: null,
          });
        break;
      case "open-store":
        s.mode = s.found === 2 ? "equipment" : "find";
        break;
      case "find":
        if (value !== ["p1_01", "p1_02"][s.found]) {
          this.root.querySelector("#find-hint").textContent = s.found
            ? "Hãy tìm chiếc khung có chỗ ngồi, được đan bằng mây."
            : "Hãy tìm tấm phẳng màu vỏ cây, không có quai hay miệng đựng.";
          return;
        }
        s.found++;
        s.mode = "equipment";
        if (s.found === 2) unlock(s, "domestication");
        break;
      case "equipment-next":
        if (s.found === 1) s.mode = "find";
        else {
          s.mode = "story";
          s.beat = beats.findIndex((b) => b.place === "farewell");
        }
        break;
      case "throw":
        return this.throwAt();
      case "answer":
        return this.answer(Number(value));
      case "choose":
        s.mode = "shop";
        s.remaining = 120000;
        s.choice = null;
        break;
      case "product":
        if (s.mode !== "shop" || !this.timeLeft()) return;
        this.stopClock();
        s.choice = Number(value);
        s.mode = "explain";
        if (s.choice === s.order) s.matched++;
        break;
      case "explain-next":
        if (s.choice !== -1 && s.choice !== s.order) s.mode = "shop";
        else if (s.order < orders.length - 1) {
          s.order++;
          s.mode = "request";
          s.choice = null;
        } else return this.finish();
        break;
      case "hub":
        s.mode = s.unlocked.length === 6 && !s.finishedBook ? "final" : "hub";
        if (s.mode === "final") s.finishedBook = true;
        break;
      case "final":
        if (s.unlocked.length === 6) s.mode = "final";
        break;
      case "epilogue": {
        const url = epilogueDestination(s);
        if (url) location.assign(url);
        return;
      }
      default:
        return;
    }
    this.render();
  }
  finish() {
    this.stopClock();
    const s = this.s;
    if (s.booth !== 1 || s.correct / 12 > 0.2)
      unlock(s, branchIds[s.booth + 3]);
    if (s.booth === 1) s.quizFailed = s.correct < 3;
    s.mode = "result";
    this.render();
  }
  timeLeft() {
    if (!this.remainingAt || performance.now() < this.remainingAt) return true;
    this.timeout();
    return false;
  }
  timeout() {
    this.stopClock();
    const s = this.s;
    s.remaining = 0;
    if (s.mode === "shop") {
      s.choice = -1;
      s.expired++;
      s.mode = "explain";
      this.render();
    } else if (["rope", "quiz"].includes(s.mode)) this.finish();
  }
  stopClock() {
    if (this.remainingAt)
      this.s.remaining = Math.max(0, this.remainingAt - performance.now());
    this.remainingAt = 0;
    clearInterval(this.tick);
  }
  syncClock() {
    if (!this.active) return;
    const timed = ["shop", "rope", "quiz"].includes(this.s.mode);
    const pause = document.hidden || this.api.modal.open || this.api.portrait();
    if (!timed || pause) {
      this.stopClock();
      this.root.classList.add("clock-paused");
      saveState(this.s);
      return;
    }
    this.root.classList.remove("clock-paused");
    if (this.remainingAt) return;
    this.remainingAt = performance.now() + this.s.remaining;
    let last = -1;
    const update = () => {
      const ms = Math.max(0, this.remainingAt - performance.now()),
        sec = Math.ceil(ms / 1000);
      if (sec !== last) {
        last = sec;
        this.s.remaining = ms;
        const c = this.root.querySelector("[data-clock]");
        if (c) c.textContent = pad(Math.floor(sec / 60)) + ":" + pad(sec % 60);
        saveState(this.s);
      }
      if (ms === 0) this.timeout();
    };
    this.tick = setInterval(update, 80);
    update();
  }
  answer(n) {
    const s = this.s;
    if (s.mode !== "quiz" || this.locked || !this.timeLeft()) return;
    const ok = n === questions[s.question][3];
    if (ok) {
      s.correct++;
      this.api.cue();
    }
    s.question++;
    const btn = this.root.querySelector(
      '[data-do="answer"][data-value="' + n + '"]',
    );
    btn.classList.add(ok ? "correct" : "incorrect");
    btn.setAttribute("aria-label", ok ? "Đúng" : "Chưa đúng");
    this.root.style.setProperty("--steps", s.correct);
    this.locked = true;
    if (s.question === 12) {
      this.finish();
      return;
    }
    saveState(s);
    this.quizDelay = setTimeout(() => {
      if (this.active && s.mode === "quiz") this.render();
    }, 140);
  }
  point(e) {
    const r = this.root.querySelector("#rope-field").getBoundingClientRect();
    return {
      x: (e.clientX - r.left) / r.width,
      y: (e.clientY - r.top) / r.height,
    };
  }
  down(e) {
    if (
      this.s.mode !== "rope" ||
      this.locked ||
      !e.isPrimary ||
      !e.target.closest("#rope-field,.rope-handle")
    )
      return;
    this.drag = {
      id: e.pointerId,
      x: e.clientX,
      y: e.clientY,
      handle: !!e.target.closest(".rope-handle"),
    };
    this.root.setPointerCapture(e.pointerId);
    this.root.querySelector("#rope-field").focus({ preventScroll: true });
  }
  move(e) {
    if (this.drag?.id !== e.pointerId) return;
    this.aim = this.point(e);
    this.updateAim(true);
  }
  up(e) {
    if (this.drag?.id !== e.pointerId) return;
    const d = this.drag;
    this.drag = null;
    if (this.root.hasPointerCapture(e.pointerId))
      this.root.releasePointerCapture(e.pointerId);
    const p = this.point(e);
    if (p.x < 0 || p.x > 1 || p.y < 0 || p.y > 1) return;
    const same =
      this.aimed &&
      Math.hypot(p.x - this.lastAim.x, p.y - this.lastAim.y) < 0.12;
    this.aim = p;
    this.updateAim(true);
    if (d.handle || Math.hypot(e.clientX - d.x, e.clientY - d.y) > 9 || same)
      this.throwAt();
    else {
      this.aimed = true;
      this.lastAim = p;
    }
  }
  updateAim(show) {
    const a = this.root.querySelector("#aim");
    if (!a) return;
    a.hidden = !show;
    a.style.left = this.aim.x * 100 + "%";
    a.style.top = this.aim.y * 100 + "%";
  }
  ropeKey(e) {
    if (this.s.mode !== "rope" || e.target.id !== "rope-field") return;
    const moves = {
      ArrowLeft: [-0.04, 0],
      ArrowRight: [0.04, 0],
      ArrowUp: [0, -0.06],
      ArrowDown: [0, 0.06],
    };
    if (moves[e.key]) {
      const [dx, dy] = moves[e.key];
      this.aim = {
        x: Math.min(0.99, Math.max(0.01, this.aim.x + dx)),
        y: Math.min(0.99, Math.max(0.01, this.aim.y + dy)),
      };
      this.updateAim(true);
    } else if (e.key === "Enter" || e.key === " ") this.throwAt();
    else return;
    e.preventDefault();
    e.stopPropagation();
  }
  throwAt() {
    if (
      this.s.mode !== "rope" ||
      this.locked ||
      !this.timeLeft() ||
      !this.remainingAt
    )
      return;
    const s = this.s;
    this.locked = true;
    this.aimed = false;
    const board = this.root.querySelector("#rope-field"),
      aim = this.aim;
    const loop = new Image();
    loop.src = assetUrl("p2_03");
    loop.className = "thrown-ring";
    loop.style.left = aim.x * 100 + "%";
    loop.style.top = aim.y * 100 + "%";
    board.append(loop);
    this.impact = setTimeout(() => {
      if (s.mode !== "rope" || !this.timeLeft()) return;
      if (!this.remainingAt) {
        loop.remove();
        this.locked = false;
        return;
      }
      s.throws++;
      const r = board.getBoundingClientRect(),
        x = r.left + aim.x * r.width,
        y = r.top + aim.y * r.height;
      // Sample the moving targets at impact; the DOM uses the same geometry the player sees.
      const hit = document
        .elementsFromPoint(x, y)
        .map((el) => el.closest("[data-points]"))
        .find(Boolean);
      const points = Number(hit?.dataset.points || 0);
      s.score += points;
      if (points) this.api.cue();
      if (hit?.classList.contains("rope-target")) hit.classList.add("knocked");
      this.root.querySelector("#throws").textContent = 5 - s.throws + "/5";
      this.root.querySelector("#score").textContent = s.score;
      this.root.querySelector("#rope-feedback").textContent =
        (points >= 10
          ? "Trúng bia khó! +" + points + " điểm."
          : points
            ? "Trúng bia! +" + points + " điểm."
            : hit
              ? "Trúng bụi cỏ, 0 điểm."
              : "Vòng rơi ngoài bia, 0 điểm.") +
        (s.throws === 4 ? " Còn một lượt cuối!" : "");
      if (s.throws === 5) {
        this.finish();
        return;
      }
      saveState(s);
      loop.remove();
      this.locked = false;
    }, 150);
  }
  openBook() {
    this.api.open(
      "Sổ tay nghiên cứu · " + this.s.unlocked.length + "/6",
      "notebook",
      notebook(this.s) +
        '<a class="field-credits" href="./assets/field/CREDITS.txt" target="_blank" rel="noopener">Nguồn ảnh và giấy phép</a>',
    );
    this.syncClock();
  }
  photoContent() {
    this.api.modal.querySelector("#modal-title").textContent =
      media[this.photos[this.photoIndex]].title;
    this.api.modal.querySelector(".field-modal-content").innerHTML = photoPage(
      this.photos,
      this.photoIndex,
    );
  }
  openPhotos() {
    if (!this.photos.length) return;
    this.api.open(media[this.photos[0]].title, "field-photo", "");
    this.photoContent();
    this.syncClock();
  }
}
