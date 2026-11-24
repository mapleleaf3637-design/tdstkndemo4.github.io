// Phone full-screen support.
//
// Android Chrome / Samsung Internet / Firefox: the Fullscreen API hides the
// browser's address bar and navigation bar, and (only while full screen)
// the screen can be locked to landscape.
//
// iPhone Safari does not allow web pages to go full screen. There the button
// explains how to "Add to Home Screen"; the manifest + apple meta tags in
// index.html then open the game without any browser bars.
const root = document.documentElement;
const canRequest = !!(root.requestFullscreen || root.webkitRequestFullscreen);
const current = () =>
  document.fullscreenElement || document.webkitFullscreenElement || null;
const installed = () =>
  matchMedia("(display-mode: fullscreen), (display-mode: standalone)")
    .matches || navigator.standalone === true;
const touchDevice = () => matchMedia("(pointer: coarse)").matches;

async function enter() {
  try {
    const request = root.requestFullscreen
      ? root.requestFullscreen({ navigationUI: "hide" })
      : root.webkitRequestFullscreen();
    // Some in-app browsers (Zalo, Facebook, Messenger…) never settle the
    // request. Give up after 1.5 s so the player gets the help dialog.
    await Promise.race([
      request,
      new Promise((resolve) => setTimeout(resolve, 1500)),
    ]);
  } catch {
    return false;
  }
  if (!current()) return false;
  try {
    await screen.orientation?.lock?.("landscape");
  } catch {
    /* Orientation lock is optional; the rotate prompt still works. */
  }
  return true;
}

function exit() {
  try {
    screen.orientation?.unlock?.();
  } catch {}
  (document.exitFullscreen || document.webkitExitFullscreen)?.call(document);
}

export function setupFullscreen({ button, rotateButton, help, changed }) {
  const sync = () => {
    const on = !!current();
    // Only offer the control where it helps: phones/tablets, or any browser
    // that supports the API. Hidden once the game runs as a home-screen app.
    const show = !installed() && (canRequest || touchDevice());
    for (const b of [button, rotateButton]) {
      if (!b) continue;
      b.hidden = !show;
      b.setAttribute("aria-pressed", String(on));
    }
    if (button)
      button.setAttribute(
        "aria-label",
        on ? "Thoát toàn màn hình" : "Toàn màn hình",
      );
    if (rotateButton)
      rotateButton.textContent = on
        ? "Thoát toàn màn hình"
        : "Toàn màn hình (ẩn thanh trình duyệt)";
    document.body.classList.toggle("is-fullscreen", on);
  };

  const toggle = async (event) => {
    event.stopPropagation();
    if (current()) return exit();
    if (canRequest && (await enter())) return;
    help("Chơi toàn màn hình", [
      "Trình duyệt này không cho trang web tự ẩn thanh địa chỉ.",
      "Trên iPhone/iPad: bấm nút Chia sẻ (ô vuông có mũi tên) → “Thêm vào MH chính”, rồi mở trò chơi từ biểu tượng mới trên màn hình chính.",
      "Trên Android: mở menu ⋮ của trình duyệt → “Thêm vào màn hình chính” hoặc “Cài đặt ứng dụng”.",
    ]);
  };

  button?.addEventListener("click", toggle);
  rotateButton?.addEventListener("click", toggle);
  document.addEventListener("fullscreenchange", () => {
    sync();
    changed?.();
  });
  document.addEventListener("webkitfullscreenchange", () => {
    sync();
    changed?.();
  });
  sync();
}
