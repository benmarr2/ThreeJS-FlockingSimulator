var scene, camera, renderer, controls;
initialiseScene();
animate();

function initialiseScene() {
    //scene
    scene = new THREE.Scene({ antialias: true });

    //FOV, Aspect ratio, Near clip, Far clip
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 20000);

    //renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

}

//CONTROLS
var controls = new THREE.OrbitControls(camera, renderer.domElement);
camera.position.set(-50, 50, 0)
controls.update();

//LIGHT
var light = new THREE.AmbientLight( 0x404040, 5 ); // soft white light
scene.add( light );

//OBJECT LOADER
var loader = new THREE.GLTFLoader();

loader.load("/assets/bird.gltf", function(gltf){
    
    //Loading in and positioning model
    var object = gltf.scene;
    object.scale.set(10,10,10);
    object.position.set (0, 0, 0);
    object.rotation.y = 0.5;

    //Playing Animation
     mixer = new THREE.AnimationMixer(gltf.scene);
     console.log(gltf.animations)
     mixer.clipAction( gltf.animations[0]).play();

    scene.add(object);  

});

//SKYBOX
let materialArray = [];
let texture_ft = new THREE.TextureLoader().load('assets/rainbow_ft.png');
let texture_bk = new THREE.TextureLoader().load('assets/rainbow_bk.png');
let texture_up = new THREE.TextureLoader().load('assets/rainbow_up.png');
let texture_dn = new THREE.TextureLoader().load('assets/rainbow_dn.png');
let texture_rt = new THREE.TextureLoader().load('assets/rainbow_rt.png');
let texture_lf = new THREE.TextureLoader().load('assets/rainbow_lf.png');

materialArray.push(new THREE.MeshBasicMaterial({ map: texture_ft }));
materialArray.push(new THREE.MeshBasicMaterial({ map: texture_bk }));
materialArray.push(new THREE.MeshBasicMaterial({ map: texture_up }));
materialArray.push(new THREE.MeshBasicMaterial({ map: texture_dn }));
materialArray.push(new THREE.MeshBasicMaterial({ map: texture_rt }));
materialArray.push(new THREE.MeshBasicMaterial({ map: texture_lf }));

for (let i = 0; i < 6; i++)
    materialArray[i].side = THREE.BackSide;

let skyboxGeo = new THREE.BoxGeometry(10000, 10000, 10000);
let skybox = new THREE.Mesh(skyboxGeo, materialArray);
scene.add(skybox);

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();
})

//RENDER
function render() {
    renderer.render(scene, camera);
}

//ANIMATE
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);

   
}