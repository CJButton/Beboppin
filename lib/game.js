

import Ship from './ship';
import Junk from './junk';

document.addEventListener("DOMContentLoaded", () => {
  let canvas = document.getElementById("canvas");
  let ctx = canvas.getContext("2d");
  let music = document.getElementsByClassName("musicControls");
  // what does this do exactly?
  document.body.insertBefore(canvas, document.body.childNodes[0]);

  // images/swordfish1.png
  let ship = new Ship(75, 75, "images/swordfish1.png", 250, 400, "image");

  let interval;
  function start() {
    interval = setInterval(refresh, 20);
    // music[0].autoplay = "true";
  }

  function hideSplash() {
    $('.splashScreen').hide();
    start();
  }

  // listening for the player to click the 'let's Jam' button
  // will go to the changeZLevels function, which will change which
  // level is being displayed;
  let begin = document.getElementsByClassName("startButton");
  begin[0].addEventListener('click', hideSplash);

  window.addEventListener('keypress', function(e) {
    console.log(e.keyCode);
    if (e.keyCode === 109) {
      muteSound();
    }
  });

  window.addEventListener('keypress', function(e) {
    if (e.keyCode === 112) {
      pause();
    }
  });

  let paused = false;
  function pause() {
    if (paused === false) {
      paused = true;
      $('.pauseMenu').show();
      clearInterval(interval);
    } else {
      $('.pauseMenu').hide();
      start();
      // setInterval(interval, 20); //not unpausing properly
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
    // (music[0].paused === false ? music[0].pause() : music[0].play())
  }

  let restart = document.getElementsByClassName('restartButton');
  restart[0].addEventListener('click', restartFunc);

  // restart the game
  function restartFunc() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ship = new Ship(75, 75, "images/swordfish1.png", 250, 400, "image");
    spaceJunks = [];
    interval = setInterval(refresh, 20);
  }

  // the endgame should be passed 'interval' to end the current round
  function endGame(loop) {
    $('.pauseMenu').show();
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
      detectCollission(spaceJunks[i]);
    }

    frame += 1;
    if (frame === 2 || everyInterval(100)) {

      // create a random spot for the space junk to originate from
      // the second to last element controls the x where it will be
      // generated
      let RandomX = Math.floor(Math.random() * 450);
      // let ship = new Ship(100, 100, "images/swordfish1.png", 450, 450, "image");
      spaceJunks.push(new Junk(30, 30, "images/asteroid-icon.png", RandomX, 0, "image"));
      for (var k = 0; k < spaceJunks.length; k++) {
        // destroy objects if they are past the bottom of the screen, thus saving space
        if (spaceJunks[k].y > 550) {
          spaceJunks.shift();
        }
      }
    }

    for (var j = 0; j < spaceJunks.length; j++) {
      spaceJunks[j].y += 1;
      spaceJunks[j].update(ctx);
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

    ship.pos();
  }

});
