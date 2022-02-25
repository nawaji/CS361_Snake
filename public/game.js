var c = document.getElementById("game-window");
var ctx = c.getContext("2d");

var grid_size = 20;
var grid_length = ctx.canvas.height / grid_size;

console.log("== Game grid L/W: " + grid_length);
console.log("== Game grid size: " + grid_size);

var score = 0;

var snake = {
	x: 0,
	y: 0
};

var snake_dir;
var apple_eaten = false;

function randInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function spawnFood(x, y) {
	ctx.fillStyle = "red";
	ctx.fillRect(x * grid_length, y * grid_length, grid_size, grid_size); 

	ctx.fillStyle = "blue";
	ctx.fillRect(0 * grid_length, 0 * grid_length, grid_size, grid_size);
}

// arrow left - 37, arrow up - 38, 
// arrow right - 39, arrow down - 40/117 
// 0 - left, 1 - up, 2 - right, 3 - down
function changeDir(key) {
	if (key == 37 && snake.dir != 0) {

	} else if (key == 38 && snake.dir != 1) {

	} else if (key == 39 && snake.dir != 2) {

	} else if (key == 40 && snake.dir != 3) {

	}
}

var fps_interval, start_time, now, then, elapsed, frame_count = 0;

function frames(fps) {
	fps_interval = 1000 / fps;

	then = Date.now();
	start_time = then;
	console.log(start_time);
	spawnFood(randInt(0, 20), randInt(0, 20));
	mainLoop();
}

var fps = 0;
var stop_code = false;
function mainLoop() {
	if (stop_code) {
		return;
	}

	requestAnimationFrame(mainLoop);

//	snake_dir = snake_next_dir;
/*
	switch(snake_dir) {
		case 0:
			dx--;
			break;
		case 1:
			dy--;
			break;
		case 2:
			dx++;
			break;
		case 3:
			dy++;
			break;			
	}
*/
	now = Date.now();
	elapsed = now - then;
	
	// algorithm from http://jsfiddle.net/m1erickson/CtsY3/ for locking
	// html canvas to a certain FPS
	if (elapsed > fps_interval) {

		if (apple_eaten) {
			spawnFood(randInt(0, 20), randInt(0, 20));
		}
		var dx = snake.x;
		var dy = snake.y;

		then = now - (elapsed % fps_interval);
		var since_start = now - start_time;
		var current_fps = Math.round(1000 / (since_start / ++frame_count) * 100) / 100;
		console.log(current_fps + " fps");
	}

}

function js_abort() {
	stop_code = true;
	throw new Error("Force aborting javascript...");
}

frames(5);