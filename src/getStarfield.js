import * as THREE from "https://cdn.skypack.dev/three@0.129.0";

export default function getStarfield({ numStars = 2000 } = {}) {
  const geometry = new THREE.BufferGeometry();
  const positions = [];
  const radius = 100;

  for (let i = 0; i < numStars; i++) {
    const theta = Math.random() * 2 * Math.PI;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = radius * (0.75 + 0.25 * Math.random());

    const x = r * Math.sin(phi) * Math.cos(theta);
    const y = r * Math.sin(phi) * Math.sin(theta);
    const z = r * Math.cos(phi);

    positions.push(x, y, z);
  }

  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));

  const texture = new THREE.TextureLoader().load("https://threejs.org/examples/textures/sprites/disc.png");

  const material = new THREE.PointsMaterial({
    size: 0.5,
    map: texture,
    transparent: true,
    alphaTest: 0.01,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    color: 0xffffff,
  });

  return new THREE.Points(geometry, material);
}
