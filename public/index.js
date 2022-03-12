var PH_score;

function openUserModal() {
	PHScore();
	var modalBackground = document.getElementById("modal-background");
	var userModal = document.getElementById("add-user-modal");

	modalBackground.classList.remove("hidden");
	userModal.classList.remove("hidden");
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
	var req = new XMLHttpRequest()
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

});