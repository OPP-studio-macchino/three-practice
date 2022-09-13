import * as THREE from "../build/three.module.js";
// import * as THREE from 'three';
import { OrbitControls } from "../controls/OrbitControls.js";
// import { OrbitControls } from '../jsm/controls/OrbitControls.js';



// グローバルに変数を設定
let scene, camera, renderer, pointLight, controls;

window.addEventListener("load", init);

function init() {
  // シーン(ステージ)を設定
  scene = new THREE.Scene();

  // カメラを追加(視野角、アスペクト比、開始距離、終了距離)
  camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    100,
    2000
  );
  camera.position.set(0, 0, 500)

  // レンダラーを追加
  renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio)
  document.body.appendChild(renderer.domElement);

  // テクスチャを追加する
  let texture = new THREE.TextureLoader().load('../textures/earth.jpg');

  // ジオメトリを作成
  let ballGeometry = new THREE.SphereGeometry(100, 64, 32);

  // マテリアルを作成
  let ballMaterial = new THREE.MeshPhysicalMaterial({ map: texture});

  // メッシュ化
  let ballMesh = new THREE.Mesh(ballGeometry, ballMaterial);
  scene.add(ballMesh);

  // 平行光源を追加
  let directionalLight = new THREE.DirectionalLight(0xffffff, 2);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);

  // ポイント光源を追加
  pointLight = new THREE.PointLight(0XFFFFE0, 1);
  pointLight.position.set(-200, -200, -200);
  scene.add(pointLight);

  // ポイント光源の位置特定
  let pointLightHelper = new THREE.PointLightHelper(pointLight, 30);
  scene.add(pointLightHelper);

  // マウス操作
  controls = new OrbitControls( camera, renderer.domElement );

  window.addEventListener("resize", onWindowResize)

  animate();
}

// ブラウザのリサイズに対応
function onWindowResize() {
  // レンダラーのサイズをリアルタイムに更新
  renderer.setSize(window.innerWidth, window.innerHeight);
  // カメラのアスペクト比を正す
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix();
}

// ポイント光源の公転
function animate() {
  pointLight.position.set(
    200 * Math.sin(Date.now() / 500),
    200 * Math.sin(Date.now() / 1000),
    200 * Math.cos(Date.now() / 500)
  );
  requestAnimationFrame(animate);
  // レンダリング
  renderer.render(scene, camera);
}









