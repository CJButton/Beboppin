

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

    moveLeft() {
      console.log("in ship moveLeft");
      this.x -= 1;
    }

    moveRight() {
      this.speedX += 1;
    }

    // on key press, we want to change the x/y of the ship, it's place on the board
    // so we should pass this to the game file, and
    update(ctx) {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

export default Ship;
