

class Ship {
  constructor(width, height, color, x, y, ctx) {
    this.width = width;
    this.height = height;
    this.color = color;
    this.x = x;
    this.y = y;
    this.ctx = ctx;
    this.update = this.update.bind(this);
  }
    // ctx.font = "30px Arial";
    // ctx.fillText("Hello from Ship", 10, 50);
    //updates the ships position/info
  update() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

const start = () => {
  let board = new Board;
  let ship = new Ship(30, 30, "red", 10, 120, board.ctx);
  ship.update();
};

class Board {
  constructor() {
    let canvas = document.getElementById("canvas");
    canvas.width="500";
    canvas.height="500";
    canvas.style.backgroundColor = "black";
    this.ctx = canvas.getContext("2d");
  }
  // const interval = setInterval(updateGame, 20);
  // const clear = () => {
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
  // };

}

// const start = () => {
  //sets up the canvas for us


  // adds ship object to the canvas (doesnt move yet)
  // let ship = new Ship(30, 30, "red", 10, 120, ctx);
// };

const updateGame = () => {
  // Start.clear();
  // Ship.update();
};
