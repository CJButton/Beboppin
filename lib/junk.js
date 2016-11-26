


class Junk {
  constructor(width, height, color, x, y, type) {
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

    pos() {
      this.x += this.speedX;
      this.y += this.speedY;
    }

    stopPos() {
      this.speedX = 0;
      this.speedY = 0;
    }

    moveDown() {
      this.speedY = 1;
    }

    // on key press, we want to change the x/y of the ship, it's place on the board
    // so we should pass this to the game file, and
    update(ctx) {
      if (this.type === "image") {
        ctx.drawImage(
          this.image,
          this.x,
          this.y,
          this.width,
          this.height);
      } else {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }
}

export default Junk;
