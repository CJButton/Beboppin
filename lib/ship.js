

class Ship {
  constructor(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.color = color;
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.speedY = 0;
    }

    // will check if an object has collided with the ship
    collission(spaceJunk) {
      console.log("collission check");
      // need to deduce ship's size
      let starboard = this.x + this.width;
      let port = this.x;
      let bow = this.y;
      let stern = this.y + this.height;

      // we find the size of the space junk
      let junkStarboard = spaceJunk.x + spaceJunk.width;
      let junkPort = spaceJunk.x;
      let junkBow = spaceJunk.y;
      let junkStern = spaceJunk.y + spaceJunk.height;

      // if (junkStern >= bow) {
      //   return true;
      // }

      // now we detect for a collission
      if ((junkStern >= bow && junkBow <= stern) &&
        ((junkStarboard >= port && junkStarboard <= starboard) ||
        (junkPort <= starboard && junkStarboard >= port))){
        return true;
      }
      return false;
    }

    pos() {
      this.x += this.speedX;
      this.y += this.speedY;
    }

    stopPos() {
      this.speedX = 0;
      this.speedY = 0;
    }

    moveLeft() {
      if (this.speedX > -8) {
        this.speedX -= 4;
      }
    }

    moveRight() {
      if (this.speedX < 8) {
        this.speedX += 4;
      }
    }

    moveUp() {
      console.log("in moveUp");
      if (this.speedY > -8) {
        this.speedY -= 2;
      }
    }

    moveDown() {
      console.log("in moveDown");
      if (this.speedY < 8) {
        this.speedY += 2;
      }
    }

    update(ctx) {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

export default Ship;
