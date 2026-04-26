/* ============================================================
   NEUROPSICOPEDAGOGA — script.js
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  /* ── Header scroll ─────────────────────────────────────── */
  const header = document.querySelector(".header");
  const onScroll = () => {
    header?.classList.toggle("scrolled", window.scrollY > 30);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ── Mobile menu ───────────────────────────────────────── */
  const toggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  toggle?.addEventListener("click", () => {
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!expanded));
    navLinks?.classList.toggle("open", !expanded);
    document.body.style.overflow = expanded ? "" : "hidden";
  });

  // Fecha ao clicar em link
  navLinks?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      toggle?.setAttribute("aria-expanded", "false");
      navLinks.classList.remove("open");
      document.body.style.overflow = "";
    });
  });

  // Fecha ao clicar fora
  document.addEventListener("click", (e) => {
    if (!header?.contains(e.target)) {
      toggle?.setAttribute("aria-expanded", "false");
      navLinks?.classList.remove("open");
      document.body.style.overflow = "";
    }
  });

  /* ── Active nav link ───────────────────────────────────── */
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === currentPath || (currentPath === "" && href === "index.html")) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });

  /* ── FAQ accordion ─────────────────────────────────────── */
  document.querySelectorAll(".faq-question").forEach((btn) => {
    btn.addEventListener("click", () => {
      const expanded = btn.getAttribute("aria-expanded") === "true";
      // Fecha todos
      document.querySelectorAll(".faq-question").forEach((b) => {
        b.setAttribute("aria-expanded", "false");
        b.nextElementSibling?.classList.remove("open");
      });
      // Abre o clicado (se estava fechado)
      if (!expanded) {
        btn.setAttribute("aria-expanded", "true");
        btn.nextElementSibling?.classList.add("open");
      }
    });
  });

  /* ── Scroll reveal ─────────────────────────────────────── */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger para grupos
          const siblings =
            entry.target.parentElement?.querySelectorAll(".reveal");
          let delay = 0;
          siblings?.forEach((el, idx) => {
            if (el === entry.target) delay = idx * 80;
          });
          setTimeout(() => entry.target.classList.add("visible"), delay);
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
  );

  document
    .querySelectorAll(".reveal")
    .forEach((el) => revealObserver.observe(el));

  /* ── Smooth scroll para âncoras ────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const target = document.querySelector(anchor.getAttribute("href"));
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: "smooth" });
      }
    });
  });
});
