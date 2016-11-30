

class Ship2 {
  constructor(width, height, color, x, y, type) {
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
    collission(spaceJunk) {
      // need to deduce ship's size
      let starboard = this.x + this.width;
      let port = this.x;
      let bow = this.y;
      let stern = this.y + this.height;

      // we find the size of the space junk
      let junkPort = spaceJunk.x;
      let junkBow = spaceJunk.y;
      let junkRad = 16;

      // now we need to find the center of both objects
      let xDistance = Math.abs(spaceJunk.x - this.x - this.width/2);
      let yDistance = Math.abs(spaceJunk.y - this.y - this.height/2);

      if (xDistance > (this.width/2 + junkRad)) {return false;}
      if (yDistance > (this.height/2 + junkRad)) {return false;}

      if (xDistance <= (this.width/2 + junkRad)) {return true;}
      if (yDistance <= (this.height/2 + junkRad)) {return true;}

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

    pos() {
      if (this.x + this.speedX < 510 && this.x + this.speedX > 0) {
        this.x += this.speedX;
      }

      if (this.y + this.speedY < 550 && this.y + this.speedY > 50) {
        this.y += this.speedY;
      }
      // this.x += this.speedX;
      // this.y += this.speedY;
    }

    stopPos() {
      this.speedX = 0;
      this.speedY = 0;
    }

    moveLeft() {
      if (this.speedX > -8) {
        this.speedX -= 1.5;
      }
    }

    moveRight() {
      if (this.speedX < 8) {
        this.speedX += 1.5;
      }
    }

    moveUp() {
      if (this.speedY > -8) {
        this.speedY -= 1.5;
      }
    }

    moveDown() {
      if (this.speedY < 8) {
        this.speedY += 1.5;
      }
    }

    update(ctx) {
      //   // if an image is provided, then use the drawImage function
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
    }
}


export default Ship2;
