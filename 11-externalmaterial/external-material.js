import * as THREE from "../build/three.module.js";
import { GLTFLoader } from "../controls/GLTFLoader.js";
import { OrbitControls } from "../controls/OrbitControls.js";

// import modelDataUrl from "../scene.gltf";


// canvasタグの取得
const canvas = document.querySelector('.webgl');
// サイズ設定
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

/////////////////////////////////////////////
// 必須の3要素
// レンダラー
const renderer = new THREE.WebGLRenderer(
  {
    canvas: canvas,
    alpha: true,
  }
);
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(window.devicePixelRatio);

/////////////////////////////////////////////
// シーン
const scene = new THREE.Scene();
// scene.background = new THREE.Color(0xdddddd);

/////////////////////////////////////////////


// カメラ
const camera = new THREE.PerspectiveCamera(
  40,
  sizes.width / sizes.height,
  0.1,
  20000
);
camera.rotation.y = 45/180*Math.PI;
camera.position.x = 2200;
camera.position.y = 800;
camera.position.z = 3500;

document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.update();


scene.add(camera);
/////////////////////////////////////////////
renderer.render(scene, camera);

/////////////////////////////////////////////
// 照明
const hlight = new THREE.AmbientLight (0x404040, 3.5);
        scene.add(hlight);

const directionalLight = new THREE.DirectionalLight(0xffffff,0.5);
directionalLight.position.set(0,80,100);
// directionalLight.castShadow = true;
scene.add(directionalLight);
        const light = new THREE.PointLight(0xc4c4c4,0.5);
        light.position.set(0,300,500);
        scene.add(light);
        const light2 = new THREE.PointLight(0xc4c4c4,0.1);
        light2.position.set(500,100,0);
        scene.add(light2);
        const light3 = new THREE.PointLight(0xc4c4c4,0.1);
        light3.position.set(0,100,-500);
        scene.add(light3);
        const light4 = new THREE.PointLight(0xc4c4c4,0.1);
        light4.position.set(-500,300,500);
        scene.add(light4);

/////////////////////////////////////////////
// 外部オブジェクトの挿入
const loader = new GLTFLoader();
loader.load("../scene.gltf", (gltf) => {
  gltf.scene.scale.set(10, 10, 10);
  scene.add(gltf.scene);
  // console.log('gltf model loaded');
});

function animate() {
        renderer.render(scene,camera);
        requestAnimationFrame(animate);
}
animate();