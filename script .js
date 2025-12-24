// ===== Smooth Scroll & Navigation =====
document.addEventListener("DOMContentLoaded", () => {
  // Navbar scroll effect
  const navbar = document.querySelector(".navbar")
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }
  })

  // Mobile menu toggle
  const hamburger = document.querySelector(".hamburger")
  const navLinks = document.querySelector(".nav-links")

  hamburger?.addEventListener("click", () => {
    navLinks?.classList.toggle("active")
  })

  // Close menu on link click
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks?.classList.remove("active")
    })
  })

  // Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal")
      }
    })
  }, observerOptions)

  // Observe all animated elements
  document.querySelectorAll(".step-card, .feature-card").forEach((el) => {
    observer.observe(el)
  })

  // CTA Button smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href")
      if (href !== "#" && document.querySelector(href)) {
        e.preventDefault()
        document.querySelector(href).scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  // Performance optimization: Lazy load images
  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target
          img.src = img.dataset.src
          img.classList.add("loaded")
          imageObserver.unobserve(img)
        }
      })
    })

    document.querySelectorAll("img[data-src]").forEach((img) => {
      imageObserver.observe(img)
    })
  }

  // Accessibility: Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navLinks?.classList.contains("active")) {
      navLinks.classList.remove("active")
    }
  })
})

// ===== Throttle Function for Scroll Events =====
function throttle(func, limit) {
  let inThrottle
  return function () {
    const args = arguments
    
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// ===== Analytics Tracking (Optional) =====
window.addEventListener(
  "scroll",
  throttle(() => {
    const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
    // Could send to analytics service
  }, 500),
)
