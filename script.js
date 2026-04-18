import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// --- INITIAL SETUP ---
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Camera controls so you can move around
const controls = new OrbitControls(camera, renderer.domElement);
camera.position.set(0, 20, 40);
controls.update();

// --- LIGHTING ---
const sunLight = new THREE.DirectionalLight(0xffffff, 1.5);
sunLight.position.set(5, 10, 7.5);
scene.add(sunLight);
scene.add(new THREE.AmbientLight(0x404040, 2)); // Soft white light

// --- GENERATING THE 123 SLOTS ---
const planets = [];
const totalSlots = 123;
const cols = 11; // 11 columns across
const spacing = 5; // Distance between planets

for (let i = 0; i < totalSlots; i++) {
    // 1. Calculate grid position (x and z)
    const row = Math.floor(i / cols);
    const col = i % cols;

    // 2. Create the planet mesh
    const geometry = new THREE.SphereGeometry(1.5, 32, 32);
    const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(`hsl(${Math.random() * 360}, 70%, 50%)`), // Random bright colors
        roughness: 0.7,
        metalness: 0.2
    });

    const planet = new THREE.Mesh(geometry, material);

    // 3. Position the planet based on its slot number
    planet.position.x = col * spacing - (cols * spacing) / 2;
    planet.position.z = row * spacing - (12 * spacing) / 2;
    
    // Give it a random starting rotation
    planet.rotation.y = Math.random() * Math.PI;

    scene.add(planet);
    planets.push(planet);
}

// --- ANIMATION LOOP ---
function animate() {
    requestAnimationFrame(animate);

    // Make every planet in the 123 slots rotate at a slightly different speed
    planets.forEach((p, index) => {
        p.rotation.y += 0.005 + (index * 0.0001);
    });

    controls.update();
    renderer.render(scene, camera);
}

// Handle window resizing
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();
