import { epAssets, epBranchIcons } from "./assets.js";
import {
  archiveStatus,
  savedStatus,
  endingStatus,
  endingLines,
  comparisons,
  choices,
} from "./story.js";
import { ARCHIVE_BRANCHES } from "../config.js?v=spark7";
const img = (id, cls = "", alt = "") =>
  '<img draggable="false" class="' +
  cls +
  '" src="' +
  epAssets[id] +
  '" alt="' +
  alt +
  '">';
const button = (action, label, quiet = false) =>
  '<button type="button" class="ep-btn ' +
  (quiet ? "quiet" : "") +
  '" data-ep="' +
  action +
  '">' +
  label +
  "</button>";
const actions = (...buttons) =>
  '<div class="ep-actions">' + buttons.join("") + "</div>";
export function bg(step, mode) {
  if (mode === "transmission") return "EP-BG04";
  if (step.scene === 0 && step.index < 2) return "EP-BG01";
  if (step.scene === 2) return "EP-BG03";
  return step.scene === 7 ? "EP-BG05" : "EP-BG02";
}
function map() {
  const points = [
    [50.4, 16],
    [71.2, 34.3],
    [71.1, 68.5],
    [50.4, 84.8],
    [29.4, 68.5],
    [29.6, 34.3],
  ];
  return (
    '<div class="ep-map">' +
    img("EP-UI01", "ep-base", "Sáu nhánh kiến thức đã phục dựng") +
    epBranchIcons
      .map(
        (u, i) =>
          '<img class="ep-node" alt="' +
          ARCHIVE_BRANCHES[i] +
          '" src="' +
          u +
          '" style="--i:' +
          i +
          ";left:" +
          points[i][0] +
          "%;top:" +
          points[i][1] +
          '%">',
      )
      .join("") +
    "</div>"
  );
}
const person = (id) => img(id, "ep-person", "Nhà nghiên cứu");
function dialogue(step) {
  const i = step.index;
  switch (step.scene) {
    case 0:
      return (
        person("EP-CH01") +
        (i < 2
          ? '<div class="ep-title"><small>SPARK · 2060</small><h1>Trở về phòng nghiên cứu</h1></div>'
          : map())
      );
    case 1:
      return (
        '<section class="ep-archive">' +
        map() +
        "<div>" +
        img("EP-OB01", "ep-holo", "Hình chiếu voi châu Á") +
        "<small>" +
        archiveStatus[0] +
        "</small><h2>" +
        archiveStatus[1] +
        "</h2><b>" +
        archiveStatus[2] +
        "</b></div></section>"
      );
    case 2:
      return (
        person("EP-CH02") +
        '<div class="ep-title"><small>THEN &amp; NOW' +
        (step.kind === "closing" ? " — COMPLETED" : "") +
        "</small><h1>Ngày trước và ngày nay</h1></div>"
      );
    case 3:
      return (
        person("EP-CH02") + img("EP-OB01", "ep-terminal", "Hình chiếu voi")
      );
    case 4:
      return (
        person(i < 4 ? "EP-CH02" : "EP-CH03") +
        img("EP-OB01", "ep-terminal", "Hình chiếu voi")
      );
    case 5:
      return (
        person("EP-CH03") +
        img("EP-OB12", "ep-ribbons", "") +
        (step.send
          ? '<div class="ep-send">' +
            button("transmit", "TRUYỀN DỮ LIỆU") +
            "</div>"
          : "")
      );
    case 6:
      return (
        person("EP-CH04") +
        '<section class="ep-saved">' +
        img("EP-OB13", "ep-object", "Hồ sơ đã lưu trữ") +
        "<div><small>" +
        savedStatus[0] +
        "</small><h2>" +
        savedStatus[1] +
        "</h2><p>" +
        savedStatus[2] +
        "</p><b>" +
        savedStatus[3] +
        "</b></div>" +
        img("EP-UI07", "ep-seal") +
        "</section>"
      );
  }
  return "";
}
function compare(s, wrong) {
  const pair = comparisons[s.pair],
    solved = s.solved.includes(pair.id);
  const cards = pair.cards.map((c, i) => {
    const checked = solved && i === pair.correct;
    return (
      '<button type="button" class="ep-card" data-ep="answer" data-value="' +
      i +
      '" aria-pressed="' +
      checked +
      '">' +
      img(c.asset) +
      "<span><small>" +
      c.label +
      "</small><b>" +
      (checked ? "✓ " : "") +
      c.caption +
      "</b></span></button>"
    );
  });
  const btns = [button("pair-prev", s.pair ? "Cặp trước" : "Đọc lại", true)];
  if (solved && s.pair === 0) btns.push(button("pair-next", "Cặp tiếp theo"));
  if (solved && s.pair === 1)
    btns.push(button("optional", "Thử cặp mở rộng", true));
  if (s.pair >= 1 && s.solved.includes(comparisons[1].id))
    btns.push(button("comparison-done", "Hoàn tất đối chiếu"));
  const feedback = wrong
    ? pair.hint
    : solved
      ? pair.feedback.map((b) => b.line).join(" ")
      : "";
  return (
    '<section class="ep-sheet ep-compare"><header><small>THEN &amp; NOW · ' +
    (pair.optional ? "MỞ RỘNG" : s.pair + 1 + "/2") +
    "</small><h1>" +
    pair.question +
    '</h1></header><div class="ep-cards">' +
    cards.join("") +
    '</div><footer><p role="status">' +
    feedback +
    "</p>" +
    actions(...btns) +
    "</footer></section>"
  );
}
function choice(s) {
  return (
    '<section class="ep-sheet ep-choices"><header><small>THÔNG ĐIỆP CUỐI CÙNG</small><h1>Bạn muốn gửi gắm điều gì?</h1></header><div class="ep-cards">' +
    choices
      .map((c) => {
        const checked = s.selected === c.id;
        return (
          '<button type="button" data-ep="choice" class="ep-card" data-value="' +
          c.id +
          '" aria-pressed="' +
          checked +
          '">' +
          img(c.asset) +
          "<span><b>" +
          (checked ? "✓ " : "") +
          c.title +
          "</b><span>" +
          c.description +
          "</span></span></button>"
        );
      })
      .join("") +
    "</div>" +
    actions(
      button("choice-back", "Đọc lại", true),
      s.selected ? button("confirm", "XÁC NHẬN THÔNG ĐIỆP") : "",
    ) +
    "</section>"
  );
}
export function view(step, s, mode, wrong, count) {
  switch (mode) {
    case "gate":
      return (
        '<section class="ep-sheet ep-gate"><small>THÔNG ĐIỆP CUỐI CÙNG</small><h1>Hồ sơ đang phục dựng</h1><p>Bạn đã mở ' +
        count +
        "/6 nhánh kiến thức. Hoàn thành ba sạp ở sân hội để trở về SPARK cùng hồ sơ của mình.</p>" +
        actions(
          button("return", "Tiếp tục trò chơi"),
          button("preview", "Chơi thử Epilogue", true),
        ) +
        "</section>"
      );
    case "compare":
      return compare(s, wrong);
    case "choice":
      return choice(s);
    case "transmission":
      return (
        img("EP-FX02", "ep-streams") +
        '<section class="ep-transfer">' +
        map() +
        '<div><small>SPARK · KHO TRI THỨC</small><h2>Truyền hồ sơ voi</h2><label for="ep-progress">TRANSMITTING ARCHIVE...</label><progress id="ep-progress" value="0" max="100"></progress><b id="ep-percent">0%</b></div></section>'
      );
    case "ending":
      return (
        '<section class="ep-ending"><small>' +
        endingStatus[0] +
        " · " +
        endingStatus[1] +
        "</small><h1>" +
        endingLines[0] +
        "</h1><p>" +
        endingLines[1] +
        "</p><blockquote>" +
        endingLines[2] +
        "</blockquote><strong>" +
        endingStatus[2] +
        "</strong>" +
        actions(
          button("replay", "Chơi lại Epilogue", true),
          button("restart", "Chơi lại từ đầu"),
          button("finish", "Kết thúc", true),
        ) +
        "</section>"
      );
    case "finished":
      return (
        '<section class="ep-sheet ep-gate"><small>THE LOST ELEPHANT ARCHIVE</small><h1>Thông điệp đã được lưu giữ.</h1><p>Cảm ơn bạn đã đồng hành cùng hành trình về voi Tây Nguyên.</p>' +
        actions(
          button("restart", "Chơi lại từ đầu"),
          button("replay", "Chơi lại Epilogue", true),
        ) +
        "</section>"
      );
    default:
      return dialogue(step);
  }
}
export function preload(step) {
  if (!step) return;
  const ids = [bg(step, step.kind)];
  if (step.kind === "compare")
    ids.push(...comparisons[0].cards.map((c) => c.asset));
  if (step.kind === "choice") ids.push(...choices.map((c) => c.asset));
  const id = [
    "EP-CH01",
    "EP-OB01",
    "EP-CH02",
    "EP-CH02",
    "EP-CH03",
    "EP-OB12",
    "EP-CH04",
  ][step.scene];
  if (id) ids.push(id);
  for (const key of ids) new Image().src = epAssets[key];
}
