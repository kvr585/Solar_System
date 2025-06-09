import * as THREE from "https://cdn.skypack.dev/three@0.129.0";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";

import { getFresnelMat } from "./src/getFresnelMat.js";
import getStarfield from "./src/getStarfield.js";

const w = window.innerWidth;
const h = window.innerHeight;
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
camera.position.set(0, 100, 0);
camera.up.set(0, 0, -1);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.outputColorSpace = THREE.LinearSRGBColorSpace;

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, 0);
controls.enableRotate = false;
controls.enablePan = false;
controls.update();

const loader = new THREE.TextureLoader();
const detail = 12;

// Earth
const earthGroup = new THREE.Group();
earthGroup.rotation.z = -23.4 * Math.PI / 180;
earthGroup.position.x = -2.5;
scene.add(earthGroup);

const earthGeometry = new THREE.IcosahedronGeometry(1, detail);
const earthMaterial = new THREE.MeshPhongMaterial({
  map: loader.load("./textures/00_earthmap1k.jpg"),
  specularMap: loader.load("./textures/02_earthspec1k.jpg"),
  bumpMap: loader.load("./textures/01_earthbump1k.jpg"),
  bumpScale: 0.04,
});
const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
earthGroup.add(earthMesh);

const lightsMat = new THREE.MeshBasicMaterial({
  map: loader.load("./textures/03_earthlights1k.jpg"),
  blending: THREE.AdditiveBlending,
  transparent: true,
  depthWrite: false
});
earthGroup.add(new THREE.Mesh(earthGeometry, lightsMat));

const cloudsMat = new THREE.MeshStandardMaterial({
  map: loader.load("./textures/04_earthcloudmap.jpg"),
  alphaMap: loader.load('./textures/05_earthcloudmaptrans.jpg'),
  transparent: true,
  opacity: 0.8,
  blending: THREE.AdditiveBlending,
  depthWrite: false
});
const cloudsMesh = new THREE.Mesh(earthGeometry, cloudsMat);
cloudsMesh.scale.setScalar(1.003);
earthGroup.add(cloudsMesh);

const fresnelMat = getFresnelMat();
const glowMesh = new THREE.Mesh(earthGeometry, fresnelMat);
glowMesh.scale.setScalar(1.01);
earthGroup.add(glowMesh);

//  Saturn
const saturnGroup = new THREE.Group();
saturnGroup.position.x = 3.5;
scene.add(saturnGroup);

const saturnGeometry = new THREE.SphereGeometry(0.9, 64, 64);
const saturnMaterial = new THREE.MeshPhongMaterial({
  map: loader.load("./img/saturn_hd.jpg")
});
const saturnMesh = new THREE.Mesh(saturnGeometry, saturnMaterial);
saturnGroup.add(saturnMesh);

const ringGeometry = new THREE.RingGeometry(1.1, 2.0, 64);
const ringMaterial = new THREE.MeshBasicMaterial({
  color: 0xffff00,
  side: THREE.DoubleSide,
  transparent: true,
  opacity: 0.5
});
const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
ringMesh.rotation.set(-0.5, 0, 0);
saturnGroup.add(ringMesh);

//  Starfield
scene.add(getStarfield({ numStars: 2000 }));

//  Light
scene.add(new THREE.DirectionalLight(0xffffff, 2.0).position.set(-2, 0.5, 1.5));

//  Orbit Paths
const createOrbitPath = (radius, segments = 128, color = 0x8888ff) => {
  const points = [];
  for (let i = 0; i <= segments; i++) {
    const angle = (i / segments) * Math.PI * 2;
    points.push(new THREE.Vector3(Math.cos(angle) * radius, 0.001, Math.sin(angle) * radius));
  }
  return new THREE.LineLoop(
    new THREE.BufferGeometry().setFromPoints(points),
    new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.4 })
  );
};

scene.add(createOrbitPath(2.5, 128, 0x00ccff));
scene.add(createOrbitPath(3.5, 128, 0xffcc00));

//  Animate
function animate() {
  requestAnimationFrame(animate);
  earthMesh.rotation.y += 0.002;
  cloudsMesh.rotation.y += 0.0023;
  glowMesh.rotation.y += 0.002;
  saturnMesh.rotation.y += 0.0015;
  ringMesh.rotation.z += 0.1;
  renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
