// Import Three.js library
import * as THREE from "three"

class HoloboxInterface {
  constructor() {
    this.currentStep = 1
    this.scene = null
    this.camera = null
    this.renderer = null
    this.cube = null
    this.animationId = null

    this.initEventListeners()
  }

  initEventListeners() {
    document.getElementById("startBtn").addEventListener("click", () => {
      this.goToStep(2)
    })

    document.getElementById("view3DBtn").addEventListener("click", () => {
      this.goToStep(3)
      this.init3DModel()
    })

    document.getElementById("backBtn").addEventListener("click", () => {
      this.cleanup3D()
      this.goToStep(2)
    })
  }

  goToStep(stepNumber) {
    // Hide all steps
    document.querySelectorAll(".step").forEach((step) => {
      step.classList.remove("active")
    })

    // Show target step
    document.getElementById(`step${stepNumber}`).classList.add("active")
    this.currentStep = stepNumber
  }

  init3DModel() {
    const container = document.getElementById("threejs-container")

    // Scene setup
    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color(0x000000)

    // Camera setup
    this.camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000)
    this.camera.position.z = 5

    // Renderer setup
    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setSize(container.clientWidth, container.clientHeight)
    this.renderer.setClearColor(0x000000, 1)
    container.appendChild(this.renderer.domElement)

    // Create a rotating cube with gradient-like material
    const geometry = new THREE.BoxGeometry(2, 2, 2)

    // Create materials for each face with different colors
    const materials = [
      new THREE.MeshBasicMaterial({ color: 0x667eea }), // Right
      new THREE.MeshBasicMaterial({ color: 0x764ba2 }), // Left
      new THREE.MeshBasicMaterial({ color: 0x667eea }), // Top
      new THREE.MeshBasicMaterial({ color: 0x764ba2 }), // Bottom
      new THREE.MeshBasicMaterial({ color: 0x667eea }), // Front
      new THREE.MeshBasicMaterial({ color: 0x764ba2 }), // Back
    ]

    this.cube = new THREE.Mesh(geometry, materials)
    this.scene.add(this.cube)

    // Add some lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6)
    this.scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(1, 1, 1)
    this.scene.add(directionalLight)

    // Start animation
    this.animate()

    // Handle window resize
    window.addEventListener("resize", () => this.onWindowResize())
  }

  animate() {
    this.animationId = requestAnimationFrame(() => this.animate())

    if (this.cube) {
      this.cube.rotation.x += 0.01
      this.cube.rotation.y += 0.01
    }

    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera)
    }
  }

  onWindowResize() {
    if (!this.camera || !this.renderer) return

    const container = document.getElementById("threejs-container")
    this.camera.aspect = container.clientWidth / container.clientHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(container.clientWidth, container.clientHeight)
  }

  cleanup3D() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId)
      this.animationId = null
    }

    if (this.renderer) {
      const container = document.getElementById("threejs-container")
      if (container && this.renderer.domElement) {
        container.removeChild(this.renderer.domElement)
      }
      this.renderer.dispose()
      this.renderer = null
    }

    if (this.scene) {
      // Clean up scene objects
      while (this.scene.children.length > 0) {
        this.scene.remove(this.scene.children[0])
      }
      this.scene = null
    }

    this.camera = null
    this.cube = null
  }
}

// Initialize the interface when the page loads
document.addEventListener("DOMContentLoaded", () => {
  new HoloboxInterface()
})
