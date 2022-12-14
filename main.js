
import * as THREE from 'three';
import Room from './room.js';
import { OrbitControls } from 'https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();

// PerspectiveCamera is te most used one (There is a lot of cameras). Because represent human eye
// params = (Field of view, aspect ratio (user window), view frustum)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);


const helper = new THREE.CameraHelper( camera );


scene.add( helper );



// Render the scece in the element that you want. In our case is a canvas
const renderer =  new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
})
// configuration of pixelRatio and size
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

//position the camera in the scene
// camera.position.setZ(30);

// Controls to move in the scene
// const controls = new OrbitControls( camera, renderer.domElement );


// pointLightHelper to know where is the light source
const gridHelper = new THREE.GridHelper(200, 50);
const axisHelper = new THREE.AxesHelper(20);
scene.add( gridHelper, axisHelper );


// Resize window to make it responsive to the window

window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
})

// camera.position.setX = 10
camera.position.z = 9
camera.position.y = 11
camera.position.x = 25
camera.rotation.x = -0.15

////////////////////////////////////////////////////////////////////////////////////////////////

// const room = new Room(scene);
// room.loadRoom()

const loader = new GLTFLoader();
loader.load(
    // resource URL
    'design/room.glb',
    // called when the resource is loaded
    function ( gltf ) {

        scene.add( gltf.scene );

        gltf.animations; // Array<THREE.AnimationClip>
        gltf.scene; // THREE.Group
        gltf.scenes; // Array<THREE.Group>
        gltf.cameras; // Array<THREE.Camera>
        gltf.asset; // Object
        

    })
////////////////////////////////////////////////////////////////////////////////////////////////

const light = new THREE.AmbientLight( 0xffffff ); // soft white light
scene.add( light );

//////////////////////////////////////////////////////////////////

function animate() {

    // controls.update();
    renderer.render(scene, camera)
    requestAnimationFrame(animate)
}

animate();