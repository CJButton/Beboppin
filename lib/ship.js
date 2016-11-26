

class Ship {
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
      let junkStarboard = spaceJunk.x + spaceJunk.width;
      let junkPort = spaceJunk.x;
      let junkBow = spaceJunk.y;
      let junkStern = spaceJunk.y + spaceJunk.height;

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
      if (this.speedY > -8) {
        this.speedY -= 2;
      }
    }

    moveDown() {
      if (this.speedY < 8) {
        this.speedY += 2;
      }
    }

    update(ctx) {
      // if an image is provided, then use the drawImage function
      if (this.type === "image") {
        ctx.drawImage(
          this.image,
          this.x,
          this.y,
          this.width,
          this.height);
      } else {
        // if no image is provided
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }
}

export default Ship;
