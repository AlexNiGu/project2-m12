import { Enviorment } from "./modules/Enviorment.js";
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';

export class AppController {

    #myEnviorment;
    #scene;
    constructor() {
        this.#myEnviorment = new Enviorment();
        this.#scene = this.#myEnviorment.getScene();
        this.loadElements();
    }


    draw() {

    }


    update() {
        this.#myEnviorment.controls.update();
        this.#myEnviorment.renderer.render(this.#myEnviorment.scene, this.#myEnviorment.camera)
    }


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    loadElements() {
        var car;
        this.loader = new GLTFLoader();
        this.loader.load('../../media/casa1.glb', (gltf) => {
            car = gltf.scene.children[0];
            car.scale.set(0.1,0.1,0.1);
            this.#scene.add(gltf.scene);
            console.log(this.#scene);
        },
        function ( xhr ) {
            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
            },
        function ( error ) {
            console.log( 'An error happened' );
        });
    }
}