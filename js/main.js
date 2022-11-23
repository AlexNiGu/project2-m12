import { AppController} from './AppController.js';

var uiRoot = document.getElementById('root-ui');
var myAppControl = new AppController(uiRoot);

function animate() {
    myAppControl.draw();
    myAppControl.update();
    requestAnimationFrame(animate);
}
animate();
