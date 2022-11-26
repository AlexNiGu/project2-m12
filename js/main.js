import { AppController } from './AppController.js';

var myAppControl = {}

const container = document.getElementById('container')

localStorage.getItem('token') == 'yes'? renderCanvas(): startLogin()
/**LOGIN */

function startLogin() {

    const buttonLogin = document.getElementById('button-login')

    buttonLogin.addEventListener('click', async () => {

        
        const user = document.getElementById('user').value
        const password = document.getElementById('password').value
    
        var cuerpo = {
            "Nombre": user,
            "Password": password
        }

        var options = {
            method: 'post',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(cuerpo)
        }

        await fetch('http://localhost:3000/login', options)
            .then(res => res.json())
            .then(response => response.error ?
                mensajeError(response) :
                saveData(response),
            )

    })
    
    function mensajeError(response) {
        alert(response.error)
    }

    function saveData(response) {
        localStorage.setItem('token', 'yes')
        localStorage.setItem('user', JSON.stringify(response))
        renderCanvas()
    }


}


function renderCanvas(){
    fetchGetInfoUser()
    const body = document.getElementById('body')
    const div = document.createElement('div')
    div.id = 'root-ui'
    const canvas = document.createElement('canvas')
    canvas.id = 'bg'
    body.removeChild(container)
    body.insertBefore(div, body.childNodes[0])
    body.insertBefore(canvas, body.childNodes[1])

    var uiRoot = document.getElementById('root-ui');
    myAppControl = new AppController(uiRoot);
    animate()
}

function animate() {
    myAppControl.draw();
    myAppControl.update();
    requestAnimationFrame(animate);
}


async function fetchGetInfoUser(){
    var options = {
        method: 'post',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: localStorage.getItem('user')
    }

    await fetch('http://localhost:3000/ini', options)
        .then(res => res.json())
        .then(response=>localStorage.setItem('user',JSON.stringify(response)))
        
}