import { Enviorment } from "./modules/Enviorment.js";
import  *  as keyControls from "./modules/KeyControls.js";
import { renderView } from "./modules/renderView.js";
import Shop from "../shop/shop.js";
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

    drawUI;
    conversationUI;
    #myRender;
    renderUIActivate = true;
    i = 0


    constructor(uiRoot) {
        this.UIRoot = uiRoot;
        this.#myEnviorment = new Enviorment();
        this.#myRender = new renderView();
        this.view = this.#myRender.render();
        this.#scene = this.#myEnviorment.getScene();
        this.#camera = this.#myEnviorment.getCamera();
        this.#render = this.#myEnviorment.getRender();
        this.#controls = this.#myEnviorment.getControls();
        this.shop = new Shop()
        this.loadElements('../media/casa1.glb');
        this.loadElements('https://res.cloudinary.com/eloy411/image/upload/v1669653667/Duckdoc_xzayat.glb', 26,12,10, true);
    }


    draw() {
        this.#render.render(this.#scene, this.#camera);
        this.renderUI(this.renderUIActivate);
        this.renderUIActivate = false;
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
            this.model.position.x -=0.05;
            // this.model.rotation.z -=0.05;
            this.#camera.position.x -= 0.01;
            // this.#camera.rotation.x -= 0.01;

        }
        if (this.conversationUI == true) {
            // this.model.position.x +=0.05;
            // this.model.rotation.z +=0.05;
            // this.#camera.position.x += 0.01;
            // this.#camera.rotation.x += 0.01;
            
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

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    renderUI() {
        if (this.renderUIActivate == true) {
            this.UIRoot.innerHTML = this.view;
            document.getElementById("game").addEventListener('click', ()=> {
                this.drawUI = true;
                this.conversationUI = false;
                
                
            });
            document.getElementById("conversation").addEventListener('click', ()=> {
                this.conversationUI = true;
                this.drawUI = false;
                this.fetchGetConversation()
            });
            document.getElementById("draw").addEventListener('click', ()=> {

                this.fetchGetPaiting()

                this.view = this.#myRender.render('draw');
                // this.drawUI();
                this.UIRoot.innerHTML += this.view;
                var bol = false;
                this.#myRender.drawLogic('draw');
                // if (bol == true) {
                //     canvas.style.display = "none";
                //         bol = false;
                // }else {
                //     canvas.style.display = "block";
                //     bol = true;
                // }
            })
            document.getElementById('shop').addEventListener('click',()=>{

               this.shop.getFurnitures()

            });
        }
    }

    drawUI() {
        this.UIRoot.innerHTML += this.view;
    }
    


    async fetchGetConversation(){

        const idTest = await JSON.parse(localStorage.getItem('user'))

        var cuerpo = {
            IdTest:idTest.Numtest
        }
        var options = {
            method:'post',
            body:JSON.stringify(cuerpo),
            headers:{"Content-Type":"application/json"}
        }

        await fetch('http://localhost:3000/conversation-init',options)
        .then(res=>res.json())
        .then(response=>console.log(response))

    }


    async fetchGetPaiting(){

        console.log('hola has entrado en painting')
        const idPaint = await JSON.parse(localStorage.getItem('user'))

        var cuerpo = {
            IdDibujo:idPaint.Numdibujos
        }

        var options = {
            method:'post',
            body:JSON.stringify(cuerpo),
            headers:{"Content-Type":"application/json"}
        }


        await fetch('http://localhost:3000/painting-init',options)
        .then(res=>res.json())
        .then(response=>localStorage.setItem('paint',JSON.stringify(response)))
    }
}

