var PH_score;
var dark_mode_toggle = 0;

function openUserModal() {
	PHScore();
	var modalBackground = document.getElementById("modal-background");
	var userModal = document.getElementById("add-user-modal");

	modalBackground.classList.remove("hidden");
	userModal.classList.remove("hidden");
}

function changeGameColors() {
	var snake_colors_button = document.getElementById("snake-colors");
	var food_colors_button = document.getElementById("food-colors");
	CTMZ.snake = snake_colors_button.value;
	CTMZ.apple = food_colors_button.value;
}

function resetGameColors() {
	var snake_colors_button = document.getElementById("snake-colors");
	var food_colors_button = document.getElementById("food-colors");
	snake_colors_button.selectedIndex = 0;
	food_colors_button.selectedIndex = 0;
}

function changeScene() {
	var element = document.getElementsByClassName("body-container");
	console.log(element);
	element[0].classList.toggle("dark-mode");
	var doc_body = document.body;
	doc_body.classList.toggle("dark-mode");

	var items = document.getElementsByClassName("flexitem");
	console.log("items", items);
	for (i = 0; i < items.length; i++) {
		items[i].classList.toggle("item-dark-mode");
	}

	var toggleDarkMode = document.querySelector("#scene-button");
	var gameToggleDarkMode = document.querySelector("#game-window");
	gameToggleDarkMode.classList.toggle("game-dark-mode");

	var toggleModalDarkMode = document.querySelector("#modal-background");
	toggleModalDarkMode.classList.toggle("modal-background-dark-mode");
	var modalstuff = document.getElementsByClassName("modal-dialogue")[0]
	modalstuff.classList.toggle("modal-dark-mode");

	if (!dark_mode_toggle) {
		CTMZ.background = "black";	// game canvas background
		CTMZ.border = "white";		// border
		dark_mode_toggle = 1;
		toggleDarkMode.textContent = "Light mode";
	} else {
		CTMZ.background = "white";
		CTMZ.border = "black";
		dark_mode_toggle = 0;
		toggleDarkMode.textContent = "Dark mode";
	}
}

function confirmDefaults() {
	let ans = confirm("Reset to default options?");
	if (ans) {
		resetGameColors();
		changeGameColors();
	}
}

function closeUserModal() {
	var modalBackground = document.getElementById("modal-background");
	var userModal = document.getElementById("add-user-modal");

	modalBackground.classList.add("hidden");
	userModal.classList.add("hidden");	
	resetGame();	// default game values (game.js)
	mainLoop();		// restart
}

function addUser(name, score) {

}

function parseUsers(name, score) {
	let scores = document.getElementsByClassName("score");
	console.log(scores);
	let curr;
	let prev;
	for (i = 0; i < scores.length; i++) {
		if (scores[i].innerText == score) {
			console.log("found!");
		}
	}
}

function handleUserModalAccept() {
	var user_name = document.getElementById("name-input-textfield").value.trim();
	var user_score = PH_score;

	// set up a HTTP request and the route
	var req = new XMLHttpRequest();
	var reqURL = "/add-user-rank";
	console.log("== reqURL: " + reqURL);
	req.open("POST", reqURL);

	// object with user name and score to be sent to server
	let user = {
		name: user_name,
		score: user_score
	}

	addUser(user.name, user.score);

	console.log("== new user entry: ", user);
	console.log("== req: ", req);
	req.setRequestHeader("Content-Type", "application/json");
	var reqBody = JSON.stringify(user);

	req.send(reqBody);

	// close modal and restart the window
	closeUserModal();
	parseUsers("yeet", 50);
}

function PHScore() {
	var user_score = document.getElementById("user-score");
	user_score.textContent = "You scored: " + PH_score;

	return PH_score;
}

function randScore() {
	return Math.floor(Math.random() * (200 - 0));
}

window.addEventListener("DOMContentLoaded", function() {
	var gameOverButton = document.getElementById("game-over");
	if (gameOverButton) {
		gameOverButton.addEventListener("click", openUserModal);
	}

	var cancelAddUser = document.querySelector("#add-user-modal .cancel-add-user");
	if (cancelAddUser) {
		cancelAddUser.addEventListener("click", closeUserModal);
	}
	var acceptAddUser = document.querySelector("#add-user-modal .accept-add-user");
	if (acceptAddUser) {
		acceptAddUser.addEventListener("click", handleUserModalAccept);
	}
	var toggleDarkMode = document.querySelector("#scene-button");
	if (toggleDarkMode) {
		toggleDarkMode.addEventListener("click", changeScene);
	}
	var resetDefaults = document.querySelector("#defaults-button");
	if (resetDefaults) {
		resetDefaults.addEventListener("click", confirmDefaults);
	}
	var snake_color_button = document.querySelector("#snake-colors");
	var food_color_button = document.querySelector("#food-colors");
	if (snake_color_button && food_color_button) {
		snake_color_button.addEventListener("change", changeGameColors);
		food_color_button.addEventListener("change", changeGameColors);
	}
});