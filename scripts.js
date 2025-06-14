// Wait for DOM content to load
document.addEventListener("DOMContentLoaded", () => {
  // Make all sections visible immediately to fix hidden content issue
  document.querySelectorAll('.section').forEach(section => {
    section.classList.add('visible');
  });

  // Ensure GSAP and ScrollTrigger are loaded
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    console.error("GSAP and/or ScrollTrigger not loaded.");
    return;
  }
  gsap.registerPlugin(ScrollTrigger);

  // Navigation underline animation
  const navLinks = document.querySelectorAll(".nav-link");
  const navUnderline = document.querySelector(".nav-underline");
  const nav = document.getElementById("nav");

  function updateUnderline() {
    const activeLink = document.querySelector(".nav-link.active");
    if (!activeLink) return;

    const navRect = nav.getBoundingClientRect();
    const linkRect = activeLink.getBoundingClientRect();

    gsap.to(navUnderline, {
      duration: 0.4,
      left: linkRect.left - navRect.left,
      width: linkRect.width,
      ease: "power3.out",
    });
  }

  window.addEventListener("load", updateUnderline);
  window.addEventListener("resize", updateUnderline);

  navLinks.forEach(link => {
    link.addEventListener("click", e => {
      navLinks.forEach(l => l.classList.remove("active"));
      e.target.classList.add("active");
      updateUnderline();
    });
  });

  // Scroll-triggered fade and slide for sections
  gsap.utils.toArray(".section").forEach(section => {
    gsap.fromTo(
      section.querySelectorAll("h1, h2, h3, p, img, .card, blockquote, form, .gallery-item"),
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });

  // Parallax effect for home section layers
  gsap.to(".layer-back", {
    yPercent: 20,
    ease: "none",
    scrollTrigger: {
      trigger: ".home-section",
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });
  gsap.to(".layer-front", {
    yPercent: -10,
    ease: "none",
    scrollTrigger: {
      trigger: ".home-section",
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });

  // Sticky header background on scroll
  const header = document.querySelector(".header");
  ScrollTrigger.create({
    start: 50,
    onEnter: () => header.classList.add("scrolled"),
    onLeaveBack: () => header.classList.remove("scrolled"),
  });

  // Contact form submission (placeholder)
  const contactForm = document.getElementById("contactForm");
  const formMessage = document.getElementById("formMessage");
  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      formMessage.textContent = "";
      formMessage.style.color = "";

      const formData = {
        name: contactForm.name.value.trim(),
        email: contactForm.email.value.trim(),
        message: contactForm.message.value.trim(),
      };

      if (!formData.name || !formData.email || !formData.message) {
        formMessage.style.color = "red";
        formMessage.textContent = "Please fill in all fields.";
        return;
      }

      // Example: simulate success after 1s (replace with real backend call)
      setTimeout(() => {
        formMessage.style.color = "green";
        formMessage.textContent = "Thank you for reaching out! We will get back to you shortly.";
        contactForm.reset();
      }, 1000);
    });
  }

  // Custom cursor implementation
  const cursor = document.querySelector(".cursor");
  const follower = document.querySelector(".cursor-follower");
  let mouseX = 0, mouseY = 0;
  let posX = 0, posY = 0;

  if (cursor && follower) {
    // Mouse move event to update target coords
    window.addEventListener("mousemove", e => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + "px";
      cursor.style.top = mouseY + "px";
    });

    // Animate follower to trail the cursor smoothly
    function animateFollower() {
      posX += (mouseX - posX) * 0.15;
      posY += (mouseY - posY) * 0.15;
      follower.style.left = posX + "px";
      follower.style.top = posY + "px";
      requestAnimationFrame(animateFollower);
    }
    animateFollower();

    // Cursor hover effect on interactive elements
    const interactiveElements = document.querySelectorAll("a, button, .nav-link, .gallery-item, .card");
    interactiveElements.forEach(el => {
      el.addEventListener("mouseenter", () => {
        cursor.classList.add("cursor-hover");
        follower.classList.add("cursor-hover");
      });
      el.addEventListener("mouseleave", () => {
        cursor.classList.remove("cursor-hover");
        follower.classList.remove("cursor-hover");
      });
    });
  }

  // Mobile nav toggle
  const navToggle = document.querySelector(".nav-toggle");
  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      nav.classList.toggle("active");
    });
  }
});
