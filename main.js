const selectElement = (s) => document.querySelector(s);
const navLinks = document.querySelectorAll(".nav-link");

const burger = selectElement(".burger-menu-icon");
const navList = selectElement(".nav-list");
const intro = selectElement(".intro");

const tl = gsap.timeline({
  defaults: {
    ease: "power3.out"
  }
});

tl.to(".text", {
  y: "0%",
  duration: 1.1,
  stagger: 0.22
})
.to(".slider", {
  y: "-100%",
  duration: 1.25,
  ease: "power4.inOut",
  delay: 0.35
})
.to(".intro", {
  y: "-100%",
  duration: 1.1,
  ease: "power4.inOut"
}, "-=1.0")
.fromTo("nav",
  { opacity: 0, y: -20 },
  { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" },
  "-=0.65"
)
.fromTo(".main-message",
  { opacity: 0, y: 35, scale: 0.98 },
  { opacity: 1, y: 0, scale: 1, duration: 1.1, ease: "power3.out" },
  "-=0.75"
)
.add(() => {
  if (intro) {
    intro.style.pointerEvents = "none";
    intro.style.visibility = "hidden";
  }
});

if (burger) {
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

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navList.classList.remove("active");
    burger.classList.remove("toggle");

    navLinks.forEach((item) => {
      item.style.animation = "";
    });
  });
});

