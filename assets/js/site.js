// Active menu + reveal (one time for all pages)
(function () {
  // 1) Reveal
  const items = Array.from(document.querySelectorAll('.reveal'));
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      }
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    items.forEach(el => io.observe(el));
  } else {
    items.forEach(el => el.classList.add('is-visible'));
  }

  // 2) Active menu
  const currentPath = (location.pathname || "/").replace(/\/+$/, "");
  const navLinks = Array.from(document.querySelectorAll('.nav a'));
  navLinks.forEach(a => {
    const href = (a.getAttribute('href') || "").trim();
    if (!href) return;

    // Normalize relative links
    const url = new URL(href, location.origin);
    const linkPath = url.pathname.replace(/\/+$/, "");

    if (linkPath === currentPath) {
      a.setAttribute('aria-current', 'page');
    }
  });
})();

(() => {
  const btn = document.querySelector(".nav-toggle");
  const drawer = document.querySelector('[data-drawer="nav"]');
  const backdrop = document.querySelector('[data-backdrop="nav"]');
  const closeBtn = document.querySelector(".nav-close");

  if (!btn || !drawer || !backdrop || !closeBtn) return;

  const open = () => {
    document.body.classList.add("nav-open");
    btn.setAttribute("aria-expanded", "true");
    drawer.setAttribute("aria-hidden", "false");
    backdrop.setAttribute("aria-hidden", "false");
  };

  const close = () => {
    document.body.classList.remove("nav-open");
    btn.setAttribute("aria-expanded", "false");
    drawer.setAttribute("aria-hidden", "true");
    backdrop.setAttribute("aria-hidden", "true");
  };

  btn.addEventListener("click", () => {
    document.body.classList.contains("nav-open") ? close() : open();
  });

  closeBtn.addEventListener("click", close);
  backdrop.addEventListener("click", close);

  // ESC to close
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });

  // Close drawer when clicking a link
  drawer.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (a) close();
  });
})();
