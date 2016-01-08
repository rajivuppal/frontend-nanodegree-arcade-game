// Enemies our player must avoid
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = this.randomSpeed();

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.randomSpeed = function() {
    return Math.floor((Math.random() * 10) + 1)*Math.floor((Math.random() * 10) + 1)*10;
};
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.x >(550)) { 
        this.x = 0;
        this.speed = this.randomSpeed();
        if(this.speed < 100) {
            this.speed = 100;
        }       
    }
    this.x = this.x + this.speed*dt;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
// Enemies our player must avoid
var Player = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-boy.png';
};

//Setup the inheritance of the Player class from the Enemy class
Player.prototype = Object.create(Enemy.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    var pWidth = 70;    //player image width
    var pHeight = 65;   //player image height
    var eWidth = 80;    //enemy image width
    var eHeight = 72;   //enemy image height

    for(var i=0; i<allEnemies.length;i++) {
        var curEnemy = allEnemies[i];
        if ((this.x < curEnemy.x + eWidth) &&
            (this.x + pWidth > curEnemy.x) &&
            (this.y < curEnemy.y + eHeight) &&
            (pHeight + this.y > curEnemy.y)
            ) {
            // collision detected!
            //console.log("Collision");
            this.reset();
        } 
    }


};

// Draw the enemy on the screen, required method for game
//Player.prototype.render = function() {
//    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
//};
Player.prototype.handleInput = function(keyCode) {
    var delta = 25;

    if((keyCode == 'left') && (this.x >= 25)){
        this.x = this.x - delta;
    } else if ((keyCode == 'right') && (this.x < 400)){
        this.x = this.x + delta;
    } else if ((keyCode == 'up') && (this.y > 0)){
        this.y = this.y - delta;
    } else if ((keyCode == 'down') && (this.y < 425)){
        this.y = this.y + delta;
    }

    if(this.y === 0)  {
        this.reset();
    }
    //console.log("keycode: "+keyCode+ " x= "+this.x+" y= "+this.y," cWidth= "+this.cWidth+" CHeight="+ " , "+this.cHeight);
};

Player.prototype.reset = function() {
    this.x = 200;
    this.y = 400;
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [new Enemy(0, 70), new Enemy(0, 150), new Enemy(0,230) ];
// Place the player object in a variable called player
var player = new Player(200,400);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
