import * as THREE from "https://cdn.skypack.dev/three@0.129.0";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";

let scene, camera, renderer, controls, skybox;
let planet_sun, planet_mercury, planet_venus, planet_earth, planet_mars, planet_jupiter, planet_saturn, planet_uranus, planet_neptune;

let mercury_orbit_radius = 50;
let venus_orbit_radius = 60;
let earth_orbit_radius = 70;
let mars_orbit_radius = 80;
let jupiter_orbit_radius = 100;
let saturn_orbit_radius = 120;
let uranus_orbit_radius = 140;
let neptune_orbit_radius = 160;

let mercury_revolution_speed = 2;
let venus_revolution_speed = 1.5;
let earth_revolution_speed = 1;
let mars_revolution_speed = 0.8;
let jupiter_revolution_speed = 0.7;
let saturn_revolution_speed = 0.6;
let uranus_revolution_speed = 0.5;
let neptune_revolution_speed = 0.4;

const speedSettings = {
  mercury: mercury_revolution_speed,
  venus: venus_revolution_speed,
  earth: earth_revolution_speed,
  mars: mars_revolution_speed,
  jupiter: jupiter_revolution_speed,
  saturn: saturn_revolution_speed,
  uranus: uranus_revolution_speed,
  neptune: neptune_revolution_speed,
};

function createMaterialArray() {
  const skyboxImagepaths = [
    '../img/skybox/space_ft.png', '../img/skybox/space_bk.png',
    '../img/skybox/space_up.png', '../img/skybox/space_dn.png',
    '../img/skybox/space_rt.png', '../img/skybox/space_lf.png'
  ];
  return skyboxImagepaths.map((image) =>
    new THREE.MeshBasicMaterial({
      map: new THREE.TextureLoader().load(image),
      side: THREE.BackSide
    })
  );
}

function setSkyBox() {
  const materialArray = createMaterialArray();
  const skyboxGeo = new THREE.BoxGeometry(1000, 1000, 1000);
  skybox = new THREE.Mesh(skyboxGeo, materialArray);
  scene.add(skybox);
}

function loadPlanetTexture(texture, radius, widthSegments, heightSegments, meshType) {
  const geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
  const textureMap = new THREE.TextureLoader().load(texture);
  const material = meshType === 'standard'
    ? new THREE.MeshStandardMaterial({ map: textureMap })
    : new THREE.MeshBasicMaterial({ map: textureMap });
  return new THREE.Mesh(geometry, material);
}

function createRing(innerRadius) {
  const outerRadius = innerRadius - 0.1;
  const geometry = new THREE.RingGeometry(innerRadius, outerRadius, 100);
  const material = new THREE.MeshBasicMaterial({ color: '#ffffff', side: THREE.DoubleSide });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.rotation.x = Math.PI / 2;
  scene.add(mesh);
  return mesh;
}

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(85, window.innerWidth / window.innerHeight, 0.1, 1000);

  setSkyBox();

  
  planet_sun = loadPlanetTexture("../img/sun_hd.jpg", 20, 100, 100, 'basic');
  planet_mercury = loadPlanetTexture("../img/mercury_hd.jpg", 2, 100, 100, 'standard');
  planet_venus = loadPlanetTexture("../img/venus_hd.jpg", 3, 100, 100, 'standard');
  planet_earth = loadPlanetTexture("../textures/00_earthmap1k.jpg", 4, 100, 100, 'standard');
  planet_mars = loadPlanetTexture("../img/mars_hd.jpg", 3.5, 100, 100, 'standard');
  planet_jupiter = loadPlanetTexture("../img/jupiter_hd.jpg", 10, 100, 100, 'standard');
  planet_saturn = loadPlanetTexture("../img/saturn_hd.jpg", 8, 100, 100, 'standard');
  planet_uranus = loadPlanetTexture("../img/uranus_hd.jpg", 6, 100, 100, 'standard');
  planet_neptune = loadPlanetTexture("../img/neptune_hd.jpg", 5, 100, 100, 'standard');

  [planet_sun, planet_mercury, planet_venus, planet_earth, planet_mars,
    planet_jupiter, planet_saturn, planet_uranus, planet_neptune].forEach(planet => scene.add(planet));

  const sunLight = new THREE.PointLight(0xffffff, 1);
  sunLight.position.copy(planet_sun.position);
  scene.add(sunLight);

  
  [mercury_orbit_radius, venus_orbit_radius, earth_orbit_radius, mars_orbit_radius,
    jupiter_orbit_radius, saturn_orbit_radius, uranus_orbit_radius, neptune_orbit_radius]
    .forEach(radius => createRing(radius));

  
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.domElement.id = "c";
  document.getElementById('container').appendChild(renderer.domElement);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.minDistance = 12;
  controls.maxDistance = 1000;

  camera.position.z = 100;
  camera.lookAt(scene.position);
}

