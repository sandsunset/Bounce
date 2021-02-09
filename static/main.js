let objArray = [];

document.addEventListener('mousedown', newObj);

function newObj(event) {
  let x = event.clientX
  let y = event.clientY
  
  let newObject = {'x': x, 'y':y, 'speedX' :1, 'speedY': 1};

  objArray.push(newObject);

  // render();
}

function render() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
    for (let object of objArray) {
        let X = object['x'];
        let Y = object['y'];

        let speedX = object['speedX'];
        let speedY = object['speedY'];
        drawObj(X,Y);

        object['x'] = X + speedX;
        object['y'] = Y + speedY;
    }

    window.requestAnimationFrame(render);
}

render();