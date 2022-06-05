function startGame() {
	gameField.start();
}


var gameField = {
	canvas :
	document.createElement("canvas"),
	start : function() {
		this.canvas.width = 600;
		this.canvas.height = 300;
		this.context =
		this.canvas.getContext("2d");

		document.body.insertBefore(this.canvas, document.body.childNodes[0]);
	}
}