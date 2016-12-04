

class ShipImage {
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


    pos() {
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

export default ShipImage;
