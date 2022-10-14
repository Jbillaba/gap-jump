function startGame() {
    myGameArea.start();
    block = new component(100, 30, "red", 10, 120)
}


let myGameArea = {
    canvas:   document.querySelector(".game-display"),
    start : function() {
        this.canvas.width = 500;
        this.canvas.height = 700;
        this.context = this.canvas.getContext("2d");
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keyDown', function (d) {
            myGameArea.key = d.keycode;
        })
        window.addEventListener('keyup', function (d) {
            myGameArea.key = false;
        })

    }, 
    clear: function(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

}


function component(width, height, color, x, y) {
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

function updateGameArea() {
    myGameArea.clear();  
    block.speedX = 0;
    block.speedY = 0;
    if (myGameArea.key && myGameArea.key == 37) {myGamePiece.speedX = -1; }
    if (myGameArea.key && myGameArea.key == 39) {myGamePiece.speedX = 1; }
    if (myGameArea.key && myGameArea.key == 38) {myGamePiece.speedY = -1; }
    if (myGameArea.key && myGameArea.key == 40) {myGamePiece.speedY = 1; }
    block.update();
}


function moveup() {
    block.speedY -= 1;
}


function movedown() {
    block.speedY += 1;
}


function moveleft() {
    block.speedX -= 1;
}


function moveright() {
    block.speedX += 1;
}

function stopMove() {
    block.speedX = 0;
    block.speedY = 0;
}