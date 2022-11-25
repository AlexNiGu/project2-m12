// import { AppController} from './AppController.js';

// var uiRoot = document.getElementById('root-ui');
// var myAppControl = new AppController(uiRoot);

const container = document.getElementById('container')

/**LOGIN */


const buttonLogin = document.getElementById('button-login')
const user = document.getElementById('user').value
const password = document.getElementById('password').value

var cuerpo = {
    "Nombre": user,
    "Password": password
}


buttonLogin.addEventListener('click',async ()=>{

    console.log(formDataLogin)
    var options = {
        method:'post',
        headers:{
            "Accept": "application/json",
            "Content-Type":"application/json"},
        body: JSON.stringify(cuerpo)
    }

    await fetch('http://localhost:3000/login',options)
    .then(res=>res.json())
    .then(response=>console.log(response))


})








function animate() {
    myAppControl.draw();
    myAppControl.update();
    requestAnimationFrame(animate);
}
// animate();
