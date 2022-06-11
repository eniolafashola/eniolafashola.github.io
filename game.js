var gamePiece;
var gameObstacle = [];
var gameScore;
var highScore = 10000;
var userName = null;
var inTime = 20;

function startGame() {
	gamePiece = new component(30, 30, "red", 10, 120);
	gameScore = new component("30px", "Consolas", "black", 280, 40, "text");
	gameField.start();
}

function index() {
	var screenC =	document.createElement("IMG");
	screenC.setAttribute("src", "img.png");
	screenC.setAttribute("width", "100%");
	screenC.setAttribute("height", "100%");
	screenC.setAttribute("alt", "intro");
	document.getElementById("canvas").appendChild(screenC);

	var interact = document.getElementById("interact");
	var btn = document.createElement("button");
	var cntl = document.getElementById("cntl");
	btn.innerHTML = "Play Game";
	interact.replaceChild(btn, interact.children[0]);

	if (document.location.reload == true) {
		btn.innerHTML = "<span class='restart'>Restart</span>";
	}


	btn.addEventListener("click",  function() {
		startGame();
		document.getElementById("canvas").removeChild(screenC);
		interact.replaceChild(cntl, interact.children[0]);
	}, {once : true});
}

var gameField = {
	canvas :
	document.createElement("canvas"),
	start : function() {
		this.canvas.width = 480;
		this.canvas.height = 270;
		this.context =
		this.canvas.getContext("2d");

		document.getElementById("canvas").appendChild(this.canvas, document.body.childNodes[0]);
		this.frameNo = 0;
		this.interval =
		  setInterval(updateField, inTime);
	},
	clear : function() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	},
		stop : function() {
			clearInterval(this.interval);
	}
}

function component(width, height, color, x, y, type) {
	this.type = type;
	this.width = width;
	this.height = height;
	this.speedX = 0;
	this.speedY = 0;
	this.x = x;
	this.y = y;
	this.update = function() {
		ctx = gameField.context;
		if (this.type == "text") {
			ctx.font = this.width + " " + this.height;
			ctx.fillStyle = color;
			ctx.fillText(this.text, this.x, this.y);
		} else {
			ctx.fillStyle = color;
			ctx.fillRect(this.x, this.y, this.width, this.height);
		}
	}
	this.newPos = function() {
		this.x += this.speedX;
		this.y += this.speedY;
	}
	this.crashWith =
	function(otherobj) {
		var myLeft = this.x;
		var myRight = this.x + (this.width);
		var myTop = this.y;
		var myBottom = this.y + (this.height);
		var otherLeft = otherobj.x;
		var otherRight = otherobj.x + (otherobj.width);
		var otherTop = otherobj.y;
		var otherBottom = otherobj.y + (otherobj.height);
		var crash = true;

		if ((myBottom < otherTop) ||
		 (myTop > otherBottom) ||
		 (myRight < otherLeft) ||
	     (myLeft > otherRight)) {
			crash = false;
		}
		else if (crash == !false) {
			var gameOver =	document.createElement("h1");
			gameOver.innerHTML = "<span class = 'gameover'>Game Over</span";
			var score = document.createElement("h2");
			var yourScore = gameField.frameNo;
			score.innerHTML = "Score: " + yourScore;
			var global = document.createElement("p");
			global.innerHTML =
			 "Global Highscore: ";

			if (yourScore > highScore) {
				highScore = yourScore;
				userName = prompt("Enter Username");
				console.log(userName);
			};

			if (gameField.frameNo > highScore) {
				global = global + userName + ", " + yourScore;
				screen.appendChild(global);
			}
			else {
				global = global + "Xi, " + highScore;
				
				
			}

			var screen = document.getElementById("screen");
			var canvas = document.getElementById("canvas");
			screen.replaceChild(gameOver, screen.children[0]);
			screen.appendChild(score);
			

			var interact = document.getElementById("interact");
			var btn = document.createElement("button");
			var cntl = document.getElementById("cntl");
			btn.innerHTML = "Restart";
			interact.replaceChild(btn, interact.children[0]);


			btn.addEventListener("click",  function() {
			document.location.reload();
			}, {once : true});
		}
		return crash;
	}
}

function updateField() {
	var x, height, gap, minHeight, maxHeight, minGap, maxGap;
	for (i = 0; i <
		gameObstacle.length; i += 1) {
		if (gamePiece.crashWith(gameObstacle[i])) {
			gameField.stop();
			return;
		}
	}
	gameField.clear();
	gameField.frameNo += 1;
	if (gameField.frameNo == 1 || everyinterval(150)) {
		x = gameField.canvas.width;
		minHeight = 20;
		maxHeight = 200;
		height =
		Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);
		minGap = 50;
		maxGap = 200;
		gap =
		Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
		gameObstacle.push(new component(10, height, "green", x, 0));
		gameObstacle.push(new component(10, x - height - gap, "green", x, height + gap));
	}
	for (i = 0; i < gameObstacle.length; i += 1) {
		gameObstacle[i].speedX = -1;
		gameObstacle[i].newPos();
		gameObstacle[i].update();
	}
	gameScore.text = "SCORE: " + gameField.frameNo;
	gameScore.update();
	gamePiece.newPos();
	gamePiece.update();
}

function everyinterval(n) {
	if ((gameField.frameNo / n) % 1 == 0) {
		return true;
	}
	return false;
}

function moveUp() {
	gamePiece.speedY = -1;
}

function moveDown() {
	gamePiece.speedY = 1;
}

function moveLeft() {
	gamePiece.speedX = -1;
}

function moveRight() {
	gamePiece.speedX = 1;
}

function speedUp() {
	clearInterval(this.interval);
	this.interval = setInterval(updateField, 1);
}

function clearMove() {
	gamePiece.speedX = 0;
	gamePiece.speedY = 0;
	clearInterval(this.interval);
}