

import ShipImage from './shipImage';
import Ship from './ship';
import Ship2 from './ship2';
import Junk from './junk';
import Junk2 from './junk2';

document.addEventListener("DOMContentLoaded", () => {
  let canvas = document.getElementById("canvas");
  let ctx = canvas.getContext("2d");
  let music = document.getElementsByClassName("musicControls");

  // images/swordfish1.png
  // we create the ship image object and its two hitboxes (which are invisible)
  let shipImage = new ShipImage(100, 100, "images/swordfish1.png", 250, 355, "image");
  let ship2 = new Ship2(100, 12, "pink", 250, 402, "not-image");
  let ship = new Ship(12, 100, "blue", 293, 355, "not-image");
  // ship's x is +37 of ship2's and shipImage's x

  let interval;
  // music begin playing when the canvas starts
  function start() {
    interval = setInterval(refresh, 20);
  }

  let begin = document.getElementsByClassName("startButton");
  begin[0].addEventListener('click', hideSplash);

  function hideSplash() {
    $('.splashScreen').hide();
    music[0].autoplay = "true";
    $(".controlsMenu").animate({marginLeft: "745px"});
    muteSound();
    start();
  }

  window.addEventListener('keypress', function(e) {
    if (e.keyCode === 109) {
      muteSound();
    }
  });

  window.addEventListener('keypress', function(e) {
    if (e.keyCode === 112) {
      pause();
    }
  });

  let unpauseButton = document.getElementsByClassName("unpauseButton");
  unpauseButton[0].addEventListener('click', pause);

  let paused = false;
  function pause() {
    if (paused === false) {
      paused = true;
      ctx.filter = "blur(3px)";
      muteSound();
      refresh();
      $('.pauseMenu').show();
      clearInterval(interval);
    } else {
      ctx.filter = "none";
      $('.pauseMenu').hide();
      muteSound();
      start();
      paused = false;
    }
  }

  let mute = document.getElementsByClassName("muteButton");
  mute[0].addEventListener('click', muteSound);


  function muteSound() {
    if (music[0].paused === false) {
      music[0].pause();
      $('.muteButton').attr("src", "images/volOff.png");
    } else {
      music[0].play();
      $('.muteButton').attr("src", "images/volOn.png");
    }

  }

  // bundle.js
  // bundle.js.map

  let restart = document.getElementsByClassName('restartButton');
  restart[0].addEventListener('click', restartFunc);

  // restarts the game
  function restartFunc() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // images/swordfish1.png
    shipImage = new ShipImage(100, 100, "images/swordfish1.png", 250, 355, "image");
    ship2 = new Ship2(100, 12, "pink", 250, 400, "not-image");
    ship = new Ship(12, 100, "blue", 293, 355, "not-image");
    spaceJunks = [];
    spaceJunks2 = [];
    interval = setInterval(refresh, 20);
    $('.restartMenu').hide();
  }

  // the endgame should be passed 'interval' to end the current round
  // this needs to be cleaned up
  function endGame(loop) {
    $('.restartMenu').show();
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
    shipImage.stopPos();
    ship2.stopPos();
    ship.stopPos();
  }
);

function detectCollission(spaceJunks) {
  if (ship.collission(spaceJunks) || ship2.collission(spaceJunks)) {
    endGame(interval);
  }
}

// to create a vertical scroll for the background
// we need to rerender the bg image again and again
  let canvasWidth = 600;
  let canvasHeight = 600;
  let img = new Image();
      img.src = "./images/bgimage.jpg";
  let velocity1 = 0;
  let velocity2 = -600;

  let spaceJunks = [];
  let spaceJunks2 = [];

  function refresh() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // redraws the background over and over for us
    ctx.drawImage(img, 0, velocity1);
    ctx.drawImage(img, 0, velocity2);

    velocity1 += 3;
    velocity2 += 3;
      if (velocity1 >= (canvasHeight)) {
        velocity1 = -700;
       }
      if (velocity2 >= (canvasHeight)) {
        velocity2 = -700;
       }

    shipImage.update(ctx);
    ship.update(ctx);
    ship2.update(ctx);

    for (var i = 0; i < spaceJunks.length; i++) {
      detectCollission(spaceJunks[i]);
    }

    frame += 1;
    if (frame === 2 || everyInterval(100)) {

      // create a random spot for the space junk to originate from
      // the second to last element controls the x where it will be
      // generated
      let RandomX = Math.floor(Math.random() * 600);

      // let's see if we can create two identical objects, one for the hitbox
      // and one for the image

      // images/asteroid-icon.png
      spaceJunks.push(new Junk(30, 30, "pink", RandomX, 0, "not-image"));
      spaceJunks2.push(new Junk2(30, 30, "images/asteroid-icon.png", RandomX - 25, 0 - 26, "image"));
      for (var k = 0; k < spaceJunks.length; k++) {
        // destroy objects if they are past the bottom of the screen, thus saving space
        if (spaceJunks[k].y > 550) {
          spaceJunks.shift();
          spaceJunks2.shift();
        }
      }
    }

    for (var j = 0; j < spaceJunks.length; j++) {
      spaceJunks[j].y += 1;
      spaceJunks2[j].y += 1;
      spaceJunks[j].update(ctx);
      spaceJunks2[j].update(ctx);
    }

    if (keys[65] || keys[37]) {
      ship.moveLeft();
      ship2.moveLeft();
      shipImage.moveLeft();
    }

    if (keys[68] || keys[39]) {
      ship.moveRight();
      ship2.moveRight();
      shipImage.moveRight();
    }

    if (keys[87] || keys[38]) {
      ship.moveUp();
      ship2.moveUp();
      shipImage.moveUp();
    }

    if (keys[83] || keys[40]) {
      ship.moveDown();
      ship2.moveDown();
      shipImage.moveDown();
    }

    ship2.pos();
    ship.pos();
    shipImage.pos();
  }

});
