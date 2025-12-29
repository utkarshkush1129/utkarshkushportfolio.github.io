// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Mobile nav toggle
const toggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".nav-links");

toggle?.addEventListener("click", () => {
  const isOpen = links.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(isOpen));
});

// Close nav when clicking a link (mobile)
links?.querySelectorAll("a").forEach(a => {
  a.addEventListener("click", () => {
    if (links.classList.contains("open")) {
      links.classList.remove("open");
      toggle?.setAttribute("aria-expanded", "false");
    }
  });
});

// Reveal on scroll
const revealEls = document.querySelectorAll(".reveal");
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: 0.12 });

revealEls.forEach(el => io.observe(el));

// Typewriter effect
const typeEl = document.querySelector(".typewriter");
if (typeEl) {
  const phrases = JSON.parse(typeEl.getAttribute("data-phrases") || "[]");
  let p = 0, i = 0, deleting = false;

  const tick = () => {
    const current = phrases[p] || "";
    const shown = deleting ? current.slice(0, i--) : current.slice(0, i++);
    typeEl.textContent = shown;

    // Speed settings
    const base = deleting ? 35 : 55;
    const jitter = Math.floor(Math.random() * 25);
    let delay = base + jitter;

    // Pause at end / start
    if (!deleting && i > current.length) {
      deleting = true;
      delay = 900; // pause at full phrase
    } else if (deleting && i < 0) {
      deleting = false;
      p = (p + 1) % phrases.length;
      i = 0;
      delay = 250; // pause before new phrase
    }

    setTimeout(tick, delay);
  };

  tick();
}

const form = document.getElementById("contactForm");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const success = form.querySelector(".form-success");
    const error = form.querySelector(".form-error");
    success.hidden = true;
    error.hidden = true;

    const btn = form.querySelector("button");
    const original = btn.textContent;
    btn.textContent = "Sending...";
    btn.disabled = true;

    try {
      const res = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      });

      if (res.ok) {
        form.reset();
        success.hidden = false;
      } else {
        error.hidden = false;
      }
    } catch {
      error.hidden = false;
    } finally {
      btn.textContent = original;
      btn.disabled = false;
    }
  });
}


