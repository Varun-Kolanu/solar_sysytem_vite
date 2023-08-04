import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import sun from "./src/sun.png";
import mercury from "./src/mercury.png";
import venus from "./src/venus.jpeg";
import earth from "./src/earth.jpg";
import mars from "./src/mars.jpg";
import jupiter from "./src/jupiter.jpeg";
import saturn from "./src/saturn.jpg";
import uranus from "./src/uranus.jpeg";
import neptune from "./src/neptune.jpg";

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const scene = new THREE.Scene();

renderer.shadowMap.enabled = true;

const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const orbitControls = new OrbitControls(camera, renderer.domElement);
camera.position.set(0, 0, 50);
orbitControls.update();

const planet = (position, texture, radius) => {
    const planetGeometry = new THREE.SphereGeometry(radius, 50, 50);
    const planetMaterial = new THREE.MeshStandardMaterial({ map: texture })
    const planetMesh = new THREE.Mesh(planetGeometry, planetMaterial);
    const referenceObject = new THREE.Object3D();
    referenceObject.add(planetMesh);
    planetMesh.position.set(position,0,0);
    scene.add(referenceObject);
    const group = {
        mesh: planetMesh,
        obj: referenceObject
    }
    return group;
}


const textureLoader = new THREE.TextureLoader();
renderer.setClearColor(0x000000);

const sunGeometry = new THREE.SphereGeometry(5, 50, 50);
const sunMaterial = new THREE.MeshBasicMaterial({ map: textureLoader.load(sun) })
const sunMesh = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sunMesh);


const planets = [];
planets.push(planet(10, textureLoader.load(mercury), 0.38));
planets.push(planet(15, textureLoader.load(venus), 0.95));
planets.push(planet(20, textureLoader.load(earth), 1));
planets.push(planet(25, textureLoader.load(mars), 0.53));
planets.push(planet(30, textureLoader.load(jupiter), 2));
planets.push(planet(35, textureLoader.load(saturn), 1.8));
planets.push(planet(40, textureLoader.load(uranus), 1.2));
planets.push(planet(45, textureLoader.load(neptune), 1.2));

const planetRotations = [0.5, 0.1, 1, 1, 2.4, 2.4, 0.6, 0.6];
const planetRevolutions = [48,35,30,24,13,10,7,5.5];


const ambientLight = new THREE.AmbientLight(0x333333); //* Environmental light
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 3000, 500);
scene.add(pointLight);

function animate() {
    sunMesh.rotateY(0.004);
    for(let i=0; i<planets.length; i++) {
        planets[i].mesh.rotateY(planetRotations[i]/20);
        planets[i].obj.rotateY(planetRevolutions[i]/2000);
    }
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

