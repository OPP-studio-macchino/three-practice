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
  1000
);



// レンダラー
const renderer = new THREE.WebGLRenderer({
  // canvasの中にThreeを描く
  canvas: canvas,
});
    //どの領域に表示させるか。画面いっぱいにレンダリング
renderer.setSize(sizes.width, sizes.height);
    // ピクセルの荒さを軽減
renderer.setPixelRatio(window.devicePixelRatio);

// 背景用のテクスチャ
const textureLoader = new THREE.TextureLoader();
const bgTexture = textureLoader.load('../img/bg.webp');
scene.background = bgTexture;

// オブジェクトを作成
const boxGeometry = new THREE.BoxGeometry(5, 5, 5, 10);
const boxGeometryMaterial = new THREE.MeshNormalMaterial();
const box = new THREE.Mesh(boxGeometry, boxGeometryMaterial);

box.position.set(0, 0.5, -15);
box.rotation.set(1, 1, 0);

const torusGeometry = new THREE.TorusGeometry(8, 2, 16, 100);
const torusMaterial = new THREE.MeshNormalMaterial();
const torus = new THREE.Mesh(torusGeometry, torusMaterial);
torus.position.set(0, 1, 10);

scene.add(box, torus);

// 線形補間滑らかに移動させる
function lerp(x, y, a) {
  return (1 - a) * x + a * y;
}

function scaleParcent(start, end) {
  return (scrollParcent - start) / (end - start);
}

// スクロールアニメーション
const animationScripts = [];

animationScripts.push({
  start: 0,
  end: 40,
  function() {
    camera.lookAt(box.position);
    camera.position.set(0, 1, 10);
    box.position.z = lerp(-15, 2, scaleParcent(0, 40));
    torus.position.z = lerp(10, -20, scaleParcent(0, 40));
  }
});
animationScripts.push({
  start: 40,
  end: 60,
  function() {
    camera.lookAt(box.position);
    camera.position.set(0, 1, 10);
    box.rotation.z = lerp(1, Math.PI, scaleParcent(40, 60));
  }
});
animationScripts.push({
  start: 60,
  end: 80,
  function() {
    camera.lookAt(box.position);
    camera.position.x = lerp(0, -15, scaleParcent(60, 80));
    camera.position.y = lerp(1, 15, scaleParcent(60, 80));
    camera.position.z = lerp(10, 25, scaleParcent(60, 80));
  }
});
animationScripts.push({
  start: 80,
  end: 100,
  function() {
    camera.lookAt(box.position);
    box.rotation.x += 0.02;
    box.rotation.y += 0.02;
  }
});

// アニメーションを開始
let scrollParcent = 0;

function playScrollAnimetion() {
  animationScripts.forEach((animation) => {
    if (scrollParcent >= animation.start && scrollParcent <= animation.end + 1)
    animation.function();
    }
  );
};

// ブラウザのスクロール率を取得

document.body.onscroll = () => {
  scrollParcent =
    (document.documentElement.scrollTop /
      (document.documentElement.scrollHeight - document.documentElement.clientHeight))
    * 100;
  // console.log(scrollParcent)
};


// アニメーション
const tick = () => {
  window.requestAnimationFrame(tick);
  playScrollAnimetion();
  renderer.render(scene, camera)
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
