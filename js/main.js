import { AppController } from './AppController.js';


const container = document.getElementById('container')

localStorage.getItem('token') == 'yes'? renderCanvas(): startLogin()
/**LOGIN */

function startLogin() {
    const buttonLogin = document.getElementById('button-login')
    const user = document.getElementById('user').value
    const password = document.getElementById('password').value

    var cuerpo = {
        "Nombre": user,
        "Password": password
    }

    console.log(JSON.stringify(cuerpo))

    buttonLogin.addEventListener('click', async () => {


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
                // animate()
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
    const body = document.getElementById('body')
    const div = document.createElement('div')
    div.id = 'root-ui'
    const canvas = document.createElement('canvas')
    canvas.id = 'bg'
    body.removeChild(container)
    body.insertBefore(div, body.childNodes[0])
    body.insertBefore(canvas, body.childNodes[1])
    animate()
}

function animate() {
    var uiRoot = document.getElementById('root-ui');
    var myAppControl = new AppController(uiRoot);
    myAppControl.draw();
    myAppControl.update();
    // requestAnimationFrame(animate);
}
