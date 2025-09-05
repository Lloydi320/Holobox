// Import Three.js library - removed, using global THREE from CDN

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

    document.getElementById("backBtn2").addEventListener("click", () => {
      this.goToStep(1)
    })

    document.getElementById("view3DBtn").addEventListener("click", () => {
      this.goToStep(3)
      this.init3DModel()
    })

    document.getElementById("backBtn3").addEventListener("click", () => {
      this.cleanup3D()
      this.goToStep(1)
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
    this.scene = new window.THREE.Scene()
    this.scene.background = new window.THREE.Color(0x000000)

    // Camera setup
    this.camera = new window.THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000)
    this.camera.position.z = 5

    // Renderer setup
    this.renderer = new window.THREE.WebGLRenderer({ antialias: true })
    this.renderer.setSize(container.clientWidth, container.clientHeight)
    this.renderer.setClearColor(0x000000, 1)
    container.appendChild(this.renderer.domElement)

    const geometry = new window.THREE.BoxGeometry(2, 2, 2)
    const materials = [
      new window.THREE.MeshBasicMaterial({ color: 0x67e8f9 }), // Right - cyan
      new window.THREE.MeshBasicMaterial({ color: 0xa5f3fc }), // Left - light cyan
      new window.THREE.MeshBasicMaterial({ color: 0x67e8f9 }), // Top - cyan
      new window.THREE.MeshBasicMaterial({ color: 0xa5f3fc }), // Bottom - light cyan
      new window.THREE.MeshBasicMaterial({ color: 0x67e8f9 }), // Front - cyan
      new window.THREE.MeshBasicMaterial({ color: 0xa5f3fc }), // Back - light cyan
    ]

    this.cube = new window.THREE.Mesh(geometry, materials)
    this.cube.rotation.x = Math.PI / 4
    this.cube.rotation.y = Math.PI / 4
    this.scene.add(this.cube)

    // Add some lighting
    const ambientLight = new window.THREE.AmbientLight(0x404040, 0.6)
    this.scene.add(ambientLight)

    const directionalLight = new window.THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(1, 1, 1)
    this.scene.add(directionalLight)

    // Start animation
    this.animate()

    // Handle window resize
    window.addEventListener("resize", () => this.onWindowResize())
  }

  animate() {
    this.animationId = window.requestAnimationFrame(() => this.animate())

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
      window.cancelAnimationFrame(this.animationId)
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
