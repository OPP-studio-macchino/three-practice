import * as THREE from "../build/three.module.js";
import { OrbitControls } from "../controls/OrbitControls.js";

let scene, camera, renderer, pointLight, controls,
  sphere, plane, octahedron,
  normalsphere, normalplane, normaloctahedron,
  stdsphere, stdplane, stdoctahedron,
  spherePhong, planePhong, octahedronPhong
  ;

window.addEventListener("load", init);

function init() {
  //シーン
  scene = new THREE.Scene();

  //カメラ
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );
  camera.position.set(1, 1, 2);

  //レンダラー
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  document.body.appendChild(renderer.domElement);

  /**
   * マテリアルセクション
   */
// ジオメトリー
  const basicsphereGeometry = new THREE.SphereGeometry(0.2, 16, 16);
  const basicplaneGeometry = new THREE.PlaneGeometry(0.5, 0.5);
  const basicoctahedronGeometry = new THREE.OctahedronGeometry(0.2);

  const normalsphereGeometry = new THREE.SphereGeometry(0.2, 16, 16);
  const normalplaneGeometry = new THREE.PlaneGeometry(0.5, 0.5);
  const normaloctahedronGeometry = new THREE.OctahedronGeometry(0.2);

  const stdsphereGeometry = new THREE.SphereGeometry(0.2, 16, 16);
  const stdplaneGeometry = new THREE.PlaneGeometry(0.5, 0.5);
  const stdoctahedronGeometry = new THREE.OctahedronGeometry(0.2);

  const phongsphereGeometry = new THREE.SphereGeometry(0.2, 16, 16);
  const phongplaneGeometry = new THREE.PlaneGeometry(0.5, 0.5);
  const phongoctahedronGeometry = new THREE.OctahedronGeometry(0.2);

// テクスチャ
  const texture = new THREE.TextureLoader().load('../textures/brick.jpg');

  // マテリアル
  const materialBasic = new THREE.MeshBasicMaterial();
  materialBasic.map = texture;
  materialBasic.color = new THREE.Color(0X71B33C)
  materialBasic.side = THREE.DoubleSide;
  // materialBasic.opacity = 0.5;
  // materialBasic.transparent = true;

  const normalmaterial = new THREE.MeshNormalMaterial();
  normalmaterial.side = THREE.DoubleSide;
  normalmaterial.flatShading = true;

  const stdmaterial = new THREE.MeshStandardMaterial();
  stdmaterial.side = THREE.DoubleSide;
  stdmaterial.color.set(0X00A5FF)
  stdmaterial.roughness = 0.35
  stdmaterial.metalness = 0.64

  const materialPhong = new THREE.MeshPhongMaterial();
  materialPhong.shininess = 100;
  materialPhong.specular = new THREE.Color('green');

  // ライトを追加
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
  scene.add(ambientLight);

  const pointLight = new THREE.PointLight(0xffffff, 0.5);
  pointLight.position.set(1, 2, 3);
  scene.add(pointLight);

  const pointLightHelper = new THREE.PointLightHelper(pointLight, 1);
  scene.add(pointLightHelper)

  // メッシュ化
  sphere = new THREE.Mesh(basicsphereGeometry, materialBasic);
  plane = new THREE.Mesh(basicplaneGeometry, materialBasic);
  octahedron = new THREE.Mesh(basicoctahedronGeometry, materialBasic);

  normalsphere = new THREE.Mesh(normalsphereGeometry, normalmaterial);
  normalplane = new THREE.Mesh(normalplaneGeometry, normalmaterial);
  normaloctahedron = new THREE.Mesh(normaloctahedronGeometry, normalmaterial);

  stdsphere = new THREE.Mesh(stdsphereGeometry, stdmaterial);
  stdplane = new THREE.Mesh(stdplaneGeometry, stdmaterial);
  stdoctahedron = new THREE.Mesh(stdoctahedronGeometry, stdmaterial);

  spherePhong = new THREE.Mesh(phongsphereGeometry, materialPhong);
  planePhong = new THREE.Mesh(phongplaneGeometry, materialPhong);
  octahedronPhong = new THREE.Mesh(phongoctahedronGeometry, materialPhong);

  scene.add(sphere, plane, octahedron,
    normalsphere, normalplane, normaloctahedron,
    stdsphere, stdplane, stdoctahedron,
    spherePhong, planePhong, octahedronPhong,
  )

  sphere.position.x = -0.5;
  sphere.position.y = 1;
  octahedron.position.x = 0.5;
  octahedron.position.y = 1;
  plane.position.y = 1;

  normalsphere.position.x = -0.5;
  normalsphere.position.y = 0.2;
  normaloctahedron.position.x = 0.5;
  normaloctahedron.position.y = 0.2;
  normalplane.position.y = 0.2;

  stdsphere.position.x = -0.5;
  stdsphere.position.y = -0.5;
  stdoctahedron.position.x = 0.5;
  stdoctahedron.position.y = -0.5;
  stdplane.position.y = -0.5;

  spherePhong.position.x = -0.5;
  spherePhong.position.y = -1.2;
  octahedronPhong.position.x = 0.5;
  octahedronPhong.position.y = -1.2;
  planePhong.position.y = -1.2;

  //マウス操作
  const controls = new OrbitControls(camera, renderer.domElement);

  window.addEventListener("resize", onWindowResize);

  animate();
}

const clock = new THREE.Clock();

function animate() {
  const elapcedTime = clock.getElapsedTime();

  // オブジェクトの回転
  sphere.rotation.x = elapcedTime;
  plane.rotation.x = elapcedTime;
  octahedron.rotation.x = elapcedTime;

  sphere.rotation.y = elapcedTime;
  plane.rotation.y = elapcedTime;
  octahedron.rotation.y = elapcedTime;


  normalsphere.rotation.x = elapcedTime;
  normalplane.rotation.x = elapcedTime;
  normaloctahedron.rotation.x = elapcedTime;

  normalsphere.rotation.y = elapcedTime;
  normalplane.rotation.y = elapcedTime;
  normaloctahedron.rotation.y = elapcedTime;


  stdsphere.rotation.x = elapcedTime;
  stdplane.rotation.x = elapcedTime;
  stdoctahedron.rotation.x = elapcedTime;

  stdsphere.rotation.y = elapcedTime;
  stdplane.rotation.y = elapcedTime;
  stdoctahedron.rotation.y = elapcedTime;

  stdsphere.rotation.y = elapcedTime;
  stdplane.rotation.y = elapcedTime;
  stdoctahedron.rotation.y = elapcedTime;


  spherePhong.rotation.y = elapcedTime;
  planePhong.rotation.y = elapcedTime;
  octahedronPhong.rotation.y = elapcedTime;

  spherePhong.rotation.y = elapcedTime;
  planePhong.rotation.y = elapcedTime;
  octahedronPhong.rotation.y = elapcedTime;
  //レンダリング
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

//ブラウザのリサイズに対応
function onWindowResize() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}
