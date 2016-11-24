

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
