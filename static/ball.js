canvas = document.getElementById("myCanvas");
ctx = canvas.getContext("2d");

function drawObj(Xx,Yy) {
  ctx.beginPath();
  ctx.arc(Xx,Yy,20,0,Math.PI *2);
  ctx.fillStyle = "#425af5"
  ctx.fill();
  ctx.closePath();
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.6)';
  ctx.stroke();
}