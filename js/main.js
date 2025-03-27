
const header = document.getElementById("header")
const themeToggle = document.getElementById("theme-toggle")
const hamburger = document.querySelector(".hamburger")
const mobileNav = document.querySelector(".mobile-nav")
const mobileNavLinks = document.querySelectorAll(".mobile-nav a")
const currentYearEl = document.getElementById("current-year")


currentYearEl.textContent = new Date().getFullYear()


window.addEventListener("scroll", () => {
  if (window.scrollY > 10) {
    header.classList.add("scrolled")
  } else {
    header.classList.remove("scrolled")
  }
})


themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode")

 
  const isDarkMode = document.body.classList.contains("dark-mode")
  localStorage.setItem("darkMode", isDarkMode)
})


const savedTheme = localStorage.getItem("darkMode")
if (savedTheme === "true") {
  document.body.classList.add("dark-mode")
}


hamburger.addEventListener("click", () => {
  mobileNav.classList.toggle("active")

  
  const spans = hamburger.querySelectorAll("span")
  if (mobileNav.classList.contains("active")) {
    spans[0].style.transform = "rotate(45deg) translate(5px, 5px)"
    spans[1].style.opacity = "0"
    spans[2].style.transform = "rotate(-45deg) translate(5px, -5px)"
  } else {
    spans[0].style.transform = "none"
    spans[1].style.opacity = "1"
    spans[2].style.transform = "none"
  }
})


mobileNavLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileNav.classList.remove("active")

   
    const spans = hamburger.querySelectorAll("span")
    spans[0].style.transform = "none"
    spans[1].style.opacity = "1"
    spans[2].style.transform = "none"
  })
})


document.addEventListener("click", (e) => {
  if (!e.target.closest(".mobile-nav") && !e.target.closest(".hamburger")) {
    if (mobileNav.classList.contains("active")) {
      mobileNav.classList.remove("active")

      
      const spans = hamburger.querySelectorAll("span")
      spans[0].style.transform = "none"
      spans[1].style.opacity = "1"
      spans[2].style.transform = "none"
    }
  }
})


document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()

    const targetId = this.getAttribute("href")
    const targetElement = document.querySelector(targetId)

    if (targetElement) {
      const headerOffset = 70
      const elementPosition = targetElement.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  })
})


const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate-in")
    }
  })
}, observerOptions)


document.addEventListener("DOMContentLoaded", () => {
  
  document.querySelectorAll(".section-title").forEach((el) => {
    el.classList.add("opacity-0", "translate-y-10")
    observer.observe(el)
  })

  
  document.querySelectorAll(".section").forEach((section) => {
    const elements = section.querySelectorAll(".animate")
    elements.forEach((el, index) => {
      el.classList.add("opacity-0", "translate-y-10")
      el.style.transitionDelay = `${index * 0.1}s`
      observer.observe(el)
    })
  })
})


document.querySelectorAll(".section").forEach((section) => {
  section.addEventListener("animationend", () => {
    section.classList.add("animate-in")
  })
})


document.documentElement.style.setProperty("--animate-duration", "0.8s")

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    document.body.classList.add("loaded")
  }, 100)
})

