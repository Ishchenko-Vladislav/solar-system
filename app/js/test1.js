import * as THREE from "three";
import { OrbitControls } from "/node_modules/three/examples/jsm/controls/OrbitControls.js";
const earthTexture = "./app/images/earthTexture.jpg";
const jupiterTexture = "./app/images/jupiterTexture.jpg";
const marsTexture = "./app/images/marsTexture.jpg";
const mercuryTexture = "./app/images/mercuryTexture.jpg";
const neptuneTexture = "./app/images/neptuneTexture.jpg";
const plutoTexture = "./app/images/plutoTexture.jpg";
const saturnTexture = "./app/images/saturnTexture.jpg";
const saturnRingTexture = "./app/images/saturnRingTexture.jpg";
const saturnRingTexture1 = "./app/images/saturnRingTexture1.webp";
const sunTexture = "./app/images/sunTexture.jpg";
const uranusTexture = "./app/images/uranusTexture.jpg";
const uranusRingTexture = "./app/images/uranusRingTexture.png";
const venusTexture = "./app/images/venusTexture.jpg";
const stars = "./app/images/stars1.jpg";

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const orbit = new OrbitControls(camera, renderer.domElement);
camera.position.set(-90, 140, 140);
orbit.update();

const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

const cubeTextureLoader = new THREE.CubeTextureLoader();

scene.background = cubeTextureLoader.load([
  stars,
  stars,
  stars,
  stars,
  stars,
  stars,
]);
const textureLoader = new THREE.TextureLoader();

// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({
//   // color: 0x00ff00,
//   wireframe: false,
//   map: textureLoader.load("./app/images/textureBox.jpg"),
// });
// const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);
const sunGeo = new THREE.SphereGeometry(16, 30, 30);
const sunMat = new THREE.MeshBasicMaterial({
  map: textureLoader.load(sunTexture),
});
const sun = new THREE.Mesh(sunGeo, sunMat);
scene.add(sun);

// const mercuryGeo = new THREE.SphereGeometry(3.2, 30, 30);
// const mercuryMat = new THREE.MeshStandardMaterial({
//   map: textureLoader.load(mercuryTexture),
// });
// const mercury = new THREE.Mesh(mercuryGeo, mercuryMat);
// // scene.add(mercury);
// const mercuryObj = new THREE.Object3D();
// // sun.add(mercury);
// mercuryObj.add(mercury);
// scene.add(mercuryObj);
// mercury.position.x = 28;
// const saturnGeo = new THREE.SphereGeometry(10, 30, 30);
// const saturnMat = new THREE.MeshStandardMaterial({
//   map: textureLoader.load(saturnTexture),
// });
// const saturn = new THREE.Mesh(saturnGeo, saturnMat);
// // scene.add(mercury);
// const saturnObj = new THREE.Object3D();
// // sun.add(mercury);
// saturnObj.add(saturn);
// saturn.position.x = 138;

const pointLight = new THREE.PointLight(0xffffff, 2, 300);
scene.add(pointLight);

const createPlanet = (size, texture, position, ring) => {
  const geo = new THREE.SphereGeometry(size, 30, 30);
  const mat = new THREE.MeshStandardMaterial({
    map: textureLoader.load(texture),
  });
  const obj = new THREE.Object3D();
  const mesh = new THREE.Mesh(geo, mat);
  if (ring) {
    const ringGeo = new THREE.RingGeometry(
      ring.innerRadius,
      ring.outerRadius,
      32
    );
    const ringMat = new THREE.MeshBasicMaterial({
      map: textureLoader.load(ring.texture),
      side: THREE.DoubleSide,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    obj.add(ringMesh);
    ringMesh.position.x = position;
    ringMesh.rotation.x = 0.5 * Math.PI;
  }
  obj.add(mesh);
  mesh.position.x = position;

  scene.add(obj);
  return { mesh, obj };
};
const mercury = createPlanet(3.2, mercuryTexture, 28);
const venus = createPlanet(5.8, venusTexture, 44);
const earth = createPlanet(6, earthTexture, 62);
const mars = createPlanet(4, marsTexture, 78);
const jupiter = createPlanet(12, jupiterTexture, 100);
const saturn = createPlanet(10, saturnTexture, 138, {
  innerRadius: 10,
  outerRadius: 20,
  texture: saturnRingTexture1,
});
const uranus = createPlanet(7, uranusTexture, 176, {
  innerRadius: 10,
  outerRadius: 20,
  texture: uranusRingTexture,
});
const neptune = createPlanet(7, neptuneTexture, 200);
const pluto = createPlanet(2.8, plutoTexture, 216);
// const saturnRingGeo = new THREE.RingGeometry(10, 20, 32);
// const saturnRingMat = new THREE.MeshBasicMaterial({
//   map: textureLoader.load(saturnRingTexture1),
//   side: THREE.DoubleSide,
// });
// const saturnRing = new THREE.Mesh(saturnRingGeo, saturnRingMat);
// saturn.obj.add(saturnRing);
// saturnRing.position.x = 138;
// saturnRing.rotation.x = 0.5 * Math.PI;
// scene.add(saturnOb);

function animate() {
  //self-rotation
  sun.rotateY(0.004);
  mercury.mesh.rotateY(0.0004);
  saturn.mesh.rotateY(0.0038);
  earth.mesh.rotateY(0.002);
  venus.mesh.rotateY(0.0002);
  mars.mesh.rotateY(0.0018);
  uranus.mesh.rotateY(0.003);
  neptune.mesh.rotateY(0.0032);
  pluto.mesh.rotateY(0.0008);
  //arround-sun-rotation
  mercury.obj.rotateY(0.0047);
  venus.obj.rotateY(0.0035);
  earth.obj.rotateY(0.0025);
  mars.obj.rotateY(0.0017);
  jupiter.obj.rotateY(0.0008);
  saturn.obj.rotateY(0.00045);
  uranus.obj.rotateY(0.0003);
  neptune.obj.rotateY(0.00018);
  pluto.obj.rotateY(0.00007);

  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
