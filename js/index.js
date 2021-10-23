const canvas = document.getElementById('game');
const snk = canvas.getContext('2d');

const img = new Image();
img.src = 'images/body_snakes.png';

const apple = new Image();
apple.src = 'images/apple.png';

const headSnake = new Image();
headSnake.src = 'images/head_snake.png';


const sizeBox = 32;
let result = 0;
let route

document.addEventListener('keydown', clickKey)

function clickKey(event) {
    if (event.keyCode == 37 && route != "right")
        route = "left";
    else if (event.keyCode == 38 && route != "down")
        route = "up";
    else if (event.keyCode == 39 && route != "left")
        route = "right";
    else if (event.keyCode == 40 && route != "up")
        route = "down";
}

let coordinatesSnake = [];
coordinatesSnake[0] = {
    x: 9 * sizeBox,
    y: 10 * sizeBox
}


let coordinatesApple = {
    x: Math.floor(Math.random() * 17 + 1) * sizeBox,
    y: Math.floor(Math.random() * 15 + 3) * sizeBox,
}



function paintAll() {
    snk.drawImage(img, 0, 0);
    snk.drawImage(apple, coordinatesApple.x, coordinatesApple.y);
    snk.drawImage(headSnake, coordinatesSnake[0].x, coordinatesSnake[0].y)

    snk.fillStyle = 'white';
    snk.font = '50px Arial'
    snk.fillText(result, 2 * sizeBox, 1.7 * sizeBox)

}




setInterval(paintAll, 100)