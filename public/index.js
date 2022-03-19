var internal_score;
var dark_mode_toggle = 0;
var key_toggle = 0;

function openUserModal() {
	internalScore();
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

	// body items dark mode
	var items = document.getElementsByClassName("flexitem");
	console.log("items", items);
	for (i = 0; i < items.length; i++) {
		items[i].classList.toggle("item-dark-mode");
	}

	var search_input = document.getElementById("scores-search-input");
	search_input.classList.toggle("modal-input-dark-mode");

	var scene_button = document.getElementById("scene-button");
	var controls_button = document.getElementById("controls-button");
	var defaults_button = document.getElementById("defaults-button");

	scene_button.classList.toggle("buttons-dark-mode");
	controls_button.classList.toggle("buttons-dark-mode");
	defaults_button.classList.toggle("buttons-dark-mode");

	changeModalScene();
	changeGameScene();
}

function changeModalScene() {
	// modal dark mode
	var toggleModalDarkMode = document.querySelector("#modal-background");
	toggleModalDarkMode.classList.toggle("modal-background-dark-mode");
	var modalstuff = document.getElementsByClassName("modal-dialogue")[0];
	modalstuff.classList.toggle("modal-dark-mode");

	var input_bar = document.getElementById("name-input-textfield");
	input_bar.classList.toggle("modal-input-dark-mode");

	var cancel_button = document.getElementsByClassName("cancel-add-user")[0];
	var accept_button = document.getElementsByClassName("accept-add-user")[0];

	cancel_button.classList.toggle("buttons-dark-mode");
	accept_button.classList.toggle("accept-button-dark-mode");
}

function changeGameScene() {
	var toggleDarkMode = document.querySelector("#scene-button");
	var gameToggleDarkMode = document.querySelector("#game-window");
	gameToggleDarkMode.classList.toggle("game-dark-mode");	

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
	mainLoop();
}

function addUser(name, score) {
	var scores_list = document.getElementById("scores");

	var new_list_entry = document.createElement("li");
	var new_name = document.createElement("span");
	new_name.classList.add("name")
	new_name.textContent = name;

	var new_score = document.createElement("span");
	new_score.classList.add("score")
	new_score.textContent = score;

	var spacer = document.createElement("text");
	spacer.textContent = " : "

	// this will show up as: name : score at
	// the end of the list
	new_list_entry.appendChild(new_name);
	new_list_entry.appendChild(spacer);
	new_list_entry.appendChild(new_score);

	scores_list.appendChild(new_list_entry);	
}

function handleUserModalAccept() {
	var user_name = document.getElementById("name-input-textfield").value.trim();
	var user_score = internal_score;

	// set up a HTTP request and the route
	var req = new XMLHttpRequest();
	var reqURL = "/add-user-rank";
	req.open("POST", reqURL);

	// object with user name and score to be sent to server
	let user = {
		name: user_name,
		score: user_score
	}

	req.setRequestHeader("Content-Type", "application/json");
	var reqBody = JSON.stringify(user);

	req.send(reqBody);

	// close modal and restart the window
	addUser(user.name, user.score);
	closeUserModal();
}

// update scoreboard
function internalScore() {
	var user_score = document.getElementById("user-score");
	user_score.textContent = "You scored: " + internal_score;

	return internal_score;
}

function randScore() {
	return Math.floor(Math.random() * (200 - 0));
}

function swapKeys() {
	var switchControls = document.querySelector("#controls-button");

	if (!key_toggle) {
		switchControls.textContent = "Change to Arrow controls";
		key_toggle = 1;
		CTMZ.going_left = 65;
		CTMZ.going_up = 87;
		CTMZ.going_right = 68;
		CTMZ.going_down = 83;

	} else {
		switchControls.textContent = "Change to WASD controls"
		key_toggle = 0;
		CTMZ.going_left = 37;
		CTMZ.going_up = 38;
		CTMZ.going_right = 39;
		CTMZ.going_down = 40;
	}
}

// Add event listeners when content is done loading.
// While this looks like a lot for one function, theres
// no other way to handle this so its fine.
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

	var switchControls = document.querySelector("#controls-button");
	if (switchControls) {
		switchControls.addEventListener("click", swapKeys);
	}
});