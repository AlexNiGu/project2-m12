
import * as THREE from 'three';
import { OrbitControls } from 'https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/loaders/GLTFLoader.js';
import { AppController} from './AppController.js';



window.addEventListener('load', ()=> {
    const myAppControl = new AppController();
    function animate() {
        myAppControl.draw();
        myAppControl.update();
        requestAnimationFrame(animate)
    }
    animate();
})



//////////////////////////////////////////////////////////


window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
})