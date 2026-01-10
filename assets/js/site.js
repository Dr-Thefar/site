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
