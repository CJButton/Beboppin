

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
  // let junk = new Junk(10, 10, "blue", 75, 5, ctx);

  // ctx.font="20px Georgia";
  // ctx.fillText("Hello World!",10,50);

  let interval = setInterval(refresh, 20);

  // the endgame should be passed 'interval' to end the current round
  function endGame(loop) {
    clearInterval(loop);
  }

  let keys = [];
  let frame = 0;

  function everyInterval(n) {
    if ((frame / n) % 1 === 0) {
      return true;
    }
    return false;
  }

  window.addEventListener('keydown', function(e) {
    keys[e.keyCode] = true;
  });

  window.addEventListener('keyup', function(e) {
    keys[e.keyCode] = false;
    ship.stopPos();
  }
);

function detectCollission(spaceJunks) {
  if (ship.collission(spaceJunks)) {
    endGame(interval);
  }
}


let spaceJunks = [];
  // will keep the board refreshing for us
  function refresh() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ship.update(ctx);

    for (var i = 0; i < spaceJunks.length; i++) {
      console.log(spaceJunks);
      detectCollission(spaceJunks[i]);
    }

    frame += 1;
    if (frame === 1 || everyInterval(100)) {

      // create a random spot for the space junk to originate from
      // the second to last element controls the x where it will be
      // generated
      let RandomX = Math.floor(Math.random() * 450);

      spaceJunks.push(new Junk(25, 25, "green", RandomX, 0));
    }

    for (var i = 0; i < spaceJunks.length; i++) {
      spaceJunks[i].y += 1;
      spaceJunks[i].update(ctx);
    }

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
    // junk.moveDown();

    ship.pos();
  }

});
