import { pic, control, pad, panel } from "./ui.js?v=spark7";
import { orders, questions, branches } from "./story.js?v=spark7";
// Number of rings in the rope booth (feedback 2026-11-27: 6 rounds).
export const ROPE_THROWS = 6;
export const lanes = [
  { score: 20, count: 2, size: 6, speed: 2.8 },
  { score: 10, count: 3, size: 8, speed: 4 },
  { score: 5, count: 5, size: 10, speed: 5.5 },
  { score: 3, count: 7, size: 12, speed: 7 },
  { score: 1, count: 10, size: 14, speed: 9.5 },
];
export function storehouse(s) {
  const hint = s.found
    ? "Tìm vật đan bằng mây, có khung để chở người hoặc hành lý."
    : "Tìm tấm lót làm từ vỏ cây đập dập, đặt giữa lưng voi và bành.";
  const items = [
    ["p1_03-1", "Cuộn dây"],
    ["p1_02", "Bành đan"],
    ["p1_03-3", "Bát"],
    ["p1_03-4", "Giỏ"],
    ["p1_01", "Tấm lót"],
    ["p1_03-5", "Bầu nước"],
  ];
  return (
    '<div class="field-heading"><small>KHO HIỆN VẬT · ' +
    s.found +
    '/2</small><h1>Trong kho của già làng</h1></div><div class="store-objects">' +
    items
      .map(
        ([id, label], i) =>
          '<button class="store-item obj-' +
          i +
          '" data-do="find" data-value="' +
          id +
          '" aria-label="' +
          label +
          '" ' +
          (s.found && id === "p1_01" ? "disabled" : "") +
          ">" +
          pic(id) +
          "</button>",
      )
      .join("") +
    '</div><div class="field-caption"><small>GIÀ LÀNG</small><p id="find-hint" aria-live="polite">' +
    hint +
    "</p></div>"
  );
}
export function equipment(s) {
  return (
    '<section class="field-paper item-cards"><small>HIỆN VẬT ĐÃ TÌM · ' +
    s.found +
    "/2</small><div>" +
    [
      [
        "p1_01",
        "Dur",
        "Tấm lót bằng vỏ cây đập dập, đặt giữa lưng voi và bành.",
      ],
      [
        "p1_02",
        "Vơng",
        "Bành đan bằng mây, xưa dùng để chở người và hàng hóa.",
      ],
    ]
      .slice(0, s.found)
      .map(
        ([id, n, c]) =>
          "<article>" +
          pic(id) +
          "<section><h2>" +
          n +
          "</h2><p>" +
          c +
          "</p></section></article>",
      )
      .join("") +
    "</div>" +
    control(
      "equipment-next",
      s.found === 1 ? "Tìm vật thứ hai" : "Ghi vào sổ tay",
    ) +
    "</section>"
  );
}
export function rope(s) {
  const rails = lanes
    .map(
      (l, i) =>
        '<div class="rope-lane" style="--lane:' +
        i +
        ";--width:" +
        l.size +
        "%;--speed:" +
        l.speed +
        "s;--travel:" +
        Math.max(100, l.count * 45) +
        "%;--duration:" +
        l.speed * Math.max(1, l.count * 0.45) +
        's">' +
        Array.from(
          { length: l.count },
          (_, j) =>
            '<div class="target-runner" style="--delay:' +
            (-l.speed * Math.max(1, l.count * 0.45) * (j + 0.3)) / l.count +
            's"><div class="rope-target" data-points="' +
            l.score +
            '">' +
            pic("p2_01") +
            "<b>" +
            l.score +
            "</b></div></div>",
        ).join("") +
        "</div>",
    )
    .join("");
  return (
    '<div class="game-stats"><span>Thời gian <b data-clock></b></span><span>Vòng <b id="throws">' +
    (ROPE_THROWS - s.throws) +
    "/" +
    ROPE_THROWS +
    '</b></span><span>Điểm <b id="score">' +
    s.score +
    '</b></span></div><div id="rope-field" tabindex="0" role="application" aria-label="Bãi ném vòng. Chạm để ngắm, chạm lần nữa để ném. Dùng phím mũi tên và Enter trên bàn phím.">' +
    rails +
    '<div class="grass grass-a" data-points="0">' +
    pic("p2_02") +
    '</div><div class="grass grass-b" data-points="0">' +
    pic("p2_02") +
    '</div><span id="aim" hidden>＋</span></div><div class="rope-foot">' +
    pic("p2_03", "rope-handle", "Vòng dây") +
    '<span id="rope-feedback" aria-live="polite">Chạm để ngắm, chạm lần nữa để ném. Bạn cũng có thể kéo rồi thả vòng.</span>' +
    control("throw", "Ném vòng") +
    "</div>"
  );
}
export function quiz(s) {
  const q = questions[s.question],
    id = "q_" + pad(s.question + 1);
  return (
    '<div class="game-stats"><span>Câu <b>' +
    (s.question + 1) +
    "/12</b></span><span>Thời gian <b data-clock></b></span><span>Đúng <b>" +
    s.correct +
    '</b></span></div><div class="quiz-paper"><div class="quiz-board">' +
    pic("p3_01", "quiz-track") +
    pic("p3_02", "quiz-token") +
    "</div><h1>" +
    q[0] +
    '</h1><div class="answers">' +
    [0, 1]
      .map(
        (i) =>
          '<button data-do="answer" data-value="' +
          i +
          '"><div class="answer-art" style="--half:' +
          (s.question === 11 ? 1 - i : i) * 100 +
          "%;background-image:url(" +
          new URL("../../assets/field/" + id + ".webp", import.meta.url).href +
          ')"></div><span><b>' +
          "AB"[i] +
          "</b>" +
          q[i + 1] +
          "</span></button>",
      )
      .join("") +
    "</div></div>"
  );
}
export function shop(s) {
  const o = orders[s.order];
  const id = (n) => "p4_" + pad(1 + s.order * 3 + n);
  if (s.mode === "request")
    return (
      pic("ch_10-" + (s.order + 1), "customer-intro") +
      panel(
        "KHÁCH " + (s.order + 1) + " / 3",
        o.item,
        o.request,
        control("choose", "Xem ba mẫu"),
      )
    );
  if (s.mode === "explain") {
    const late = s.choice === -1,
      n = late ? s.order : s.choice,
      correct = n === s.order;
    return (
      '<div class="owner-display">' +
      pic(id(n), "chosen-product") +
      pic("ch_09", "owner") +
      '</div><section class="field-paper owner-copy"><small>CHỦ SẠP · ĐƠN ' +
      (s.order + 1) +
      "/3</small><h2>" +
      (late
        ? "Đã hết giờ chọn"
        : correct
          ? "Đúng ý khách rồi!"
          : "Xem kỹ mẫu này nhé") +
      "</h2><p>" +
      (late ? "Mẫu khách tìm là " + "ABC"[s.order] + ". " : "") +
      o.replies[n] +
      "</p>" +
      (correct && !late
        ? '<p class="customer-thanks">“' + o.thanks + "”</p>"
        : "") +
      control(
        "explain-next",
        correct
          ? s.order === 2
            ? "Xem kết quả"
            : "Đón khách tiếp theo"
          : "Chọn mẫu khác",
      ) +
      "</section>"
    );
  }
  return (
    '<div class="game-stats"><span>Đơn <b>' +
    (s.order + 1) +
    '/3</b></span><span>Thời gian chọn <b data-clock></b></span></div><div class="products">' +
    o.labels
      .map(
        (label, n) =>
          '<button aria-label="' +
          "ABC"[n] +
          ". " +
          label +
          '" data-do="product" data-value="' +
          n +
          '">' +
          pic(id(n)) +
          "<b>" +
          "ABC"[n] +
          "</b></button>",
      )
      .join("") +
    '</div><div class="field-caption order-caption">' +
    pic("ch_10-" + (s.order + 1)) +
    "<div><small>KHÁCH " +
    (s.order + 1) +
    "</small><p>" +
    o.request +
    "</p></div></div>"
  );
}
export function results(s) {
  let heading,
    stats,
    note = branches[s.booth + 3][1];
  if (s.booth === 0) {
    heading = "Hoàn thành lượt ném";
    stats =
      s.score + " điểm · Đã ném " + s.throws + "/" + ROPE_THROWS + " vòng";
  }
  if (s.booth === 1) {
    const pass = s.correct / 12 > 0.2;
    heading = pass ? "Bạn đã vượt qua thử thách!" : "Chưa vượt mức 20%";
    stats =
      s.correct + "/12 câu đúng · " + ((s.correct / 12) * 100).toFixed(1) + "%";
    if (!pass)
      note =
        "Cần ít nhất 3 câu đúng để mở trang Văn hóa. Bạn có thể thử lại hoặc ghé sạp khác trước.";
  }
  if (s.booth === 2) {
    heading = "Gian hàng đã hoàn thành";
    stats = "Đúng yêu cầu " + s.matched + "/3 · Hết giờ " + s.expired;
  }
  return panel(
    stats,
    heading,
    note,
    (s.booth === 1 && s.correct < 3 ? control("replay", "Chơi lại") : "") +
      control("hub", "Về sân hội"),
  );
}
