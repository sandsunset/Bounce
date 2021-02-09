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

function newObj(event) {
  let x = event.clientX
  let y = event.clientY
  
  let newObject = {'x': x, 'y':y, 'speedX' :1, 'speedY': 1};

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
        windowCollisions(object);
    }

    window.requestAnimationFrame(render);
}

render();