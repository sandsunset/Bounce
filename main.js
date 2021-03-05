let objArray = [];

document.addEventListener('mousedown', newObj);

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