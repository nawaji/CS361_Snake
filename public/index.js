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

function changeScene() {
	var element = document.getElementsByClassName("body-container");
	console.log(element);
	element[0].classList.toggle("dark-mode");
	var doc_body = document.body;
	doc_body.classList.toggle("dark-mode");

	var items = document.getElementsByClassName("flexitem");
	console.log("items", items);
	for (i = 0; i < items.length; i++) {
		items[i].classList.toggle("dark-mode");
	}

	// game customizations
	if (!dark_mode_toggle) {
		CTMZ.background = "black";
		CTMZ.border = "white";
		dark_mode_toggle = 1;
	} else {
		CTMZ.background = "white";
		CTMZ.border = "black";
		dark_mode_toggle = 0;		
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

	console.log("== new user entry: ", user);
	console.log("== req: ", req);
	req.setRequestHeader("Content-Type", "application/json");
	var reqBody = JSON.stringify(user);

	req.send(reqBody);

	// close modal and restart the window
	closeUserModal();
	window.location.reload();
	siteRedirect();
}

function newUserRequest() {
	var user_name = document.getElementById("name-input-textfield").value.trim();

}

function siteRedirect() {
	var req = new XMLHttpRequest();
	var reqURL = "/redirect";
	console.log("== reqURL: " + reqURL);
	req.open("GET", reqURL);
	req.setRequestHeader("status", 304);
	console.log(req);
	req.send();
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
	var snake_color_button = document.querySelector("#snake-colors");
	var food_color_button = document.querySelector("#food-colors");
	if (snake_color_button && food_color_button) {
		snake_color_button.addEventListener("change", changeGameColors);
		food_color_button.addEventListener("change", changeGameColors);
	}
});