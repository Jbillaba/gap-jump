function startGame() {
    myGameArea.start();
}


let myGameArea = {
    canvas:   document.querySelector(".game-display"),
    start : function() {
        this.canvas.width = 500;
        this.canvas.height = 700;
        this.context = this.canvas.getContext("2d")

    }

}


