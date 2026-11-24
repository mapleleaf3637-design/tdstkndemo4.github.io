import { assetUrl, media, photos } from "./media.js?v=spark";
import { branches, branchIds } from "./story.js?v=spark";
export const pad = (n) => String(n).padStart(2, "0");
export const escapeText = (s) =>
  String(s).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
export function pic(id, cls = "", alt = "") {
  return (
    '<img draggable="false" class="' +
    cls +
    '" src="' +
    assetUrl(id) +
    '" alt="' +
    escapeText(alt) +
    '">'
  );
}
export function control(action, label, cls = "field-primary", value = "") {
  return (
    '<button type="button" class="' +
    cls +
    '" data-do="' +
    action +
    '" data-value="' +
    value +
    '">' +
    label +
    "</button>"
  );
}
export function panel(kicker, title, copy, actions) {
  return (
    '<section class="field-paper result-paper"><small>' +
    kicker +
    "</small><h1>" +
    title +
    "</h1><p>" +
    copy +
    '</p><div class="actions">' +
    actions +
    "</div></section>"
  );
}
export function notebook(s) {
  return (
    '<div class="book-content"><div class="book-map">' +
    pic("ui_01", "map-base") +
    branchIds
      .map(
        (id, i) =>
          '<span class="book-node n' +
          i +
          (s.unlocked.includes(id) ? " earned" : "") +
          '">' +
          pic("ui_" + pad(i + 2), "", branches[i][0]) +
          "</span>",
      )
      .join("") +
    '</div><div class="book-notes">' +
    branches
      .map(
        ([title, summary], i) =>
          "<details " +
          (s.unlocked.includes(branchIds[i]) ? "" : 'class="locked"') +
          "><summary>" +
          (s.unlocked.includes(branchIds[i]) ? "✓ " : "○ ") +
          title +
          "</summary><p>" +
          (s.unlocked.includes(branchIds[i])
            ? summary
            : "Trang này sẽ mở khi bạn hoàn thành phần nghiên cứu tương ứng.") +
          "</p></details>",
      )
      .join("") +
    "</div></div>"
  );
}
export function photoPage(ids, index) {
  const id = ids[index],
    p = photos[id];
  return (
    '<figure class="field-photo">' +
    pic(id, "", media[id].title) +
    "<figcaption>" +
    escapeText(p.caption) +
    '</figcaption></figure><div class="photo-meta">' +
    escapeText(p.credit) +
    ' · <a target="_blank" rel="noopener" href="' +
    escapeText(p.url) +
    '">Ảnh gốc</a> · <a target="_blank" rel="noopener" href="' +
    escapeText(p.licenseUrl) +
    '">' +
    escapeText(p.license) +
    "</a> · Bản WebP thu nhỏ</div>" +
    (ids.length > 1
      ? '<div class="photo-pages">' +
        control("photo-prev", "‹", "secondary") +
        "<span>" +
        (index + 1) +
        " / " +
        ids.length +
        "</span>" +
        control("photo-next", "›", "secondary") +
        "</div>"
      : "")
  );
}
