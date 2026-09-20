/* ==========================================================================
   Record Robotics — home page recreation
   Three small jobs: the burger menu, the scroll reveal, and naming the
   page a visitor was headed to on the coming-soon stub.
   ========================================================================== */

(function () {
  "use strict";

  /* Signals to the stylesheet that JS is running, so the reveal animation
     is safe to arm. Without this, a JS failure would leave content hidden. */
  document.documentElement.classList.remove("no-js");

  /* --- Burger menu -------------------------------------------------------- */

  function initBurger() {
    var header = document.querySelector(".site-header");
    var burger = document.querySelector(".burger");
    if (!header || !burger) return;

    burger.addEventListener("click", function () {
      var open = header.classList.toggle("is-open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });

    /* Close on Escape, and whenever we grow back past the breakpoint. */
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && header.classList.contains("is-open")) {
        header.classList.remove("is-open");
        burger.setAttribute("aria-expanded", "false");
        burger.focus();
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 800) {
        header.classList.remove("is-open");
        burger.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* --- Scroll reveal ------------------------------------------------------ */

  function initReveal() {
    var items = document.querySelectorAll(".reveal");
    if (!items.length) return;

    /* Older browsers, or reduced-motion users, just get the content. */
    var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !("IntersectionObserver" in window)) {
      for (var i = 0; i < items.length; i++) {
        items[i].classList.add("is-visible");
      }
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target); /* reveal once, then stop watching */
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 }
    );

    items.forEach(function (item) {
      observer.observe(item);
    });
  }

  /* --- Coming-soon stub --------------------------------------------------- */

  /* Nav links point at coming-soon.html#about-us and friends. The hash is used
     rather than a query string because it is reliable on file:// URLs. */
  var PAGE_NAMES = {
    "about-us": "About Us",
    "mission-statement": "Mission Statement",
    outreach: "Outreach",
    competitions: "Competitions",
    media: "Media",
    newsletters: "Newsletters",
    gallery: "Gallery",
    join: "Join",
    donate: "Donate"
  };

  function initStub() {
    var target = document.querySelector("[data-stub-name]");
    if (!target) return;

    function render() {
      var slug = window.location.hash.replace(/^#/, "");
      target.textContent = PAGE_NAMES[slug] || "This page";
      document.title = (PAGE_NAMES[slug] || "Coming Soon") + " — Record Robotics";
    }

    render();
    /* Stub-to-stub clicks only change the hash, so re-render on that. */
    window.addEventListener("hashchange", render);
  }

  /* --- Go ----------------------------------------------------------------- */

  function init() {
    initBurger();
    initReveal();
    initStub();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
