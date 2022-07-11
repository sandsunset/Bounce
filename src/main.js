canvas = document.getElementById("myCanvas");
ctx = canvas.getContext("2d");

let objArray = [];
let previousObject;

document.addEventListener('mousedown', newObj);

const colors = [
  "#425af5", // blue
  "#2ECC71", // green
  "#E74C3C", // red
  "#F4D03F", // yellow
  "#8E44AD"  // violet
]

function randomColor() {
  const random_num = Math.floor(Math.random() * 5)

  return colors[random_num]
}

function drawBall(Xx,Yy, color) {
  ctx.beginPath();
  ctx.arc(Xx,Yy,20,0,Math.PI *2);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();
  // ctx.strokeStyle = 'rgba(0, 0, 0, 0.6)';
  // ctx.stroke();
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

function ballCollisions(object1, object2) {
  let { x: x1, y: y1 } = object1;
  let { x: x2, y: y2 } = object2;

  let { speedX: speedX1, speedY: speedY1 } = object1;
  let { speedX: speedX2, speedY: speedY2 } = object2;

  const distanceBetweenObjects = distance(x1,y1,x2,y2);
  const sinTheta = Math.abs(y1 - y2) / distanceBetweenObjects;
  const cosTheta = Math.abs(x1 - x2) / distanceBetweenObjects;

  const mass = Math.PI * 400;
  const verticalReactionSpeedX1 = speedX2 * cosTheta + speedY2 * sinTheta;
  const verticalReactionSpeedX2 = speedX1 * cosTheta + speedY1 * sinTheta;
  const verticalReactionSpeedY1 = speedY1 * cosTheta - speedX1 * sinTheta;
  const verticalReactionSpeedY2 = speedY2 * cosTheta - speedX2 * sinTheta;

  const reactionSpeedX1 = verticalReactionSpeedX1 * cosTheta - verticalReactionSpeedY1 * sinTheta;
  const reactionSpeedY1 = verticalReactionSpeedX1 * sinTheta + verticalReactionSpeedY1 * cosTheta;
  const reactionSpeedX2 = verticalReactionSpeedX2 * cosTheta - verticalReactionSpeedY2 * sinTheta;
  const reactionSpeedY2 = verticalReactionSpeedX2 * sinTheta + verticalReactionSpeedY2 * cosTheta;

  object1['speedX'] = reactionSpeedX1;
  object1['speedY'] = reactionSpeedY1;
  object1['speedX'] = reactionSpeedX2;
  object1['speedY'] = reactionSpeedY2;
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
  let x = event.clientX;
  let y = event.clientY;
  
  let newObject = {'x': x, 'y':y, 'speedX' :0, 'speedY': 0, 'color': randomColor()};

  objArray.push(newObject);
}

function render() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
    for (const i in objArray) {
      let object = objArray[i]
      let X = object['x'];
      let Y = object['y'];

      let speedX = object['speedX'];
      let speedY = object['speedY'];
      drawBall(X,Y, object['color']);
      object['x'] = X + speedX;
      object['y'] = Y + speedY;

      for (const j in objArray) {
        if (j != i && (distance(X, Y, objArray[j]["x"], objArray[j]["y"]) - 40 <= 0)) {
          ballCollisions(object, objArray[j]);

          // objArray[i]["speedX"] *= 1.01;
          // objArray[i]["speedY"] *= 1.01;
          // objArray[j]["speedX"] *= 1.01;
          // objArray[j]["speedY"] *= 1.01;
        }
      }
      // if ((previousObject !== undefined) && (distance(X,Y,previousObject['x'],previousObject['y']) - 40 <= 0)) {
      //   console.log("col")
      //   console.log(object, previousObject)
      //   ballCollisions(object, previousObject);
      // }

      windowCollisions(object);
      gravity(object);
      previousObject = object;
    }

    window.requestAnimationFrame(render);
}

render();