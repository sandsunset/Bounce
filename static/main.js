let objArray = [];

document.addEventListener('mousedown', newObj);

function newObj(event) {
  let x = event.clientX
  let y = event.clientY
  
  let newObject = {'x': x, 'y':y, 'speedX' :10, 'speedY': 10};

  objArray.push(newObject);

  // render();
}

function render() {
    for (let object of objArray) {
        let X = object['x'];
        let Y = object['y'];

        drawObj(X,Y);
    }

    ctx.clearRect(0,0,canvas.width,canvas.height);
    window.requestAnimationFrame(render);
}

render();