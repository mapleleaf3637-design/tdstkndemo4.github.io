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
  note() {
    if (!this.on) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      this.notes ??= new AudioCtx();
      if (this.notes.state === "suspended") this.notes.resume().catch(() => {});
      const oscillator = this.notes.createOscillator();
      const volume = this.notes.createGain();
      const now = this.notes.currentTime;
      oscillator.frequency.setValueAtTime(640, now);
      oscillator.frequency.exponentialRampToValueAtTime(400, now + 0.1);
      volume.gain.setValueAtTime(0.035, now);
      volume.gain.exponentialRampToValueAtTime(0.001, now + 0.11);
      oscillator.connect(volume).connect(this.notes.destination);
      oscillator.start(now);
      oscillator.stop(now + 0.12);
    } catch {
      /* Audio is optional on devices with restricted playback. */
    }
  }
  suspend() {
    this.bed.pause();
    this.effect.pause();
  }
}
