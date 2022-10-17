
let block;
function startGame() {
    myGameArea.start();
    block = new GameObject(100, 30, "red", 10, 120)
}
// makes block move + clears the canvas
let myGameArea = {
    canvas: document.querySelector(".game-display"),
    start : function() {
        this.canvas.width = 500;
        this.canvas.height = 600;
        this.context = this.canvas.getContext("2d");
        this.interval = setInterval(updateGameArea, 20);
    window.addEventListener('keydown', function (e) {
        myGameArea.key = e.keyCode;
    })    
    window.addEventListener('keyup', function(e) {
        myGameArea.key = false;
    })
    }, 
    clear: function(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

// gameObj class contructor
function GameObject(width, height, color, x, y) {
    this.gameArea = myGameArea;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.gravity = 0.03;
    this.gravitySpeed = 0;
    this.update = function(){
    ctx = myGameArea.context;
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angel);
    ctx.fillStyle = color;
    ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);
    ctx.restore();
    }

    this.newPos = function(){
        this.gravitySpeed += this.gravity
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
        this.hitBottom();
    }
    this.hitBottom = function() {
        let rockbottom = myGameArea.canvas.height - this.height;
        if (this.y > rockbottom){
            this.y = rockbottom;
        }
    }
}

//refreshes, and checks for keypresses.
function updateGameArea() {
    myGameArea.clear();  
    block.angle += 1 * Math.pi / 180;
    block.speedX = 0;
    block.speedY = 0;
    if (myGameArea.key && myGameArea.key == 37){block.speedX = -1;}
    if (myGameArea.key && myGameArea.key == 39){block.speedX = 1;}
    if (myGameArea.key && myGameArea.key == 38){block.speedY = -1;}
    if (myGameArea.key && myGameArea.key == 40){block.speedY = 1;}
    block.newPos();
    block.update();
}

