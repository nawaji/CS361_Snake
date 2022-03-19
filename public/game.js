var c = document.getElementById("game-window");
var ctx = c.getContext("2d");

// allow the canvas to be tab-able
c.tabIndex = 1;

// add a listener for keypress
window.addEventListener("DOMContentLoaded", function() {
	c.addEventListener("keydown", snake_direction);

});

var score = 0;
var start = 0;			// avoid incrementing score until user presses a key		
var queue = 0;			// avoid multiple direction changes within a single step
const move_speed = 20;	// how far the snake moves in a step
var game_speed = 150; 	// miliseconds between steps

// customization settings (colors, key controls)
var CTMZ = {
	background: "white",
	border: "black",
	snake: "green",
	apple: "red",

	// 37 - left arrow, 38 - up, 39 - right, 40 - down
	// 65 - a, 87 - w, 68 - right, 83 - down
	going_left: 37,
	going_up: 38,
	going_right: 39,
	going_down: 40
}

var snake = {
	body: [ {x: 200, y: 200} ],		// snake body
	grow: 0,						// snake growth
	dx: 0,							// horizontal movement
	dy: 0,							// vertical movement
}

// current apple location
var apple = {
	x: 100,
	y: 100
}

// min inclusive, max exclusive
function randInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function drawFood() {
	ctx.fillStyle = CTMZ.apple;
	ctx.fillRect(apple.x, apple.y, 20, 20);
}

function drawSnake() {
	ctx.fillStyle = CTMZ.snake;

	snake.body.forEach(part => {
		ctx.fillRect(part.x, part.y, 20, 20);
	});
}

function newApple() {
	let valid = false;
	let body = snake.body;
	while(valid == false) {
		apple.x = randInt(0, 20) * 20;
		apple.y = randInt(0, 20) * 20;		

		for (i = 0; i < body.length; i++) {
			if (body[i].x == apple.x && body[i].y == apple.y) {
				valid = false;
				break;
			} else {
				valid = true;
			}
		}
	}
}

function moveSnake() {
	var head = {x: snake.body[0].x + snake.dx, y: snake.body[0].y + snake.dy};

	// add one square to the front of the snake, remove the last
	snake.body.unshift(head);

	// if the snake has eaten an apple, grow the snake otherwise don't
	if (snake.grow == 0) {
		snake.body.pop();
	} else {
		snake.grow--;
	}
}

function checkFail() {
	var output = 0;
	var curr = 0;
	// check collision with boundaries
	snake.body.forEach(part => {
		if (part.x < 0 || part.x >= 400) {
			output++;
		} else if (part.y < 0 || part.y >= 400) {
			output++;
		}

		// check collision with self
		if (curr != 0) {
			if (snake.body[0].x == part.x && snake.body[0].y == part.y) {
				output++;
			}
		}
		curr++;
	})

	return output;
}

function checkEat() {
	if (snake.body[0].x == apple.x && snake.body[0].y == apple.y) {
		snake.grow++;
		score = score + 10;
		newApple();
	}
}

function checkStart() {
	if (start == 0) {
		ctx.fillStyle = CTMZ.border;
		ctx.font = "25px Arial";
		ctx.textAlign = "center";
		if (CTMZ.going_left == 37) {
			ctx.fillText("Use arrow keys to move!", 200, 100);
		} else {
			ctx.fillText("Use WASD keys to move!", 200, 100);
		}
	}
}

function checkBounds() {
	let bounds = checkFail();
	if (bounds > 0) {
		console.log("out of bounds!");
		internal_score = score;
		openUserModal();
		return true;
	}
	return false;
}

// clear canvas for next frame
function clearCanvas() {
	ctx.fillStyle = CTMZ.background;
	ctx.fillRect(0, 0, c.width, c.height);
}

function snake_direction(key) {
	var key_press = key.keyCode;

	// I don't think there's a better way to code for the specific key presses
	// so it will be left like this.
	if (key_press == CTMZ.going_left || key_press == CTMZ.going_up 
	|| key_press == CTMZ.going_right || key_press == CTMZ.going_down) {
		start = 1;
	}

	if (queue != 0) {
		return;
	}

	if (key_press == CTMZ.going_left && snake.dx != move_speed) {
		snake.dx = -move_speed;
		snake.dy = 0;

	} else if (key_press == CTMZ.going_up && snake.dy != move_speed) {
		snake.dx = 0;
		snake.dy = -move_speed;

	} else if (key_press == CTMZ.going_right && snake.dx != -move_speed) {
		snake.dx = move_speed;
		snake.dy = 0;

	} else if (key_press == CTMZ.going_down && snake.dy != -move_speed) {
		snake.dx = 0;
		snake.dy = move_speed;
	}
	queue = 1;
	key.preventDefault();
}

function updateScoreHTML() {
	var HTML_score = document.getElementById("game-score");
	HTML_score.textContent = "Game score: " + score;
}

function resetGame() {
	snake.body = [ {x: 200, y: 200} ];
	snake.grow = 0;
	snake.dx = 0;
	snake.dy = 0;
	score = 0;
	start = 0;
	queue = 0;
	newApple();
}

function mainLoop() {

	setTimeout(function onTick() {
		moveSnake();
		if (checkBounds()) {
			return;
		}
		checkEat();

		clearCanvas();
		checkStart();
		drawFood();
		drawSnake();

		updateScoreHTML();

		queue = 0;
		mainLoop();
	}, game_speed);
}

newApple();
mainLoop();

/* END OF GAME CODE */