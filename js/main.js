// Scene and camera
var scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
scene.background = new THREE.Color("#75b9e7");

// Renderer
var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.gammaInput = true;
renderer.gammaOutput = true;

// Ground
groundGeometry = new THREE.BoxGeometry(1000, 1, 1000);
groundMaterial = new THREE.MeshPhongMaterial();
groundMaterial.color.set("#2ecc71");
ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.position.y = -35;
ground.receiveShadow = true;
scene.add(ground);

// Light
var ambientLight = new THREE.AmbientLight("#555"); // soft white light
scene.add(ambientLight);

var pointLight = new THREE.PointLight(0xffffff, 1, 1000);
pointLight.position.set(50, 50, 70);
pointLight.shadowMapWidth = 4096;
pointLight.shadowMapHeight = 4096;
pointLight.castShadow = true;
scene.add(pointLight);

// Objects
peter = generate.box("peter: Politik")
peter.position.x += -30;
peter.plane.material.color = new THREE.Color("#1cceab");
scene.add(peter);

mato = generate.box("mato: Koder");
mato.position.x += 60;
mato.plane.material.color = new THREE.Color("#e67e22");
scene.add(mato);

ruby = generate.box("ruby: Dotista");
ruby.plane.material.color = new THREE.Color("#2980b9");
ruby.position.z -= 20;
scene.add(ruby);

luky = generate.box("luky: Panda");
luky.plane.material.color = new THREE.Color("#9b59b6");
luky.position.x += 60;
luky.position.z -= 20;
scene.add(luky);

// Calls
callFeedHim = generate.call(peter, mato, "feedHim()");
scene.add(callFeedHim);

callBuyHimAghanim = generate.call(ruby, luky, "buyHimAghanim()");
scene.add(callBuyHimAghanim);

// Adjust camera
camera.position.x = -15;
camera.position.z = 50;
camera.position.y = 20;

// Orbit
var orbit = new THREE.OrbitControls(camera, renderer.domElement);

// Render
function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}

window.requestAnimationFrame(render);
