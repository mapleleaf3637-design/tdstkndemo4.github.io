import { beats, branchIds } from "./story.js";
export const EPILOGUE_URL =
  "https://mapleleaf3637-design.github.io/tdstkndemo3.github.io/#/epilogue";
const KEY = "tdstkndemo4:field:v1";
export function freshState() {
  return {
    mode: "story",
    beat: 0,
    found: 0,
    unlocked: [],
    booth: 0,
    intro: 0,
    remaining: 0,
    throws: 0,
    score: 0,
    question: 0,
    correct: 0,
    order: 0,
    matched: 0,
    expired: 0,
    choice: null,
    finishedBook: false,
    quizFailed: false,
  };
}
export function loadState() {
  const base = freshState();
  try {
    const s = JSON.parse(localStorage.getItem(KEY));
    if (!s || !Array.isArray(s.unlocked)) return base;
    const modes = [
      "story",
      "find",
      "equipment",
      "hub",
      "intro",
      "rope",
      "quiz",
      "request",
      "shop",
      "explain",
      "result",
      "final",
    ];
    if (!modes.includes(s.mode) || !Number.isInteger(s.beat) || !beats[s.beat])
      return base;
    const state = {
      ...base,
      ...s,
      unlocked: branchIds.filter((id) => s.unlocked.includes(id)),
    };
    if (!Number.isInteger(state.booth) || state.booth < 0 || state.booth > 2)
      return base;
    return state;
  } catch {
    return base;
  }
}
export function saveState(s) {
  try {
    localStorage.setItem(KEY, JSON.stringify(s));
  } catch {
    /* Session play remains available. */
  }
}
export function unlock(s, id) {
  if (!s.unlocked.includes(id)) s.unlocked.push(id);
}
export function currentChapter(s) {
  return s.mode === "story"
    ? beats[s.beat].chapter
    : ["find", "equipment"].includes(s.mode)
      ? 2
      : 3;
}
export function epilogueDestination(s) {
  if (!branchIds.every((id) => s.unlocked.includes(id))) return null;
  // The two Pages projects share an origin. Export earned evidence to demo3's documented gate.
  try {
    const key = "lost-elephant-archive:v1";
    const old = JSON.parse(localStorage.getItem(key) || "{}") || {};
    const union = (a, b) => [
      ...new Set([...(Array.isArray(a) ? a : []), ...b]),
    ];
    localStorage.setItem(
      key,
      JSON.stringify({
        ...old,
        unlockedBranches: union(old.unlockedBranches, branchIds),
        completedStages: union(old.completedStages, ["stage-1", "stage-2"]),
      }),
    );
    return EPILOGUE_URL;
  } catch {
    return EPILOGUE_URL + "-preview";
  }
}
