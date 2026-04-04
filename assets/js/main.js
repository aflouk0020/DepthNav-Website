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

/* --------------------------------------------------
   LIVE INTERACTIVE DEMO
-------------------------------------------------- */
const sceneSelect = document.getElementById("scene-select");
const modelSelect = document.getElementById("model-select");

const demoInputImage = document.getElementById("demo-input-image");
const demoOutputImage = document.getElementById("demo-output-image");

const demoModelType = document.getElementById("demo-model-type");
const demoExpectedBehaviour = document.getElementById("demo-expected-behaviour");
const demoTradeoff = document.getElementById("demo-tradeoff");
const demoInterpretationText = document.getElementById("demo-interpretation-text");

const demoData = {
  indoor: {
    input: "assets/images/demo/indoor/input.png",
    transformer: "assets/images/demo/indoor/transformer.png",
    cnn: "assets/images/demo/indoor/cnn.png",
    transformerText: {
      modelType: "Transformer",
      expected: "Higher structural consistency",
      tradeoff: "Slower, but more reliable",
      interpretation:
        "In this indoor scene, the transformer-based model preserves stronger structural consistency across furniture and room boundaries, producing a clearer representation of spatial layout at the cost of lower inference speed."
    },
    cnnText: {
      modelType: "CNN",
      expected: "Faster but less stable output",
      tradeoff: "Faster, but less reliable",
      interpretation:
        "In this indoor scene, the CNN-based model produces a faster output, but object boundaries and spatial layout appear less stable, reducing interpretability in cluttered environments."
    }
  },

  outdoor: {
    input: "assets/images/demo/outdoor/input.png",
    transformer: "assets/images/demo/outdoor/transformer.png",
    cnn: "assets/images/demo/outdoor/cnn.png",
    transformerText: {
      modelType: "Transformer",
      expected: "Clearer scene geometry",
      tradeoff: "Slower, but more reliable",
      interpretation:
        "In the outdoor example, the transformer-based model better preserves depth layering across the path, vegetation, and distant background, supporting more reliable scene understanding for navigation."
    },
    cnnText: {
      modelType: "CNN",
      expected: "Higher speed with reduced consistency",
      tradeoff: "Faster, but less reliable",
      interpretation:
        "In the outdoor example, the CNN-based model runs faster, but the depth structure is less stable across the scene, making boundary interpretation and distance relationships less dependable."
    }
  },

  obstacle: {
    input: "assets/images/demo/obstacle/input.png",
    transformer: "assets/images/demo/obstacle/transformer.png",
    cnn: "assets/images/demo/obstacle/cnn.png",
    transformerText: {
      modelType: "Transformer",
      expected: "Reliable obstacle separation",
      tradeoff: "Slower, but more reliable",
      interpretation:
        "In the obstacle case, the transformer-based model separates the cone more clearly from the surrounding floor and background, demonstrating stronger structural clarity in a safety-critical scenario."
    },
    cnnText: {
      modelType: "CNN",
      expected: "Noisier obstacle boundaries",
      tradeoff: "Faster, but less reliable",
      interpretation:
        "In the obstacle case, the CNN-based model produces a noisier depth estimate with weaker obstacle boundaries, increasing the risk of misinterpretation in navigation-focused use cases."
    }
  }
};

function updateInteractiveDemo() {
  if (
    !sceneSelect ||
    !modelSelect ||
    !demoInputImage ||
    !demoOutputImage ||
    !demoModelType ||
    !demoExpectedBehaviour ||
    !demoTradeoff ||
    !demoInterpretationText
  ) {
    return;
  }

  const selectedScene = sceneSelect.value;
  const selectedModel = modelSelect.value;

  const scene = demoData[selectedScene];
  const modelInfo =
    selectedModel === "transformer" ? scene.transformerText : scene.cnnText;

  demoInputImage.src = scene.input;
  demoInputImage.alt = `${selectedScene} demo input scene`;

  demoOutputImage.src = scene[selectedModel];
  demoOutputImage.alt = `${selectedScene} ${selectedModel} predicted depth output`;

  demoModelType.textContent = modelInfo.modelType;
  demoExpectedBehaviour.textContent = modelInfo.expected;
  demoTradeoff.textContent = modelInfo.tradeoff;
  demoInterpretationText.textContent = modelInfo.interpretation;
}

if (sceneSelect && modelSelect) {
  sceneSelect.addEventListener("change", updateInteractiveDemo);
  modelSelect.addEventListener("change", updateInteractiveDemo);
  updateInteractiveDemo();
}