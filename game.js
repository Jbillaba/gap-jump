
let block;
let pipes = [];
let score;
let mysound;

function startGame() {
    block = new GameObject(30, 30, "red", 10, 120,);
    score = new GameObject("30px", "silkScreen", "black", 280, 40, "text");
    mysound = new sound("thud.mp3");
    myGameArea.start();
}
// makes block move + clears the canvas
let myGameArea = {
    canvas: document.querySelector(".game-display"),
    start : function() {
        this.canvas.width = 500;
        this.canvas.height = 500;
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
function GameObject(width, height, color, x, y, type) {
    this.type = type;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.gravity = 0.05;
    this.gravitySpeed = 0;
    this.x = x;
    this.y = y;
    this.update = function(){
    ctx = myGameArea.context;
    if (this.type == "text"){
        ctx.font = this.width + " " + this.height;
        ctx.fillStyle = color;
        ctx.fillText(this.text, this.x, this.y);
    }else{
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    }
    this.newPos = function(){
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
        this.rockBottom();
    }
    this.rockBottom = function() {
        let rockBottom = myGameArea.canvas.height - this.height;

        if(this.y > rockBottom){
            this.y = rockBottom;
            this.gravitySpeed = 0;
        }
    }
    this.crashWith = function(otherobj) {
        let myleft = this.x;
        let myright = this.x + (this.width);
        let mytop = this.y;
        let mybottom = this.y + (this.height);
        let otherleft = otherobj.x;
        let otherright = otherobj.x + (otherobj.width);
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
    let x, height, gap, minHeight, maxHeight, minGap, maxGap;
    for (i = 0; i < pipes.length; i++){
        if (block.crashWith(pipes[i])){
            mysound.play();
            myGameArea.stop();
            document.querySelector("#restart-btn").style.display = "block";
            document.querySelector("#restart-btn").addEventListener("click", function () {
            location.reload();
            })
            return;
        }
    }
    myGameArea.clear();  
    myGameArea.frameNo += 1; 
if (myGameArea.frameNo == 1 || everyinterval(150)){
    x = myGameArea.canvas.width;
   minHeight = 50;
   maxHeight = 250;
   height = Math.floor(Math.random() * (maxHeight - minHeight + 1)+ minHeight);
   minGap = 50;
   maxGap = 200;
   gap = Math.floor(Math.random() *(maxHeight-minHeight+1)+minHeight);
   pipes.push(new GameObject(30, height, "green", x, 0));
   pipes.push(new GameObject(30, x - height - gap, "green", x, height + gap));
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
    if (myGameArea.key && myGameArea.key == 32){accelerate(-0.3)} else {
        accelerate(0.4)
    }
    score.text = "score: " + myGameArea.frameNo;
    score.update();
    block.newPos();
    block.update();
}
function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0 ){return true;}
    return false;
}
function accelerate(n) {
    if (!myGameArea.interval) {myGameArea.interval = setInterval(updateGameArea, 20);}
    block.gravity = n;  
}
function sound(src){
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", 'auto');
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }
}