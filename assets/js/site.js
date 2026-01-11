/* ===== ELVIUM site.js (clean, bottom-menu + contact) ===== */
(() => {
  const body = document.body;

  /* ---------------------------
     1) Reveal on scroll
     --------------------------- */
  const revealItems = Array.from(document.querySelectorAll(".reveal"));

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

  /* ---------------------------
     2) Active desktop menu link
     --------------------------- */
  const currentPath = (location.pathname || "/").replace(/\/+$/, "");
  const navLinks = Array.from(document.querySelectorAll(".nav a"));

  navLinks.forEach((a) => {
    const href = (a.getAttribute("href") || "").trim();
    if (!href) return;

    const url = new URL(href, location.origin);
    const linkPath = url.pathname.replace(/\/+$/, "");

    if (linkPath === currentPath) a.setAttribute("aria-current", "page");
  });

  /* ---------------------------
     3) Drawer (mobile menu) — opens from bottom button
     --------------------------- */
  const navOpenBtn = document.querySelector("[data-nav-open]"); // bottom "Menu" button
  const drawer = document.querySelector('[data-drawer="nav"]');
  const backdrop = document.querySelector('[data-backdrop="nav"]');
  const drawerCloseBtn = document.querySelector(".nav-close");

  const openDrawer = () => {
    // if contact is open — close it
    body.classList.remove("contact-open");

    body.classList.add("nav-open");
    navOpenBtn?.setAttribute("aria-expanded", "true");
    drawer?.setAttribute("aria-hidden", "false");
    backdrop?.setAttribute("aria-hidden", "false");
  };

  const closeDrawer = () => {
    body.classList.remove("nav-open");
    navOpenBtn?.setAttribute("aria-expanded", "false");
    drawer?.setAttribute("aria-hidden", "true");
    backdrop?.setAttribute("aria-hidden", "true");
  };

  if (navOpenBtn && drawer && backdrop && drawerCloseBtn) {
    // ensure aria defaults
    if (!navOpenBtn.hasAttribute("aria-expanded")) navOpenBtn.setAttribute("aria-expanded", "false");

    navOpenBtn.addEventListener("click", () => {
      body.classList.contains("nav-open") ? closeDrawer() : openDrawer();
    });

    drawerCloseBtn.addEventListener("click", closeDrawer);
    backdrop.addEventListener("click", closeDrawer);

    // Close drawer when clicking a link
    drawer.addEventListener("click", (e) => {
      if (e.target.closest("a")) closeDrawer();
    });
  }

  /* ---------------------------
     4) Bottom nav + Contact sheet
     --------------------------- */
  // If bottom nav exists — add safe padding
  const bottomNav = document.querySelector(".bottom-nav");
  if (bottomNav) body.classList.add("has-bottom-nav");

  const contactOpenBtn = document.querySelector("[data-contact-open]");
  const contactCloseBtn = document.querySelector("[data-contact-close]");
  const contactBackdrop = document.querySelector(".contact-backdrop");

  const openContact = () => {
    // if drawer is open — close it
    closeDrawer();
    body.classList.add("contact-open");
  };

  const closeContact = () => {
    body.classList.remove("contact-open");
  };

  if (contactOpenBtn && contactCloseBtn && contactBackdrop) {
    contactOpenBtn.addEventListener("click", openContact);
    contactCloseBtn.addEventListener("click", closeContact);
    contactBackdrop.addEventListener("click", closeContact);
  }

  /* ---------------------------
     5) Global ESC — closes everything
     --------------------------- */
  window.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    closeContact();
    closeDrawer();
  });
})();
