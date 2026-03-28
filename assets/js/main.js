const selectElement = (selector) => document.querySelector(selector);
const navLinks = document.querySelectorAll(".nav-link");

const burger = selectElement(".burger-menu-icon");
const navList = selectElement(".nav-list");
const intro = selectElement(".intro");
const slider = selectElement(".slider");
const nav = selectElement("nav");
const mainMessage = selectElement(".main-message");
const introText = document.querySelectorAll(".text");

/* --------------------------------------------------
   ACTIVE NAV LINK
-------------------------------------------------- */
const currentPage = window.location.pathname.split("/").pop() || "index.html";

navLinks.forEach((link) => {
  const href = link.getAttribute("href");

  if (href === currentPage) {
    link.classList.add("active-link");
  }

  if (currentPage === "index.html" && href === "index.html") {
    link.classList.add("active-link");
  }
});

/* --------------------------------------------------
   HOMEPAGE INTRO ANIMATION
   Only runs if homepage hero elements exist
-------------------------------------------------- */
if (intro && slider && nav && mainMessage && introText.length > 0) {
  const tl = gsap.timeline({
    defaults: {
      ease: "power3.out",
    },
  });

  tl.to(".text", {
    y: "0%",
    duration: 1.1,
    stagger: 0.22,
  })
    .to(".slider", {
      y: "-100%",
      duration: 1.25,
      ease: "power4.inOut",
      delay: 0.35,
    })
    .to(
      ".intro",
      {
        y: "-100%",
        duration: 1.1,
        ease: "power4.inOut",
      },
      "-=1.0"
    )
    .fromTo(
      "nav",
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" },
      "-=0.65"
    )
    .fromTo(
      ".main-message",
      { opacity: 0, y: 35, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 1.1, ease: "power3.out" },
      "-=0.75"
    )
    .add(() => {
      intro.style.pointerEvents = "none";
      intro.style.visibility = "hidden";
    });
} else if (nav) {
  // On inner pages, just show the nav immediately
  gsap.set("nav", { opacity: 1, y: 0 });
}

/* --------------------------------------------------
   BURGER MENU
-------------------------------------------------- */
if (burger && navList) {
  burger.addEventListener("click", () => {
    navList.classList.toggle("active");
    burger.classList.toggle("toggle");

    navLinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = "";
      } else {
        link.style.animation = `navLinkAnimate 0.45s ease forwards ${index / 8 + 0.2}s`;
      }
    });
  });
}

/* --------------------------------------------------
   CLOSE MENU AFTER CLICK
-------------------------------------------------- */
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (navList) {
      navList.classList.remove("active");
    }

    if (burger) {
      burger.classList.remove("toggle");
    }

    navLinks.forEach((item) => {
      item.style.animation = "";
    });
  });
});

/* --------------------------------------------------
   PAGE PROGRESS BAR
-------------------------------------------------- */
const progressBar = document.querySelector(".page-progress-bar");

const updateProgressBar = () => {
  if (!progressBar) return;

  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

  progressBar.style.width = `${progress}%`;
};

window.addEventListener("scroll", updateProgressBar);
window.addEventListener("load", updateProgressBar);

/* --------------------------------------------------
   SCROLL REVEAL
-------------------------------------------------- */
const revealTargets = document.querySelectorAll(`
  .highlight,
  .lock-item,
  .plan-card,
  .branch-card,
  .result-summary-card,
  .chart-card,
  .resource-card,
  .team-card,
  .supervisor-card,
  .pipeline-stage,
  .pipeline-step,
  .metric-card,
  .methodology-figure-card,
  .plans-summary-strip,
  .plans-intro-card,
  .master-locks-card,
  .inheritance-structure-card,
  .protocol-note-card,
  .results-insight-block,
  .results-table-card,
  .results-conclusion-card,
  .poster-preview-card,
  .team-intro-card
`);

revealTargets.forEach((item, index) => {
  item.classList.add("reveal-on-scroll");
  item.classList.add(`reveal-delay-${(index % 4) + 1}`);
});

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,
    rootMargin: "0px 0px -40px 0px",
  }
);

revealTargets.forEach((item) => revealObserver.observe(item));


/* --------------------------------------------------
   HERO COUNTER ANIMATION
-------------------------------------------------- */
const animateCounter = (element) => {
  const target = parseInt(element.dataset.target, 10);
  const duration = 1200;
  const start = 0;
  const startTime = performance.now();

  const updateCounter = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    const value = Math.floor(start + (target - start) * progress);
    element.textContent = value;

    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target;
    }
  };

  requestAnimationFrame(updateCounter);
};

const heroCounters = document.querySelectorAll(".hero-stat-number");

if (heroCounters.length > 0) {
  const counterObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.6 }
  );

  heroCounters.forEach((counter) => counterObserver.observe(counter));
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute('href'))
      .scrollIntoView({
        behavior: 'smooth'
      });
  });
});