import { asset } from "./assets.js";
export class Soundscape {
  constructor() {
    this.on = false;
    this.bed = new Audio();
    this.bed.loop = true;
    this.bed.volume = 0.4;
    this.effect = new Audio();
    this.effect.volume = 0.55;
  }
  play(track) {
    const p = track.play();
    if (p) p.catch(() => {});
  }
  toggle(scene) {
    this.on = !this.on;
    if (this.on) this.enter(scene, false);
    else {
      this.bed.pause();
      this.effect.pause();
    }
    return this.on;
  }
  enter(scene, forward) {
    if (!this.on) return;
    this.effect.pause();
    if (["P7", "P8", "chapter"].includes(scene)) this.bed.pause();
    else {
      if (!this.bed.src) this.bed.src = asset("PR-AU01");
      this.play(this.bed);
    }
    const id = scene === "P3" ? "PR-AU02" : scene === "P8" ? "PR-AU03" : null;
    if (forward && id) {
      this.effect.src = asset(id);
      this.play(this.effect);
    }
  }
  suspend() {
    this.bed.pause();
    this.effect.pause();
  }
}
