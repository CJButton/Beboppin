

import Ship from './ship';
import Junk from './junk';

document.addEventListener("DOMContentLoaded", () => {
  let canvas = document.getElementById("canvas");
  let ctx = canvas.getContext("2d");
  // what does this do exactly?
  document.body.insertBefore(canvas, document.body.childNodes[0]);

  // we instantiate the ship outside of the function, so that all functions
  // can see it
  let ship = new Ship(30, 30, "red", 450, 450, ctx);
  let junk = new Junk(10, 10, "blue", 75, 5, ctx);

  // ctx.font="20px Georgia";
  // ctx.fillText("Hello World!",10,50);

  function start() {
    // calls the refresh function
    // setInterval does call refresh every 20ms!
    let interval = setInterval(refresh, 20);
  }

  let keys = [];

  window.addEventListener('keydown', function(e) {
    keys[e.keyCode] = true;
  });

  window.addEventListener('keyup', function(e) {
    keys[e.keyCode] = false;
    ship.stopPos();
  }
);
  // will keep the board refreshing for us
  function refresh() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    junk.pos();
    ship.update(ctx);
    junk.update(ctx);
    console.log(keys);
    if (keys[65]) {
      ship.moveLeft();
    }

    if (keys[68]) {
      ship.moveRight();
    }

    if (keys[87]) {
      ship.moveUp();
    }

    if (keys[83]) {
      ship.moveDown();
    }
    ship.pos();
  }



  //
  // window.addEventListener('keypress', function(e) {
  //   console.log("event keypress");
  //   console.log(e.keyCode);
  //   if (e.keyCode === 97) {
  //     ship.moveLeft();
  //   } else if (e.keyCode === 100) {
  //     ship.moveRight();
  //   }
  // });


  start();

});
