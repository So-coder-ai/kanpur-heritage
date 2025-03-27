
document.addEventListener("DOMContentLoaded", () => {
  
  const timelineEvents = [
    {
      id: 1,
      year: 1778,
      title: "British Establishment",
      description: "The British East India Company established a trading post and military station in Kanpur.",
    },
    {
      id: 2,
      year: 1857,
      title: "First War of Independence",
      description:
        "Kanpur became a major center of the Indian Rebellion of 1857, with Nana Sahib leading the revolt against British rule.",
    },
    {
      id: 3,
      year: 1861,
      title: "Industrial Growth Begins",
      description:
        "The first textile mill was established in Kanpur, marking the beginning of its industrial development.",
    },
    {
      id: 4,
      year: 1919,
      title: "Kanpur Bolshevik Conspiracy",
      description:
        "Revolutionary activities against British rule intensified with the formation of the Kanpur Bolshevik Conspiracy.",
    },
    {
      id: 5,
      year: 1930,
      title: "Civil Disobedience Movement",
      description: "Kanpur played a significant role in the Civil Disobedience Movement led by Mahatma Gandhi.",
    },
    {
      id: 6,
      year: 1947,
      title: "Independence",
      description:
        "Kanpur celebrated India's independence from British rule and continued to develop as an industrial hub.",
    },
    {
      id: 7,
      year: 1960,
      title: "Educational Expansion",
      description: "Establishment of IIT Kanpur, one of India's premier technical institutions.",
    },
    {
      id: 8,
      year: 2000,
      title: "Modern Development",
      description:
        "Kanpur began transforming from an industrial city to a modern urban center with improved infrastructure.",
    },
  ]

  const timelineContainer = document.querySelector(".timeline-container")

  
  timelineEvents.forEach((event, index) => {
    const timelineEvent = document.createElement("div")
    timelineEvent.classList.add("timeline-event")
    timelineEvent.classList.add("animate")

    if (index === 0) {
      timelineEvent.classList.add("active")
    }

    timelineEvent.innerHTML = `
            <div class="timeline-card">
                <div class="timeline-year">${event.year}</div>
                <div class="timeline-title">${event.title}</div>
                <div class="timeline-description">${event.description}</div>
            </div>
        `

    timelineContainer.appendChild(timelineEvent)

    
    timelineEvent.addEventListener("click", () => {
      document.querySelectorAll(".timeline-event").forEach((el) => {
        el.classList.remove("active")
      })
      timelineEvent.classList.add("active")
    })
  })

  
  window.addEventListener("scroll", () => {
    if (!timelineContainer) return

    const containerTop = timelineContainer.getBoundingClientRect().top
    const containerHeight = timelineContainer.offsetHeight
    const viewportHeight = window.innerHeight

   
    const scrollPercentage = Math.max(
      0,
      Math.min(1, (viewportHeight - containerTop) / (containerHeight + viewportHeight)),
    )

    const eventIndex = Math.min(timelineEvents.length - 1, Math.floor(scrollPercentage * timelineEvents.length))

   
    const timelineEventElements = document.querySelectorAll(".timeline-event")
    timelineEventElements.forEach((el, i) => {
      if (i === eventIndex) {
        el.classList.add("active")
      } else {
        el.classList.remove("active")
      }
    })
  })
})

