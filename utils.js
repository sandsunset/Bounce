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