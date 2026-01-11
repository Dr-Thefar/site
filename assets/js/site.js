/* =========================================================
   ELVIUM site.js (clean)
   - Reveal on scroll (.reveal -> .is-visible)
   - Active menu highlight (.nav a -> aria-current="page")
   - Mobile drawer (burger) with a11y attributes
   ========================================================= */

(() => {
  "use strict";

  // ---------- Helpers ----------
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const $  = (sel, root = document) => root.querySelector(sel);

  const normalizePath = (path) => {
    // normalize: "/pages/freight.html/" -> "/pages/freight.html"
    // keep "/" as "/"
    if (!path) return "/";
    const p = path.replace(/\/+$/, "");
    return p === "" ? "/" : p;
  };

  // ---------- 1) Reveal ----------
  const revealItems = $$(".reveal");

  if (revealItems.length) {
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) {
              e.target.classList.add("is-visible");
              io.unobserve(e.target);
            }
          }
        },
        { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
      );

      revealItems.forEach((el) => io.observe(el));
    } else {
      revealItems.forEach((el) => el.classList.add("is-visible"));
    }
  }

  // ---------- 2) Active menu ----------
  const currentPath = normalizePath(location.pathname || "/");
  const navLinks = $$(".nav a");

  if (navLinks.length) {
    navLinks.forEach((a) => {
      const rawHref = (a.getAttribute("href") || "").trim();
      if (!rawHref) return;

      let linkPath = "";
      try {
        linkPath = normalizePath(new URL(rawHref, location.origin).pathname);
      } catch {
        return;
      }

      if (linkPath === currentPath) {
        a.setAttribute("aria-current", "page");
      } else {
        a.removeAttribute("aria-current");
      }
    });
  }

  // ---------- 3) Mobile nav drawer ----------
  const burgerBtn = $(".nav-toggle");
  const drawer = $('[data-drawer="nav"]');
  const backdrop = $('[data-backdrop="nav"]');
  const closeBtn = $(".nav-close");

  if (burgerBtn && drawer && backdrop && closeBtn) {
    const open = () => {
      document.body.classList.add("nav-open");
      burgerBtn.setAttribute("aria-expanded", "true");
      drawer.setAttribute("aria-hidden", "false");
      backdrop.setAttribute("aria-hidden", "false");
    };

    const close = () => {
      document.body.classList.remove("nav-open");
      burgerBtn.setAttribute("aria-expanded", "false");
      drawer.setAttribute("aria-hidden", "true");
      backdrop.setAttribute("aria-hidden", "true");
    };

    const toggle = () => {
      document.body.classList.contains("nav-open") ? close() : open();
    };

    burgerBtn.addEventListener("click", toggle);
    closeBtn.addEventListener("click", close);
    backdrop.addEventListener("click", close);

    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") close();
    });

    drawer.addEventListener("click", (e) => {
      // Close drawer when clicking any link inside the drawer
      const a = e.target.closest("a");
      if (a) close();
    });
  }

  // ---------- 4) Reserved: Contact sheet (will be enabled after HTML is added) ----------
  // We will add it later with:
  // - button: [data-contact-open]
  // - close:  [data-contact-close]
  // - backdrop: .contact-backdrop
})();
