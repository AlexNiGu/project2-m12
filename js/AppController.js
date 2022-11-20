import { Enviorment } from "./modules/Enviorment.js";
import  *  as keyControls from "./modules/KeyControls.js";
import { renderView } from "./modules/renderView.js";

import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';

export class AppController {

    #myEnviorment;
    #scene;
    #camera;
    #controls;
    #render;
    #myKeyControls;
    model;
    houseEnviorment;
    // buttonDraw = document.getElementById("draw");
    // buttonConversation = document.getElementById("conversation");
    // buttonPlay = document.getElementById("play");
    drawUI;
    conversationUI;
    #myRender;


    constructor() {
        this.#myEnviorment = new Enviorment();
        this.#myRender = new renderView();
        this.#scene = this.#myEnviorment.getScene();
        this.#camera = this.#myEnviorment.getCamera();
        this.#render = this.#myEnviorment.getRender();
        this.#controls = this.#myEnviorment.getControls();
        this.loadElements("../../media/casa1.glb");
        this.loadElements('../../media/Duckdoc.glb', 26,12,10, true);
    }


    draw() {
        this.#render.render(this.#scene, this.#camera)
    }


    update() {

        this.listener();
        keyControls.resetHover(this.#scene);
        keyControls.hoverPiece(this.#scene, this.#camera);
        // this.#myKeyControls.hoverPiece();
        // this.#controls.update();
        if (this.model) {
            // this.model.position.x += 0.005;
            // this.#camera.position.x -= 0.01;
        }

        // It will turn into a swicth
        if (this.drawUI == true) {
            this.#myRender.render('draw');
            this.model.position.x -=0.05;
            this.model.rotation.z -=0.05;
            this.#camera.position.x -= 0.01;
            this.#camera.rotation.x -= 0.01;

        }
        if (this.conversationUI == true) {
            this.#myRender.render('draw');
            this.model.position.x +=0.05;
            this.model.rotation.z +=0.05;
            this.#camera.position.x += 0.01;
            this.#camera.rotation.x += 0.01;
        }
    }
    


    listener() {
        window.addEventListener('resize', ()=> {
            this.#camera.aspect = window.innerWidth / window.innerHeight;
            this.#camera.updateProjectionMatrix();
            this.#render.setSize(window.innerWidth, window.innerHeight);
        })

        // this.buttonConversation.addEventListener("click", this.activeDrawUI());
        window.addEventListener('mousemove', keyControls.onMouseMove, false);
        window.addEventListener('click', keyControls.onClick(this.#camera, this.#scene ));
    }


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    loadElements(element, paramX=0, paramY=0, paramZ=0, bol=false) {
        this.loader = new GLTFLoader();

        this.loader.load(element, (glb) => {
            this.houseEnviorment= glb.scene.children[1]; // Array of two (object and mesh). You need to get the mesh
            // car.scale.set(paramX,paramY,paramZ);
            this.#scene.add(glb.scene);
            if (bol == true) {
            this.model = glb.scene.children[1];
            this.model.position.set(paramX, paramY, paramZ);
            this.model.rotation.set(0,3.1,0);
            }
            // console.log("d", elem);
        },
        function ( xhr ) {
            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
            },
        function ( error ) {
            console.log( 'An error happened' );
        });

    }


    activeDrawUI() {
        this.drawUI = true;
        this.conversationUI = false;
    }

    activeConersationUI() {
        this.conversationUI = true;
        this.drawUI = false;
    }
}

