// Grab a reference to the canvas
let canvas = document.getElementById("game-canvas");
let context = canvas.getContext("2d");

// Set canvas dimensions
canvas.width = 800;
canvas.height = 600;

// Create player and enemy objects
class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 20;
    this.speed = 5;
  }
  
  moveLeft() {
    this.x -= this.speed;
  }
  
  moveRight() {
    this.x += this.speed;
  }
  
  moveUp() {
    this.y -= this.speed;
  }
  
  moveDown() {
    this.y += this.speed;
  }
}

class Enemy {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 20;
    this.speed = 2;
  }
  
  move() {
    this.x -= this.speed;

    // Wrap around when reaching the left edge of the canvas
    if (this.x + this.size < 0) {
      this.x = canvas.width;
    }
  }
}

let player = new Player(canvas.width / 2, canvas.height - 50);
let enemies = [
  new Enemy(100, 50),
  new Enemy(200, 100),
  new Enemy(300, 150),
];

// Render the game state
function render() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Render player
  context.fillStyle = "blue";
  context.fillRect(player.x, player.y, player.size, player.size);

  // Render enemies
  context.fillStyle = "red";
  enemies.forEach((enemy) => {
    context.fillRect(enemy.x, enemy.y, enemy.size, enemy.size);
  });
}

// Handle user input
document.onkeydown = function (event) {
  if (event.code === "ArrowLeft") {
    player.moveLeft();
  }
  if (event.code === "ArrowRight") {
    player.moveRight();
  }
  if (event.code === "ArrowUp") {
    player.moveUp();
  }
  if (event.code === "ArrowDown") {
    player.moveDown();
  }
};

// Update game state and render
function update() {
  // Move enemies
  enemies.forEach((enemy) => {
    enemy.move();
  });

  // Render the updated game state
  render();

  // Call update again on the next frame
  requestAnimationFrame(update);
}

// Start the game loop
update();

