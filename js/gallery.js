
document.addEventListener("DOMContentLoaded", () => {
  
  const galleryItems = [
    {
      id: 1,
      title: "Kanpur Memorial Church",
      description:
        "Also known as All Souls' Cathedral, this church was built in 1875 in memory of those who lost their lives in the 1857 rebellion.",
      image: "imagess/Kanpur_Memorial_Church.jpg",
      category: "architecture",
    },
    {
      id: 2,
      title: "Bithoor Ghats",
      description:
        "The sacred ghats along the Ganges River at Bithoor, associated with Hindu mythology and the freedom struggle.",
      image: "imagess/Bithoor_Ghats.jpg",
      category: "heritage",
    },
    {
      id: 3,
      title: "JK Temple",
      description: "A beautiful white marble temple dedicated to Lord Shiva, built by the JK Group in 1960.",
      image: "imagess/JK_Temple.jpg",
      category: "architecture",
    },
    {
      id: 4,
      title: "Allen Forest Zoo",
      description:
        "Established in 1971, it's one of the largest zoos in India and houses various species in natural habitats.",
      image: "imagess/Allen Forest Zoo.jpg",
      category: "nature",
    },
    {
      id: 5,
      title: "Nana Rao Park",
      description:
        "A historical park named after Nana Sahib, a leader of the 1857 rebellion. It was formerly the site of the Bibighar massacre.",
      image: "imagess/Nana Rao Park.jpg",
      category: "heritage",
    },
    {
      id: 6,
      title: "Kanpur Central Railway Station",
      description: "One of the five Central railway stations in India, built during the British colonial period.",
      image: "imagess/Kanpur Central Railway Station.jpg",
      category: "architecture",
    },
    {
      id: 7,
      title: "Phool Bagh",
      description: "A historical garden that houses the Ganesh Shankar Vidyarthi Memorial and other monuments.",
      image: "imagess/Phool Bagh.jpg",
      category: "nature",
    },
    {
      id: 8,
      title: "Sarsaiya Ghat",
      description: "One of the prominent ghats along the Ganges River in Kanpur, known for religious ceremonies.",
      image: "imagess/Sarsaiya Ghat.jpg",
      category: "heritage",
    },
  ]

  const galleryGrid = document.querySelector(".gallery-grid")
  const filterButtons = document.querySelectorAll(".filter-btn")
  const lightbox = document.getElementById("lightbox")
  const lightboxImage = lightbox.querySelector(".lightbox-image img")
  const lightboxTitle = lightbox.querySelector(".lightbox-title")
  const lightboxDescription = lightbox.querySelector(".lightbox-description")
  const closeLightbox = lightbox.querySelector(".close-lightbox")

  let activeCategory = "all"

 
  function renderGallery() {
    galleryGrid.innerHTML = ""

    const filteredItems =
      activeCategory === "all" ? galleryItems : galleryItems.filter((item) => item.category === activeCategory)

    filteredItems.forEach((item) => {
      const galleryItem = document.createElement("div")
      galleryItem.classList.add("gallery-item", "animate")
      galleryItem.dataset.id = item.id

      galleryItem.innerHTML = `
                <div class="gallery-image-container">
                    <img src="${item.image}" alt="${item.title}" class="gallery-image">
                    <div class="gallery-overlay">
                        <h3 class="gallery-title">${item.title}</h3>
                        <p class="gallery-description">${item.description}</p>
                    </div>
                </div>
            `

      galleryGrid.appendChild(galleryItem)

     
      galleryItem.addEventListener("click", () => {
        openLightbox(item)
      })
    })
  }

  
  renderGallery()

  
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      
      filterButtons.forEach((btn) => btn.classList.remove("active"))
      button.classList.add("active")

      
      activeCategory = button.dataset.filter

      
      renderGallery()
    })
  })

  
  function openLightbox(item) {
    lightboxImage.src = item.image
    lightboxTitle.textContent = item.title
    lightboxDescription.textContent = item.description

    lightbox.classList.add("active")
  }

  
  closeLightbox.addEventListener("click", () => {
    lightbox.classList.remove("active")
  })

  
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove("active")
    }
  })

  
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.classList.contains("active")) {
      lightbox.classList.remove("active")
    }
  })
})

