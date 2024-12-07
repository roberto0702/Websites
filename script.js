// Initialize Scene, Camera, and Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('threejs-bg') });
renderer.setSize(window.innerWidth, window.innerHeight);

// Create Particles
const particlesCount = 5000;
const particlesGeometry = new THREE.BufferGeometry();
const particlesPositions = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i++) {
  particlesPositions[i] = (Math.random() - 0.5) * 10;
}

particlesGeometry.setAttribute(
  'position',
  new THREE.BufferAttribute(particlesPositions, 3)
);

const particlesMaterial = new THREE.PointsMaterial({
  color: 0xffffff,
  size: 0.05,
});

const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  particles.rotation.y += 0.001;
  renderer.render(scene, camera);
}

// Mouse Interaction
window.addEventListener("mousemove", (event) => {
  const x = (event.clientX / window.innerWidth) * 2 - 1;
  const y = -(event.clientY / window.innerHeight) * 2 + 1;
  particles.rotation.x = y * 0.5;
  particles.rotation.y = x * 0.5;
});

// Adjust on Resize
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

animate();
