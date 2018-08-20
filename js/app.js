// Enemies our player must avoid
let Enemy = function (x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;

    // The image of the enemy
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position
Enemy.prototype.update = function (dt) {
    this.x += this.speed * dt;
    if (this.x > 510) {
        this.x = -50;
        this.speed = 100 + Math.floor(Math.random() * 444);
    };

    // Checks for collisions between the player and the enemies
    if (player.x < this.x + 60 &&
        player.x + 37 > this.x &&
        player.y < this.y + 25 &&
        30 + player.y > this.y) {
        alert("Bug caught you. you lose")
        player.x = 302;
        player.y = 405;
    };
};

// Renders the enemy into the game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player class for moving player
let Player = function (x, y) {
    this.x = x;
    this.y = y;

    //The image of the player
    this.player = 'images/char-boy.png';
};

Player.prototype.update = function (dt) {

};

// Renders the image of the user into the game
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.player), this.x, this.y);
};

// Allows the user to use the arrow keys to jump from tile to tile
  Player.prototype.handleInput = function (keyPress) {
      if (keyPress == 'left' && this.x > 0) {
          this.x -= 102;
      };
      if (keyPress == 'right' && this.x < 405) {
          this.x += 102;
      };
      if (keyPress == 'up' && this.y > 0) {
          this.y -= 83;
      };

      if (keyPress == 'down' && this.y < 405) {
          this.y += 83;
      };

      //stops the user from going out of canvas from right side on x-axis
      if (keyPress == 'right' && this.x > 505) {
        this.x = 404;
      }

      // Once the user reaches the top of the page in the water the game ends
      if (this.y < 0) {
          setTimeout(() => {
            alert("congrates you won")
              this.x = 302;
              this.y = 405;
          }, 500);
      };
  };


// All enemies are placed in an array
let allEnemies = [];

// spawning enemies
let enemySpawn= [63, 147, 230];
enemySpawn.forEach(function (spawnY) {
    enemy = new Enemy(0, spawnY, 200);
    allEnemies.push(enemy);
});



// The starting point of player
let player = new Player(302, 405);

// This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener('keyup', function (e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
