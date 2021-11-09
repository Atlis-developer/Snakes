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

    for (let i = 0; i < coordinatesSnake.length; i++) {
        if (i == 0) {
            snk.drawImage(headSnake, coordinatesSnake[i].x, coordinatesSnake[i].y)
        }else{
            snk.fillStyle = '#269926';
            snk.fillRect(coordinatesSnake[i].x, coordinatesSnake[i].y, sizeBox, sizeBox);
        }    
    }
    
    snk.fillStyle = 'white';
    snk.font = '50px Arial';
    snk.fillText(result, 2 * sizeBox, 1.7 * sizeBox);

    let headSnakeX = coordinatesSnake[0].x;
    let headSnakeY = coordinatesSnake[0].y;

    if (coordinatesApple.x == headSnakeX && coordinatesApple.y == headSnakeY) {
        result++;
        coordinatesApple = {
            x: Math.floor(Math.random() * 17 + 1) * sizeBox,
            y: Math.floor(Math.random() * 15 + 3) * sizeBox,
        };
    } else {
        coordinatesSnake.pop()
    }



    switch (route) {
        case 'left':
            headSnakeX -= sizeBox;
            break;
        case 'right':
            headSnakeX += sizeBox;
            break;
        case 'up':
            headSnakeY -= sizeBox;
            break;
        case 'down':
            headSnakeY += sizeBox;
            break;
    }

    if(headSnakeX < 0 || headSnakeX > (sizeBox * 18) + 1 ||  headSnakeY < sizeBox * 2 ||         headSnakeY > (sizeBox * 18) + 3){
        clearInterval(game);
        alert('You lose!')
    }

    let newHeadSnake = {
        x: headSnakeX,
        y: headSnakeY
    };

    for (let i = 0; i < coordinatesSnake.length; i++) {
        if(coordinatesSnake[i].x == newHeadSnake.x && coordinatesSnake[i].y == newHeadSnake.y){
            clearInterval(game);
            alert('You lose!')
        }
        
    }

    coordinatesSnake.unshift(newHeadSnake)
}




let game = setInterval(paintAll, 200)