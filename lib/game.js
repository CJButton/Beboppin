

import Ship from './ship';
import Asteroid from './asteroid';


document.addEventListener("DOMContentLoaded", () => {
  let canvas = document.getElementById("canvas");
  let ctx = canvas.getContext("2d");
  // what does this do exactly?
  document.body.insertBefore(canvas, document.body.childNodes[0]);

  function start() {
  console.log(canvas);
  console.log(ctx);
  console.log("DOM has loaded");
  let ship = new Ship(50, 50, "red", 50, 50);
  ctx.font="20px Georgia";
  console.log(ctx);
  ctx.fillText("Hello World!",10,50);
  }


  start();


});
