let objArray = [];

document.addEventListener('mousedown', newObj);

function newObj(event) {
  let x = event.clientX
  let y = event.clientY
  
  let newObject = {X: x, Y:y,};

  objArray.push(newObject);

  asdf()
}

function asdf() {
    console.log(objArray);
}