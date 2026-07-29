/*
  City Power Station, Adversary City. Fictional site built for the Adversary Wars simulation.
  No network requests are made from this file. Nothing is transmitted or stored.
*/

(function () {
  "use strict";

  var navToggle = document.getElementById("nav-toggle");
  var primaryNav = document.getElementById("primary-nav");

  if (navToggle && primaryNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = primaryNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    primaryNav.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        primaryNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.focus();
      }
    });
  }

  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  var prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  var revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length && "IntersectionObserver" in window && !prefersReducedMotion) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  var contactForm = document.getElementById("contact-form");
  var confirmPanel = document.getElementById("confirm-panel");

  if (contactForm && confirmPanel) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }

      var reasonInput = contactForm.querySelector('select[name="reason"]');
      var reason = reasonInput ? reasonInput.value : "General Inquiry";

      confirmPanel.textContent =
        "Message received: " + reason +
        ". This is a demonstration form: no data was sent or saved.";
      confirmPanel.classList.add("is-visible");

      contactForm.reset();
    });
  }

  // Report-an-outage tool (outages page). Client-side no-op, matches the CLAUDE.md form rule.
  var outageForm = document.getElementById("outage-report-form");
  var outageConfirm = document.getElementById("outage-report-confirm");

  if (outageForm && outageConfirm) {
    outageForm.addEventListener("submit", function (event) {
      event.preventDefault();

      if (!outageForm.checkValidity()) {
        outageForm.reportValidity();
        return;
      }

      var addressInput = outageForm.querySelector('input[name="outage-address"]');
      var address = addressInput ? addressInput.value : "your address";

      outageConfirm.textContent =
        "Outage reported for " + address +
        ". This is a demonstration form: no report was actually sent or saved. In a real outage, this location would be added to the crew dispatch queue immediately.";
      outageConfirm.classList.add("is-visible");

      outageForm.reset();
    });
  }
})();
