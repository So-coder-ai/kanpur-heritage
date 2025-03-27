import * as THREE from "three"
import gsap from "gsap"

// Hero Section Three.js Animation
document.addEventListener("DOMContentLoaded", () => {
  // Scene setup
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(window.devicePixelRatio)

  const heroCanvas = document.getElementById("hero-canvas")
  heroCanvas.appendChild(renderer.domElement)

  // Create a sphere geometry for the main object
  const geometry = new THREE.SphereGeometry(2, 64, 64)

  // Create texture loader
  const textureLoader = new THREE.TextureLoader()
  const texture = textureLoader.load("https://placeholder.pics/svg/1024/DEDEDE/555555/Kanpur")

  // Create material with the texture
  const material = new THREE.MeshStandardMaterial({
    map: texture,
    roughness: 0.5,
    metalness: 0.2,
  })

  // Create mesh
  const sphere = new THREE.Mesh(geometry, material)
  scene.add(sphere)

  // Add lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
  scene.add(ambientLight)

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
  directionalLight.position.set(10, 10, 5)
  scene.add(directionalLight)

  // Position camera
  camera.position.z = 5

  // Add stars to the background
  const starGeometry = new THREE.BufferGeometry()
  const starMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.1,
  })

  const starVertices = []
  for (let i = 0; i < 1000; i++) {
    const x = (Math.random() - 0.5) * 100
    const y = (Math.random() - 0.5) * 100
    const z = (Math.random() - 0.5) * 100
    starVertices.push(x, y, z)
  }

  starGeometry.setAttribute("position", new THREE.Float32BufferAttribute(starVertices, 3))
  const stars = new THREE.Points(starGeometry, starMaterial)
  scene.add(stars)

  // Animation loop
  function animate() {
    requestAnimationFrame(animate)

    // Rotate sphere
    sphere.rotation.y += 0.005

    // Rotate stars slowly
    stars.rotation.y += 0.0005

    renderer.render(scene, camera)
  }

  animate()

  // Handle window resize
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  })

  // Mouse movement effect
  document.addEventListener("mousemove", (event) => {
    const mouseX = (event.clientX / window.innerWidth) * 2 - 1
    const mouseY = -(event.clientY / window.innerHeight) * 2 + 1

    gsap.to(sphere.rotation, {
      x: mouseY * 0.1,
      y: mouseX * 0.1,
      duration: 2,
    })
  })
})

