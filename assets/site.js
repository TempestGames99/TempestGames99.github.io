// Mozma Games: the little behaviour the pages need. Everything is driven by the HTML,
// so a game page never needs its own script:
//
//   <a class="btn store" href="">            empty href: "coming soon" (or hidden, see below)
//   <div class="trailer" data-youtube="">     a YouTube link or video id: plays here, muted
//   <div class="shots"><a href="big.webp">    screenshots open in a lightbox
//
// <body data-status="coming-soon"> shows empty store buttons and the trailer as "coming
// soon"; on any other page they are hidden until they are filled in.

(function () {
  "use strict";
  var soon = document.body.dataset.status === "coming-soon";

  // ---------- store buttons ----------
  document.querySelectorAll("a.store").forEach(function (a) {
    if ((a.getAttribute("href") || "").trim()) {
      a.target = "_blank";
      a.rel = "noopener";
      return;
    }
    if (!soon) { a.remove(); return; }
    a.removeAttribute("href");
    a.classList.add("soon");
    a.setAttribute("aria-disabled", "true");
    var top = a.querySelector("small");
    if (top) top.textContent = "Coming soon to";
  });
  // ---------- trailer ----------
  document.querySelectorAll(".trailer").forEach(function (box) {
    var id = videoId(box.dataset.youtube || "");
    var section = box.closest("section");
    if (!id) {
      if (!soon && section) section.remove();
      document.querySelectorAll('a[href="#trailer"]').forEach(function (a) { if (!soon) a.remove(); });
      return;
    }
    box.querySelectorAll(".soon-note, .poster").forEach(function (el) { el.remove(); });

    function play() {
      if (box.querySelector("iframe")) return;
      var frame = document.createElement("iframe");
      // Privacy-enhanced mode: YouTube sets no cookies until the viewer interacts.
      frame.src = "https://www.youtube-nocookie.com/embed/" + id +
        "?autoplay=1&mute=1&loop=1&playlist=" + id + "&playsinline=1&rel=0&modestbranding=1";
      frame.title = (box.dataset.title || "Game") + " trailer";
      frame.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
      frame.allowFullscreen = true;
      box.appendChild(frame);
    }
    // Starts once it scrolls into view, so the page itself loads fast.
    if ("IntersectionObserver" in window) {
      var seen = new IntersectionObserver(function (entries) {
        if (entries.some(function (e) { return e.isIntersecting; })) { play(); seen.disconnect(); }
      }, { rootMargin: "200px" });
      seen.observe(box);
    } else {
      play();
    }
  });

  // A row left with no buttons goes too.
  document.querySelectorAll(".actions").forEach(function (row) {
    if (!row.children.length) row.remove();
  });

  function videoId(value) {
    value = value.trim();
    if (!value) return "";
    var m = value.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/);
    if (m) return m[1];
    return /^[\w-]{11}$/.test(value) ? value : "";
  }

  // ---------- screenshot lightbox ----------
  var links = Array.prototype.slice.call(document.querySelectorAll(".shots a"));
  if (!links.length) return;

  var box = document.createElement("div");
  box.className = "lightbox";
  box.setAttribute("role", "dialog");
  box.setAttribute("aria-modal", "true");
  box.innerHTML =
    '<figure style="margin:0"><img alt=""><figcaption></figcaption></figure>' +
    '<button class="close" aria-label="Close">×</button>' +
    '<button class="prev" aria-label="Previous">‹</button>' +
    '<button class="next" aria-label="Next">›</button>';
  document.body.appendChild(box);
  var img = box.querySelector("img"), caption = box.querySelector("figcaption");
  var at = 0, opener = null, startX = null;

  function show(i) {
    at = (i + links.length) % links.length;
    var thumb = links[at].querySelector("img");
    img.src = links[at].href;
    img.alt = thumb ? thumb.alt : "";
    caption.textContent = thumb ? thumb.alt : "";
  }
  function open(i) { opener = document.activeElement; show(i); box.classList.add("open"); box.querySelector(".close").focus(); }
  function close() { box.classList.remove("open"); if (opener) opener.focus(); }

  links.forEach(function (a, i) {
    a.addEventListener("click", function (e) { e.preventDefault(); open(i); });
  });
  box.querySelector(".close").onclick = close;
  box.querySelector(".prev").onclick = function () { show(at - 1); };
  box.querySelector(".next").onclick = function () { show(at + 1); };
  box.addEventListener("click", function (e) { if (e.target === box) close(); });
  document.addEventListener("keydown", function (e) {
    if (!box.classList.contains("open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") show(at - 1);
    if (e.key === "ArrowRight") show(at + 1);
  });
  box.addEventListener("touchstart", function (e) { startX = e.touches[0].clientX; }, { passive: true });
  box.addEventListener("touchend", function (e) {
    if (startX === null) return;
    var dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 50) show(at + (dx < 0 ? 1 : -1));
    startX = null;
  });
})();
