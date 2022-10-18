
let block;
let pipes = [];


function startGame() {
    block = new GameObject(100, 30, "red", 10, 120);
    myGameArea.start();
}
// makes block move + clears the canvas
let myGameArea = {
    canvas: document.querySelector(".game-display"),
    start : function() {
        this.canvas.width = 500;
        this.canvas.height = 600;
        this.context = this.canvas.getContext("2d");
        this.frameNo = 0;
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
    },
    stop : function() {
        clearInterval(this.interval);
    }
}

// gameObj class contructor
function GameObject(width, height, color, x, y) {

    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.update = function(){
    ctx = myGameArea.context;
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angel);
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.restore();
    }

    this.newPos = function(){
        
        this.x += this.speedX;
        this.y += this.speedY 
        
        
    }
    this.crashWith = function(otherobj) {
        let myleft = this.x;
        let myright = this.x + (this.width);
        let mytop = this.y;
        let mybottom = this.y + (this.height);
        let othertop = otherobj.y;
        let otherbottom = otherobj.y + (otherobj.height);
        let crash = true;
        if ((mybottom < othertop) ||
        (mytop > otherbottom) ||
        (myright < otherleft) ||
        (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }

    }

//refreshes, and checks for keypresses.
function updateGameArea() {
    let x, y;
    for (i = 0; i < pipes.length; i++){
        if (block.crashWith(pipes[i])){
            myGameArea.stop();
            return;
        }
    }
  
    myGameArea.clear();  
    myGameArea.frameNo += 1; 
if (myGameArea.frameNo == 1 || everyinterval(150)){
    x = myGameArea.canvas.width;
   y = myGameArea.canvas.height - 200;
   pipes.push( new GameObject(10, 200, "green", x, y));
}
    for(i = 0; i < pipes.length; i ++)
{
    pipes[i].x += -1;
    pipes[i].update(); 
}
    block.speedX = 0;
    block.speedY = 0;
    if (myGameArea.key && myGameArea.key == 37){block.speedX = -1;}
    if (myGameArea.key && myGameArea.key == 39){block.speedX = 1;}
    if (myGameArea.key && myGameArea.key == 38){block.speedY = -1;}
    if (myGameArea.key && myGameArea.key == 40){block.speedY = 1;}
    block.newPos();
    block.update();
}

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 ==0 ){return true;}
    return false;
}

