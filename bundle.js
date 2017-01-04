/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _shipImage = __webpack_require__(1);
	
	var _shipImage2 = _interopRequireDefault(_shipImage);
	
	var _ship = __webpack_require__(2);
	
	var _ship2 = _interopRequireDefault(_ship);
	
	var _ship3 = __webpack_require__(3);
	
	var _ship4 = _interopRequireDefault(_ship3);
	
	var _junk = __webpack_require__(4);
	
	var _junk2 = _interopRequireDefault(_junk);
	
	var _junk3 = __webpack_require__(5);
	
	var _junk4 = _interopRequireDefault(_junk3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	document.addEventListener("DOMContentLoaded", function () {
	  var canvas = document.getElementById("canvas");
	  var ctx = canvas.getContext("2d");
	  var music = document.getElementsByClassName("musicControls");
	  // what does this do exactly?
	  document.body.insertBefore(canvas, document.body.childNodes[0]);
	
	  // images/swordfish1.png
	  // we create the ship image object and its two hitboxes (which are invisible)
	  var shipImage = new _shipImage2.default(100, 100, "images/swordfish1.png", 250, 355, "image");
	  var ship2 = new _ship4.default(100, 12, "pink", 250, 402, "not-image");
	  var ship = new _ship2.default(12, 100, "blue", 293, 355, "not-image");
	  // ship's x is +37 of ship2's and shipImage's x
	
	  var interval = void 0;
	  // music begin playing when the canvas starts
	  function start() {
	    interval = setInterval(refresh, 20);
	  }
	
	  var begin = document.getElementsByClassName("startButton");
	  begin[0].addEventListener('click', hideSplash);
	
	  function hideSplash() {
	    $('.splashScreen').hide();
	    music[0].autoplay = "true";
	    muteSound();
	    $(".controlsMenu").animate({ width: 'toggle' }, 1000);
	    start();
	  }
	
	  window.addEventListener('keypress', function (e) {
	    if (e.keyCode === 109) {
	      muteSound();
	    }
	  });
	
	  window.addEventListener('keypress', function (e) {
	    if (e.keyCode === 112) {
	      pause();
	    }
	  });
	
	  var unpauseButton = document.getElementsByClassName("unpauseButton");
	  unpauseButton[0].addEventListener('click', pause);
	
	  var paused = false;
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
	
	  var mute = document.getElementsByClassName("muteButton");
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
	
	  var restart = document.getElementsByClassName('restartButton');
	  restart[0].addEventListener('click', restartFunc);
	
	  // restarts the game
	  function restartFunc() {
	    ctx.clearRect(0, 0, canvas.width, canvas.height);
	    // images/swordfish1.png
	    shipImage = new _shipImage2.default(100, 100, "images/swordfish1.png", 250, 355, "image");
	    ship2 = new _ship4.default(100, 12, "pink", 250, 400, "not-image");
	    ship = new _ship2.default(12, 100, "blue", 293, 355, "not-image");
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
	
	  var keys = [];
	  var frame = 0;
	
	  function everyInterval(n) {
	    if (frame / n % 1 === 0) {
	      return true;
	    }
	    return false;
	  }
	
	  window.addEventListener('keydown', function (e) {
	    keys[e.keyCode] = true;
	  });
	
	  window.addEventListener('keyup', function (e) {
	    keys[e.keyCode] = false;
	    shipImage.stopPos();
	    ship2.stopPos();
	    ship.stopPos();
	  });
	
	  function detectCollission(spaceJunks) {
	    if (ship.collission(spaceJunks) || ship2.collission(spaceJunks)) {
	      endGame(interval);
	    }
	  }
	
	  // to create a vertical scroll for the background
	  // we need to rerender the bg image again and again
	  var canvasWidth = 600;
	  var canvasHeight = 600;
	  var img = new Image();
	  img.src = "./images/bgimage.jpg";
	  var velocity1 = 0;
	  var velocity2 = -600;
	
	  var spaceJunks = [];
	  var spaceJunks2 = [];
	
	  function refresh() {
	    ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	    // redraws the background over and over for us
	    ctx.drawImage(img, 0, velocity1);
	    ctx.drawImage(img, 0, velocity2);
	
	    velocity1 += 3;
	    velocity2 += 3;
	    if (velocity1 >= canvasHeight) {
	      velocity1 = -700;
	    }
	    if (velocity2 >= canvasHeight) {
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
	      var RandomX = Math.floor(Math.random() * 600);
	
	      // let's see if we can create two identical objects, one for the hitbox
	      // and one for the image
	
	      // images/asteroid-icon.png
	      spaceJunks.push(new _junk2.default(30, 30, "pink", RandomX, 0, "not-image"));
	      spaceJunks2.push(new _junk4.default(30, 30, "images/asteroid-icon.png", RandomX - 25, 0 - 26, "image"));
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

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var ShipImage = function () {
	  function ShipImage(width, height, color, x, y, type) {
	    _classCallCheck(this, ShipImage);
	
	    this.width = width;
	    this.height = height;
	    this.color = color;
	    this.x = x;
	    this.y = y;
	    this.type = type;
	    if (this.type === "image") {
	      this.image = new Image();
	      this.image.src = color;
	    }
	    this.speedX = 0;
	    this.speedY = 0;
	  }
	
	  // will check if an object has collided with the ship
	
	
	  _createClass(ShipImage, [{
	    key: "pos",
	    value: function pos() {
	      // this.x += this.speedX;
	      // console.log(this.x + this.speedX);
	
	
	      // limiters to movement
	      if (this.x + this.speedX <= 600 - this.width && this.x + this.speedX > 0) {
	        this.x += this.speedX;
	      }
	
	      if (this.y + this.speedY < 500 && this.y + this.speedY > 0) {
	        this.y += this.speedY;
	      }
	      // this.x += this.speedX;
	      // this.y += this.speedY;
	    }
	  }, {
	    key: "stopPos",
	    value: function stopPos() {
	      this.speedX = 0;
	      this.speedY = 0;
	    }
	  }, {
	    key: "moveLeft",
	    value: function moveLeft() {
	      if (this.speedX > -8) {
	        this.speedX -= 1.5;
	      }
	    }
	  }, {
	    key: "moveRight",
	    value: function moveRight() {
	      if (this.speedX < 8) {
	        this.speedX += 1.5;
	      }
	    }
	  }, {
	    key: "moveUp",
	    value: function moveUp() {
	      if (this.speedY > -8) {
	        this.speedY -= 1.5;
	      }
	    }
	  }, {
	    key: "moveDown",
	    value: function moveDown() {
	      if (this.speedY < 8) {
	        this.speedY += 1.5;
	      }
	    }
	  }, {
	    key: "update",
	    value: function update(ctx) {
	      // if an image is provided, then use the drawImage function
	      if (this.type === "image") {
	        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
	      } else {
	        // if no image is provided
	        ctx.fillStyle = this.color;
	        ctx.fillRect(this.x, this.y, this.width, this.height);
	      }
	    }
	  }]);
	
	  return ShipImage;
	}();
	
	exports.default = ShipImage;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Ship = function () {
	  function Ship(width, height, color, x, y, type) {
	    _classCallCheck(this, Ship);
	
	    this.width = width;
	    this.height = height;
	    this.color = color;
	    this.x = x;
	    this.y = y;
	    this.type = type;
	    if (this.type === "image") {
	      this.image = new Image();
	      this.image.src = color;
	    }
	    this.speedX = 0;
	    this.speedY = 0;
	  }
	
	  // will check if an object has collided with the ship
	  // only useful for TWO square objects
	
	
	  _createClass(Ship, [{
	    key: "collission",
	    value: function collission(spaceJunk) {
	      // need to deduce ship's size
	      // let starboard = (this.x - 12.5) + 50;
	      // let port = (this.x + 12.5);
	      // let bow = this.y;
	      // let stern = this.y + this.height;
	
	      // we find the size of the space junk
	      var junkPort = spaceJunk.x;
	      var junkBow = spaceJunk.y;
	      var junkRad = 16;
	
	      // now we need to find the center of both objects
	      var xDistance = Math.abs(spaceJunk.x - this.x - this.width / 2);
	      var yDistance = Math.abs(spaceJunk.y - this.y - this.height / 2);
	
	      if (xDistance > this.width / 2 + junkRad) {
	        return false;
	      }
	      if (yDistance > this.height / 2 + junkRad) {
	        return false;
	      }
	      //
	      if (xDistance <= this.width / 2 + junkRad) {
	        return true;
	      }
	      if (yDistance <= this.height / 2 + junkRad) {
	        return true;
	      }
	      // now we detect for a collission
	      // if ((junkStern >= bow && junkBow <= stern - 5) &&
	      //   ((junkStarboard >= port && junkStarboard <= starboard) ||
	      //   (junkPort <= starboard && junkStarboard >= port))){
	      //   return true;
	      // }
	      // return false;
	    }
	  }, {
	    key: "pos",
	    value: function pos() {
	      // this.x += this.speedX;
	      // console.log(this.x + this.speedX);
	
	
	      // limiters to movement
	      // && this.x + this.speedX + this.width > 37
	      if (this.x + this.speedX < 543 && this.x + this.speedX > 43) {
	        this.x += this.speedX;
	      }
	
	      if (this.y + this.speedY < 500 && this.y + this.speedY > 0) {
	        this.y += this.speedY;
	      }
	      // this.x += this.speedX;
	      // this.y += this.speedY;
	    }
	  }, {
	    key: "stopPos",
	    value: function stopPos() {
	      this.speedX = 0;
	      this.speedY = 0;
	    }
	  }, {
	    key: "moveLeft",
	    value: function moveLeft() {
	      if (this.speedX > -8) {
	        this.speedX -= 1.5;
	      }
	    }
	  }, {
	    key: "moveRight",
	    value: function moveRight() {
	      if (this.speedX < 8) {
	        this.speedX += 1.5;
	      }
	    }
	  }, {
	    key: "moveUp",
	    value: function moveUp() {
	      if (this.speedY > -8) {
	        this.speedY -= 1.5;
	      }
	    }
	  }, {
	    key: "moveDown",
	    value: function moveDown() {
	      if (this.speedY < 8) {
	        this.speedY += 1.5;
	      }
	    }
	  }, {
	    key: "update",
	    value: function update(ctx) {
	      // if an image is provided, then use the drawImage function
	      // if (this.type === "image") {
	      //   ctx.drawImage(
	      //     this.image,
	      //     this.x,
	      //     this.y,
	      //     this.width,
	      //     this.height);
	      // } else {
	      //   // if no image is provided
	      // ctx.fillStyle = this.color;
	      // ctx.fillRect(this.x, this.y, this.width, this.height);
	      // }
	    }
	  }]);
	
	  return Ship;
	}();
	
	exports.default = Ship;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Ship2 = function () {
	  function Ship2(width, height, color, x, y, type) {
	    _classCallCheck(this, Ship2);
	
	    this.width = width;
	    this.height = height;
	    this.color = color;
	    this.x = x;
	    this.y = y;
	    this.type = type;
	    if (this.type === "image") {
	      this.image = new Image();
	      this.image.src = color;
	    }
	    this.speedX = 0;
	    this.speedY = 0;
	  }
	
	  // will check if an object has collided with the ship
	  // only useful for TWO square objects
	
	
	  _createClass(Ship2, [{
	    key: "collission",
	    value: function collission(spaceJunk) {
	      // need to deduce ship's size
	      var starboard = this.x + this.width;
	      var port = this.x;
	      var bow = this.y;
	      var stern = this.y + this.height;
	
	      // we find the size of the space junk
	      var junkPort = spaceJunk.x;
	      var junkBow = spaceJunk.y;
	      var junkRad = 16;
	
	      // now we need to find the center of both objects
	      var xDistance = Math.abs(spaceJunk.x - this.x - this.width / 2);
	      var yDistance = Math.abs(spaceJunk.y - this.y - this.height / 2);
	
	      if (xDistance > this.width / 2 + junkRad) {
	        return false;
	      }
	      if (yDistance > this.height / 2 + junkRad) {
	        return false;
	      }
	
	      if (xDistance <= this.width / 2 + junkRad) {
	        return true;
	      }
	      if (yDistance <= this.height / 2 + junkRad) {
	        return true;
	      }
	
	      // we find the size of the space junk
	      // let junkStarboard = spaceJunk.x + spaceJunk.width;
	      // let junkPort = spaceJunk.x;
	      // let junkBow = spaceJunk.y;
	      // let junkStern = spaceJunk.y + spaceJunk.height;
	
	      // now we detect for a collission
	      // if ((junkStern >= bow - 5 && junkBow <= stern - 5) &&
	      //   ((junkStarboard >= port && junkStarboard <= starboard) ||
	      //   (junkPort <= starboard && junkStarboard >= port))){
	      //   return true;
	      // }
	      // return false;
	    }
	  }, {
	    key: "pos",
	    value: function pos() {
	      if (this.x + this.speedX <= 600 - this.width && this.x + this.speedX > 0) {
	        this.x += this.speedX;
	      }
	
	      if (this.y + this.speedY < 550 && this.y + this.speedY > 50) {
	        this.y += this.speedY;
	      }
	      // this.x += this.speedX;
	      // this.y += this.speedY;
	    }
	  }, {
	    key: "stopPos",
	    value: function stopPos() {
	      this.speedX = 0;
	      this.speedY = 0;
	    }
	  }, {
	    key: "moveLeft",
	    value: function moveLeft() {
	      if (this.speedX > -8) {
	        this.speedX -= 1.5;
	      }
	    }
	  }, {
	    key: "moveRight",
	    value: function moveRight() {
	      if (this.speedX < 8) {
	        this.speedX += 1.5;
	      }
	    }
	  }, {
	    key: "moveUp",
	    value: function moveUp() {
	      if (this.speedY > -8) {
	        this.speedY -= 1.5;
	      }
	    }
	  }, {
	    key: "moveDown",
	    value: function moveDown() {
	      if (this.speedY < 8) {
	        this.speedY += 1.5;
	      }
	    }
	  }, {
	    key: "update",
	    value: function update(ctx) {
	      // if an image is provided, then use the drawImage function
	      //   if (this.type === "image") {
	      //     ctx.drawImage(
	      //       this.image,
	      //       this.x,
	      //       this.y,
	      //       this.width,
	      //       this.height);
	      //   } else {
	      //     // if no image is provided
	      //   ctx.fillStyle = this.color;
	      //   ctx.fillRect(this.x, this.y, this.width, this.height);
	      // }
	    }
	  }]);
	
	  return Ship2;
	}();
	
	exports.default = Ship2;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Junk = function () {
	  function Junk(width, height, color, x, y, type) {
	    _classCallCheck(this, Junk);
	
	    this.width = width;
	    this.height = height;
	    this.color = "blue";
	    this.x = x;
	    this.y = y;
	    this.type = type;
	    if (this.type === "image") {
	      this.image = new Image();
	      this.image.src = color;
	    }
	
	    this.speedX = 0;
	    this.speedY = 0;
	  }
	
	  _createClass(Junk, [{
	    key: "pos",
	    value: function pos() {
	      this.x += this.speedX;
	      this.y += this.speedY;
	    }
	  }, {
	    key: "stopPos",
	    value: function stopPos() {
	      this.speedX = 0;
	      this.speedY = 0;
	    }
	  }, {
	    key: "moveDown",
	    value: function moveDown() {
	      this.speedY = 1;
	    }
	
	    // on key press, we want to change the x/y of the ship, it's place on the board
	    // so we should pass this to the game file, and
	
	  }, {
	    key: "update",
	    value: function update(ctx) {
	      // if (this.type === "image") {
	      //   ctx.drawImage(
	      //     this.image,
	      //     this.x,
	      //     this.y,
	      //     this.width,
	      //     this.height);
	      // } else {
	      //   ctx.beginPath();
	      //   ctx.arc(this.x,
	      //           this.y,
	      //           16,
	      //           0,
	      //           2 * Math.PI);
	      //   ctx.fillStyle = "green",
	      //   ctx.fill();
	      //   ctx.stroke();
	      // ctx.fillStyle = this.color;
	      // ctx.fillRect(this.x, this.y, this.width, this.height);
	      // }
	    }
	  }]);
	
	  return Junk;
	}();
	
	exports.default = Junk;

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Junk2 = function () {
	  function Junk2(width, height, color, x, y, type) {
	    _classCallCheck(this, Junk2);
	
	    this.width = width;
	    this.height = height;
	    this.color = "blue";
	    this.x = x;
	    this.y = y;
	    this.type = type;
	    if (this.type === "image") {
	      this.image = new Image();
	      this.image.src = color;
	    }
	
	    this.speedX = 0;
	    this.speedY = 0;
	  }
	
	  _createClass(Junk2, [{
	    key: "pos",
	    value: function pos() {
	      this.x += this.speedX;
	      this.y += this.speedY;
	    }
	  }, {
	    key: "stopPos",
	    value: function stopPos() {
	      this.speedX = 0;
	      this.speedY = 0;
	    }
	  }, {
	    key: "moveDown",
	    value: function moveDown() {
	      this.speedY = 1;
	    }
	
	    // on key press, we want to change the x/y of the ship, it's place on the board
	    // so we should pass this to the game file, and
	
	  }, {
	    key: "update",
	    value: function update(ctx) {
	      if (this.type === "image") {
	        ctx.drawImage(this.image, this.x, this.y, this.width * 1.7, this.height * 1.7);
	      } else {
	        ctx.beginPath();
	        ctx.arc(this.x, this.y, 16, 0, 2 * Math.PI);
	        ctx.fillStyle = "green", ctx.fill();
	        ctx.stroke();
	        // ctx.fillStyle = this.color;
	        // ctx.fillRect(this.x, this.y, this.width, this.height);
	      }
	    }
	  }]);
	
	  return Junk2;
	}();
	
	exports.default = Junk2;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map