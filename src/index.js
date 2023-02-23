import "./styles.css";
import * as THREE from "three";
import { gsap } from "gsap";
import * as dat from "dat.gui";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module";
import { TransformControls } from "three/examples/jsm/controls/TransformControls";

const gui = new dat.GUI();
gui.useLocalStorage = true;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const folderCamera = gui.addFolder("camera");

folderCamera.add(camera.position, "z", 0, 1000, 1);
folderCamera.add(camera.position, "x", -20, 20, 1);
folderCamera.add(camera.position, "y", -10, 10, 1);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
const stats = Stats();
document.body.appendChild(stats.dom);

const controlsTransform = new TransformControls(camera, renderer.domElement);

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

const donutGeometry = new THREE.TorusGeometry(2, 0.5, 16, 100);
donutGeometry.matrixAutoUpdate = false;
// donutGeometry.geometry.attributes.position.needsUpdate = true;
const donutMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
donutMaterial.needsUpdate = true;

// const light = new THREE.PointLight(0xffffff, 0.5)
// light.position.set(5,5,5)
// scene.add(light)

const light = new THREE.DirectionalLight(0xffffff);
const lightHelper = new THREE.DirectionalLightHelper(light, 5);
scene.add(lightHelper);
scene.add(light);
const lightFolder = gui.addFolder("light");

gui.remember(light.position);
gui.remember(light);

lightFolder.add(light.position, "x", -10, 10);
lightFolder.add(light.position, "y", -10, 10);
lightFolder.add(light.position, "z", -10, 10);
lightFolder.add(light, "intensity", 0, 10);

const materialColorPrimary = new THREE.Color(0xff0000);
const materialColorSecondary = new THREE.Color(0xff);

const donut2 = new THREE.Mesh(donutGeometry, donutMaterial);
donut2.position.x = 0;
scene.add(donut2);

gsap.fromTo(
  donut2.material.color,
  { ...materialColorPrimary },
  { ...materialColorSecondary, duration: 10 }
);

camera.position.z = 8;

controlsTransform.attach(donut2);
scene.add(controlsTransform);

const material = gui.addFolder("material");
const params = {
  color: 0xffffff,
  radius: 2,
};
material.addColor(params, "color").onChange(function () {
  donut2.material.color.set(params.color);
});
material.add(donutMaterial, "wireframe");
material
  .add(donutGeometry.parameters, "radius", 0, 10, 1)
  .onChange(function () {
    donut2.geometry.radius = params.radius;
  });

material.add(controlsTransform, "enabled").name("transform");
material.add(controls, "enabled").name("orbit");

// let tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
// tl.to(donut.position, { duration: 0.5, x: -1});
// tl.to(donut2.position, { duration: 0.5, x: 0});
// tl.to(donut3.position, { duration: 0.5, z: 10});
// tl.to(donut.position, { duration: 0.5, z: -10, x: 0});

// const donuts = [donut, donut2, donut3];

// donuts.forEach((item, index) => {
//   gsap.to(item.position, {
//     x: index % 2,
//     // duration: index + 1,
//     stagger: function () {
//       return index * 0.5;
//     }
//   })
// })

const animate = () => {
  requestAnimationFrame(animate);

  controls.update();
  stats.update();
  controlsTransform.update();
  renderer.render(scene, camera);
};

animate();
