
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
    this.update = function(){
    ctx = myGameArea.context;
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;
    }
}

//refreshes, and checks for keypresses.
function updateGameArea() {
    myGameArea.clear();  
    block.speedX = 0;
    block.speedY = 0;
    if (myGameArea.key && myGameArea.key == 37){block.speedX = -1;}
    if (myGameArea.key && myGameArea.key == 39){block.speedX = 1;}
    if (myGameArea.key && myGameArea.key == 38){block.speedY = -1;}
    if (myGameArea.key && myGameArea.key == 40){block.speedY = 1;}
    block.newPos();
    block.update();
}

