let objArray = [];

document.addEventListener('mousedown', newObj);

function newObj(event) {
  let x = event.clientX
  let y = event.clientY
  
  let newObject = {'x': x, 'y':y};

  objArray.push(newObject);

  render();
}

function render() {
    for (let object of objArray) {
        let X = object['x'];
        let Y = object['y'];

        drawObj(X,Y);
    }
}