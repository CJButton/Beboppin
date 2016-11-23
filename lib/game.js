

import Ship from './ship';
import Asteroid from './asteroid';


document.addEventListener("DOMContentLoaded", () => {
  let canvas = document.getElementById("canvas");
  let ctx = canvas.getContext("2d");
  // what does this do exactly?
  document.body.insertBefore(canvas, document.body.childNodes[0]);

  // we instantiate the ship outside of the function, so that all functions
  // can see it
  let ship = new Ship(50, 50, "red", 50, 50);

  ctx.font="20px Georgia";
  ctx.fillText("Hello World!",10,50);

  function start() {
    // calls the refresh function
    // setInterval does call refresh every 20ms!
    let interval = setInterval(refresh, 20);
    // ctx.fillStyle = ship.color;
    // ctx.fillRect(ship.x, ship.y, ship.width, ship.height);
  }

  // will keep the board refreshing for us
  function refresh() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = ship.color;
    ctx.fillRect(ship.x, ship.y, ship.width, ship.height);

    ctx.font="20px Georgia";
    ctx.fillText("Hello World!", 10, 50);
  }


  start();


});
