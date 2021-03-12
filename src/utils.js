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

console.log('hello')