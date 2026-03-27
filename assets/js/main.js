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