function planetRevolver(time, speed, planet, orbitRadius) {
  const angle = time * 0.001 * speed;
  planet.position.x = planet_sun.position.x + orbitRadius * Math.cos(angle);
  planet.position.z = planet_sun.position.z + orbitRadius * Math.sin(angle);
}

function animate(time) {
  requestAnimationFrame(animate);

  if (window.__isPaused) return;

  const rotationSpeed = 0.005;

  [planet_earth, planet_sun, planet_mercury, planet_venus, planet_mars,
    planet_jupiter, planet_saturn, planet_uranus, planet_neptune]
    .forEach(p => p.rotation.y += 0.005);

  planetRevolver(time, speedSettings.mercury, planet_mercury, mercury_orbit_radius);
  planetRevolver(time, speedSettings.venus, planet_venus, venus_orbit_radius);
  planetRevolver(time, speedSettings.earth, planet_earth, earth_orbit_radius);
  planetRevolver(time, speedSettings.mars, planet_mars, mars_orbit_radius);
  planetRevolver(time, speedSettings.jupiter, planet_jupiter, jupiter_orbit_radius);
  planetRevolver(time, speedSettings.saturn, planet_saturn, saturn_orbit_radius);
  planetRevolver(time, speedSettings.uranus, planet_uranus, uranus_orbit_radius);
  planetRevolver(time, speedSettings.neptune, planet_neptune, neptune_orbit_radius);

  controls.update();
  renderer.render(scene, camera);
}


function updateSpeeds() {
  mercury_revolution_speed = speedSettings.mercury;
  venus_revolution_speed = speedSettings.venus;
  earth_revolution_speed = speedSettings.earth;
  mars_revolution_speed = speedSettings.mars;
  jupiter_revolution_speed = speedSettings.jupiter;
  saturn_revolution_speed = speedSettings.saturn;
  uranus_revolution_speed = speedSettings.uranus;
  neptune_revolution_speed = speedSettings.neptune;
}

function createSpeedControls() {
  const slidersContainer = document.getElementById('sliders');
  slidersContainer.innerHTML = '';

  Object.keys(speedSettings).forEach(planet => {
    const wrapper = document.createElement('div');
    wrapper.style.marginBottom = '10px';

    const label = document.createElement('label');
    label.textContent = `${planet.charAt(0).toUpperCase() + planet.slice(1)}: `;
    label.htmlFor = `${planet}-speed`;

    const input = document.createElement('input');
    input.type = 'range';
    input.min = '0';
    input.max = '5';
    input.step = '0.1';
    input.value = speedSettings[planet];
    input.id = `${planet}-speed`;

    const valueDisplay = document.createElement('span');
    valueDisplay.style.marginLeft = '5px';
    valueDisplay.textContent = speedSettings[planet];

    input.addEventListener('input', () => {
      speedSettings[planet] = parseFloat(input.value);
      valueDisplay.textContent = input.value;
      updateSpeeds();
    });

    wrapper.appendChild(label);
    wrapper.appendChild(input);
    wrapper.appendChild(valueDisplay);
    slidersContainer.appendChild(wrapper);
  });
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener("resize", onWindowResize);
window.addEventListener("DOMContentLoaded", () => {
  createSpeedControls();
});

init();
animate(0);
