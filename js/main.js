
import * as THREE from 'three';
import { OrbitControls } from 'https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/loaders/GLTFLoader.js';
import { AppController} from './AppController.js';

const canvas = document.getElementById('draw-canvas');
const ctx = canvas.getContext('2d');
var bol = false;

window.addEventListener('load', ()=> {


    var myAppControl = new AppController();
    var buttonDraw = document.getElementById("draw");
    var buttonConversation = document.getElementById("conversation");
    var buttonPlay = document.getElementById("game");


    function animate() {
        myAppControl.draw();
        myAppControl.update();
        requestAnimationFrame(animate)
    }
    animate();

    buttonPlay.addEventListener('click', ()=> {
        myAppControl.activeDrawUI()
    }) 
    buttonConversation.addEventListener('click', ()=>  {
        myAppControl.activeConersationUI()
    })
    
    buttonDraw.addEventListener('click', ()=> {
        if (bol == true) {
        canvas.style.display = "none";
            bol = false;
        }else {
            canvas.style.display = "block";
            bol = true;
        }

    })
})






//////////////



const canvasOffsetX = canvas.offsetLeft;
const canvasOffsetY = canvas.offsetTop;

canvas.width = 1000;
canvas.height = 1000;

let paint = true;

canvas.addEventListener('mousedown', (e)=> {
    paint = false;
    ctx.beginPath();
    ctx.moveTo(e.clientX, e.clientY);
})

canvas.addEventListener('mouseup', ()=> {
    paint = true;
})

canvas.addEventListener('mousemove', (e)=> {
    if (paint == false) {
        ctx.lineWidth = 5;
        ctx.lineCap = 'round';
    
        ctx.lineTo(e.clientX-canvasOffsetX, e.clientY);
        ctx.stroke();
    }

})