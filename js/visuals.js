import { asset, ASSETS } from "./assets.js";
import { ARCHIVE_BRANCHES } from "./config.js";
const node = (tag, cls, text) => {
  const el = document.createElement(tag);
  el.className = cls;
  if (text) el.textContent = text;
  return el;
};
const missing = new Set();
export function image(id, cls, alt = "") {
  const el = node("img", cls);
  el.alt = alt;
  el.draggable = false;
  el.addEventListener("error", () => {
    const spec = ASSETS[id];
    if (spec.source && !el.dataset.retried) {
      el.dataset.retried = "1";
      el.src = new URL("../" + spec.source, import.meta.url);
      return;
    }
    el.hidden = true;
    if (!missing.has(id)) {
      missing.add(id);
      console.warn("Asset unavailable:", id, spec.file);
    }
  });
  el.src = asset(id);
  return el;
}
export const evidence = {
  exhibit: {
    id: "PR-PH01",
    title: "Voi ở Tây Nguyên",
    caption:
      "Chuyên đề tại Bảo tàng Dân tộc học Việt Nam, Hà Nội. Ảnh thực địa của nhóm.",
  },
  collection: {
    id: "PR-PH02",
    title: "Bộ vật dụng của Ama Kông",
    caption:
      "Hiện vật được con trai Ama Kông trao tặng bảo tàng năm 2014. Ảnh thực địa của nhóm.",
  },
};
const signals = {
  signal: "UNKNOWN SIGNAL DETECTED",
  unknown: "SOURCE: UNIDENTIFIED UNIVERSE",
  decode: "DECODING TRANSMISSION...",
  identified: "SOURCE IDENTIFIED: EARTH",
};
const nodePoints = [
  [50.4, 16],
  [71.2, 34.3],
  [71.1, 68.5],
  [50.4, 84.8],
  [29.4, 68.5],
  [29.6, 34.3],
];
function archive() {
  const panel = node("section", "archive panel");
  const map = node("div", "knowledge-map");
  map.append(image("PR-UI05", "base-map"));
  const list = node("div", "archive-list");
  list.append(
    node("small", "eyebrow", "ELEPHANT ARCHIVE"),
    node("h2", "", "DATA FRAGMENTED"),
  );
  const grid = node("ul", "branches");
  ARCHIVE_BRANCHES.forEach((label, i) => {
    const id = "IC-UI0" + (i + 2);
    const icon = image(id, "locked-icon");
    icon.style.left = nodePoints[i][0] + "%";
    icon.style.top = nodePoints[i][1] + "%";
    icon.style.setProperty("--order", i);
    map.append(icon);
    grid.append(node("li", "", label));
  });
  list.append(grid, node("strong", "progress-text", "RESEARCH PROGRESS: 0/6"));
  panel.append(map, list);
  return panel;
}
export function paint(art, b, actions) {
  const group = document.createDocumentFragment();
  const add = (id, cls) => group.append(image(id, cls));
  if (b.character) add(b.character, "character");
  const v = b.visual;
  if (v === "title" || v === "forest") {
    const box = node(
      "section",
      "title-block " + (v === "forest" ? "forest-title" : ""),
    );
    if (v === "title") {
      box.append(node("p", "place", "HÀNH TINH SPARK — NĂM 2060"));
      const title = node("h1", "book-title");
      title.append(
        node("span", "", "THE LOST"),
        node("span", "", "ELEPHANT ARCHIVE"),
      );
      box.append(title, node("p", "subtitle", "Hồ sơ voi thất lạc"));
    } else
      box.append(
        node("p", "place", "TRÁI ĐẤT"),
        node("h2", "land-title", "TÂY NGUYÊN, VIỆT NAM"),
      );
    group.append(box);
  } else if (v === "hologram") {
    add("PR-OB01", "holo");
    add("PR-OB02", "folios");
    group.append(node("span", "screen-tag", "HỒ SƠ LƯU TRỮ"));
  } else if (v in signals) {
    add("PR-FX02", "rings");
    add("PR-OB06", "signal-beacon");
    const sig = node("div", "signal-status");
    sig.append(image("PR-UI04", "panel-art"), node("span", "", signals[v]));
    group.append(sig);
  } else if (v === "earth" || v === "map") {
    const box = node("div", "geo");
    box.append(image(v === "earth" ? "PR-OB03" : "PR-OB04", "globe"));
    if (v === "map") box.append(node("i", "pin"));
    group.append(box);
    group.append(
      node(
        "div",
        "geo-label",
        v === "earth" ? "TRÁI ĐẤT" : "TÂY NGUYÊN · VIỆT NAM",
      ),
    );
  } else if (evidence[v]) {
    const data = evidence[v];
    const card = node("button", "photo-card");
    card.type = "button";
    card.setAttribute("aria-label", "Phóng to ảnh: " + data.title);
    const inside = node("span", "photo-window");
    inside.append(
      node("span", "photo-placeholder", "Ô ảnh tư liệu"),
      image(data.id, "photo", data.title),
    );
    card.append(inside, image("PR-OB07", "frame"), node("span", "zoom", "↗"));
    card.addEventListener("click", () => actions.showPhoto(data));
    group.append(card, node("div", "photo-title", data.title));
  } else if (v === "fragments") {
    add("PR-FX03", "specks");
    add("PR-OB05", "fragments");
  } else if (v === "archive") {
    add("PR-FX03", "specks");
    group.append(archive());
  } else if (v === "notebook") add("PR-OB08", "notebook");
  else if (v === "mission") {
    const card = node("section", "mission");
    card.append(
      image("PR-UI06", "panel-art"),
      node("small", "eyebrow", "MISSION"),
      node("h2", "", "RESTORE THE ELEPHANT ARCHIVE"),
      node("p", "", "6 KNOWLEDGE BRANCHES TO DISCOVER"),
    );
    const btn = node("button", "action", "BẮT ĐẦU HÀNH TRÌNH");
    btn.type = "button";
    btn.addEventListener("click", actions.accept);
    card.append(btn);
    group.append(card);
  } else if (v === "portal") {
    add("PR-OB09", "portal");
    add("PR-FX01", "edge-wash");
  }
  art.replaceChildren(group);
}
const overlayAssets = {
  title: [],
  hologram: ["PR-OB01", "PR-OB02"],
  signal: ["PR-FX02", "PR-OB06", "PR-UI04"],
  earth: ["PR-OB03"],
  map: ["PR-OB04"],
  exhibit: ["PR-OB07", "PR-PH01"],
  collection: ["PR-OB07", "PR-PH02"],
  fragments: ["PR-FX03", "PR-OB05"],
  archive: ["PR-UI05", ...ARCHIVE_BRANCHES.map((_, i) => "IC-UI0" + (i + 2))],
  notebook: ["PR-OB08"],
  mission: ["PR-UI06"],
  portal: ["PR-OB09", "PR-FX01"],
};
const warmed = new Set();
export function warm(beat) {
  if (!beat) return;
  for (const id of [
    beat.bg,
    beat.character,
    ...(overlayAssets[beat.visual] || []),
  ].filter(Boolean)) {
    if (warmed.has(id)) continue;
    warmed.add(id);
    const im = new Image();
    im.fetchPriority = "low";
    im.src = asset(id);
  }
}
