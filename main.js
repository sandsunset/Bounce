canvas = document.getElementById("myCanvas");
ctx = canvas.getContext("2d");

let objArray = [];

document.addEventListener('mousedown', newObj);

function drawBall(Xx,Yy) {
  ctx.beginPath();
  ctx.arc(Xx,Yy,20,0,Math.PI *2);
  ctx.fillStyle = "#425af5"
  ctx.fill();
  ctx.closePath();
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.6)';
  ctx.stroke();
}

window.addEventListener("resize", resize);
resize();

function resize() {
  stageWidhth = document.body.clientWidth;
  stageHeight = document.body.clientHeight;

  canvas.width = stageWidhth *2;
  canvas.height = stageHeight *2;
  ctx.scale(2,2);
  
  render();
}

function distance(x1,y1,x2,y2) {
  return Math.sqrt(Math.pow(x1-x2, 2) + Math.pow(y1-y2, 2));
}

function windowCollisions(object) {
  let minWidth = 20;
  let minHeight = 20;
  let maxWidth = document.body.clientWidth - 20;
  let maxHeight = document.body.clientHeight - 20;

  let x = object['x'];
  let y = object['y'];
  let speedX = object['speedX'];
  let speedY = object['speedY'];

  if(x >= maxWidth ||  x <= minWidth) {
    object['speedX'] = speedX * -1;
  }
  else if(y >= maxHeight || y <= minHeight) {
    object['speedY'] = speedY * -1;
  }
}

function gravity(object) {
  let speedX = object['speedX'];
  let speedY = object['speedY'];
  let y = object['y'];

  let ground = document.body.clientHeight -20;

  speedX *= 0.99;
  speedY *= 0.99;
  // acceleration = 400 / speedY;
  // speedY += acceleration;
  if(y < ground) {
     speedY += y / 8000;
  }

  object['speedX'] = speedX;
  object['speedY'] = speedY;
}

function newObj(event) {
  let x = event.clientX
  let y = event.clientY
  
  let newObject = {'x': x, 'y':y, 'speedX' :0, 'speedY': 0};

  objArray.push(newObject);

}

function render() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
    for (let object of objArray) {
        let X = object['x'];
        let Y = object['y'];

        let speedX = object['speedX'];
        let speedY = object['speedY'];
        drawBall(X,Y);

        object['x'] = X + speedX;
        object['y'] = Y + speedY;

        ballCollisions(object,previousObject);

        gravity(object);
        windowCollisions(object);

        let previousObject = object;
    }

    window.requestAnimationFrame(render);
}

render();