var gamePiece;
var gameObstacle = [];
var gameScore;
var gameOver;
var loading;
var play;
var exit;
var newPoints;
var points;


startGame = function() {
	gamePiece = new component(30, 25, "red", 10, 120);
	gameScore = new component("30px", "Consolas", "black", 280, 40, "text");
	loading = new component(500, 270, "back1.jpg", 0, 0, "image");
   gameOver = new component("50px", "Consolas", "red", 115, 120, "text");
   points = new component("30px", "Consolas", "white", 70, 32.5, "text");
   play = new component("35px", "Cursive", "white", 133, 112, "text");
   exit = new component("35px", "Cursive", "white", 175, 160, "text");
   gameField.loadIndex();
}

startControl = function() {
	moveUp = function() {
	gamePiece.speedY = -1.2;
      };

    moveDown = function() {
	gamePiece.speedY = 1.2;
     };

    moveLeft = function() {
	gamePiece.speedX = -1;
    };

    moveRight = function() {
	gamePiece.speedX = 1;
    };

   speedUp = function() {
  	this.runInterval =
	       setInterval(run, 50);
	  this.interval =
		   setInterval(updateField, 0);
		
		
   };

   clearMove = function() {
	  gamePiece.speedX = 0;
	  gamePiece.speedY = 0;
	  clearInterval(this.interval);
	  clearInterval(this.runInterval);
  }
}

function endControl() {
	var button = document.getElementsByClassName("button");
 for(var i = 0; i < button.length; i++) {
    button[i].onmousedown = " ";
	button[i].onmouseup = " ";
	button[i].ontouchstart = " ";
	button[i].ontouchend = " ";
   };
}

var gameField = {
	canvas :
	document.createElement("canvas"),
	
	loadIndex : function() {
	this.canvas.width = 480;
	this.canvas.height = 270;
	this.context =
	this.canvas.getContext("2d");
	this.frameNo = 0;
	updateIndex();
	document.getElementById("canvas"). appendChild(this.canvas, document.body.childNodes[0]);
     },
	
	start : function() {
		
		this.runNo = 0;
		this.runInterval =
		  setInterval(run, 2500);
        this.interval =
		  setInterval(updateField, 20);
		startControl();
	},
	
	
	
	clear : function() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	},
	
	stop : function() {
			clearInterval(this.interval);
	},
	
	stopRun: function () {
		  clearInterval(this.runInterval);
	},
	
	lose : function() {
		 gamePiece.speedX = -1;
		 gamePiece.speedY = 0;
	}
	
}

function component(width, height, color, x, y, type) {
	this.type = type;
	this.color = color;
	if (type == "image") {
        this.image = new Image();
        this.image.src = this.color;
    }
	this.width = width;
	this.height = height;
	this.speedX = 0;
	this.speedY = 0;
	this.x = x;
	this.y = y;
	this.update = function() {
		ctx = gameField.context;
		if(this.type == "image") {
			ctx.drawImage(this.image,
             this.x,
             this.y,
             this.width, this.height);
          } else if (this.type == "text") {
			ctx.font = this.width + " " + this.height;
			ctx.fillStyle = this.color;
			ctx.fillText(this.text, this.x, this.y);
		  } else {
			ctx.fillStyle = this.color;
			ctx.fillRect(this.x, this.y, this.width, this.height);
	  }
	}
	
	this.choose = function() {
		this.width = "50px";
		this.color = "black";
	}
	
	this.unChoose = function() {
		this.width = "35px";
		this.color = "white";
	}
	
	this.done = function() {
			this .image.src = " ";
	}
	
	this.newPos = function() {
		this.x += this.speedX;
		this.y += this.speedY;
	}
	this.crashPos = function () {
		this.x -= this.speedX;
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
		else if (crash = !false) {
		updatePoints();
		gameField.stopRun();
		clearMove();
		endControl();
		function restart() {
           document.getElementById("center").addEventListener("click", function() {
			document.location.reload();
			});
        }
        setTimeout(restart, 500);
		}
		return crash;
	}
}

function chooseUp() {
		if(play.width == "35px") {
			gameField.clear();
			points.update();
		    play.choose();
	        exit.unChoose();
	        play.update();
	        exit.update();
	     } else {
		 chooseDown();
	     };
}
	
function chooseDown() {
		if(exit.width == "35px") {
			gameField.clear();
			points.update();
		    exit.choose();
		    play.unChoose();
		    play.update();
	        exit.update();
	   } else {
		chooseUp();
	   };
}

function select() {
   	if(play.width == "50px") {
   	console.clear();
		gameField.canvas.style.backgroundImage = "url('back1.jpg'), url(' '), url('back1.jpg')";
		gameField.start();
		setTimeout(doneLoading, 500);
		endClick();
      } else {
      	alert("Are you sure you want to stop fun?");
      }
}

function endClick() {
	var button = document.getElementsByClassName("button");
 for(var i = 0; i < button.length; i++) {
    button[i].onclick = " ";
   };
}

function updateIndex() {
	if (localStorage.points == undefined) {
		points.text = "0";
	} else {
	points.text = localStorage.points; 
	};
	points.update();
	play.text = "Play Game";
	exit.text = "Exit";
	play.choose();
	play.update();
	exit.update();
}

function doneLoading() {
	loading.done();
}

function run() {
	gameField.runNo += 1;
	
	if(typeof(Storage)!=="undefined"){
	   if(localStorage.points) {
         var oldPoints =  JSON.parse(localStorage.getItem("points") );
         newPoints = oldPoints + gameField.runNo;
       } else {
          localStorage.setItem("points", JSON.stringify(gameField.runNo) );
       }
    } else {
        alert("localStorage not available, change browser to make game accessible game offline");
  }
}

function updatePoints() {
	 localStorage.setItem("points", JSON.stringify(newPoints) );
}

function updateField() {
	var x, height, gap, minHeight, maxHeight, minGap, maxGap;
	for (i = 0; i <
		gameObstacle.length; i += 1) {
		if (gamePiece.crashWith(gameObstacle[i])) {
			gameField.lose();
		}
	}
	gameField.clear();
	gameField.frameNo += 1;
	
	if (gameField.frameNo == 1 || everyinterval(150)) {
		x = gameField.canvas.width;
		minHeight = 20;
		maxHeight = 195;
		height =
		Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);
		minGap = 55;
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
	
	gameScore.text = "SCORE: " +  gameField.runNo;
	
	gameScore.update();
	gamePiece.newPos();
	gamePiece.update();
	loading.newPos();
    loading.update();
}

function everyinterval(n) {
	if ((gameField.frameNo / n) % 1 == 0) {
		return true;
	}
	return false;
}