import * as THREE from "../build/three.module.js";
import { OrbitControls } from "../controls/OrbitControls.js";

// canvas
const canvas = document.querySelector('#webgl');

// シーン
const scene = new THREE.Scene();

// サイズ
const sizes = {
  width: innerWidth,
  height: innerHeight
}

// カメラ
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  3000
);
camera.position.set(0, 500, 1000);
scene.add(camera);

// レンダラー
const renderer = new THREE.WebGLRenderer({
  // canvasの中にThreeを描く
  canvas: canvas,
});
    //どの領域に表示させるか。画面いっぱいにレンダリング
renderer.setSize(sizes.width, sizes.height);
    // ピクセルの荒さを軽減
renderer.setPixelRatio(window.devicePixelRatio);

// envImage
const urls = [
  '../img/right.png',
  '../img/left.png',
  '../img/up.png',
  '../img/down.png',
  '../img/front.png',
  '../img/back.png',
];

const loader = new THREE.CubeTextureLoader();
scene.background = loader.load(urls);

// controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(500);

// cubeCamera
const cubeCamera = new THREE.CubeCamera(
  1, 1000, cubeRenderTarget
);
scene.add(cubeCamera);

// object
const material = new THREE.MeshBasicMaterial({
  envMap: cubeRenderTarget.texture,
}
);
const geometry = new THREE.SphereGeometry(350, 50, 50);
const sphere = new THREE.Mesh(geometry, material);
sphere.position.set(0, 200, 0);
scene.add(sphere);

// アニメーション
const tick = () => {
  controls.update();
  window.requestAnimationFrame(tick);
  renderer.render(scene, camera);
  cubeCamera.update(renderer, scene);
};

tick();

// ブラウザのリサイズ操作
window.addEventListener('resize', () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(window.devicePixelRatio);
});
