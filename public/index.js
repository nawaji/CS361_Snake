var PH_score;

function openUserModal() {
	PH_score = PHScore();
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
}

function handleUserModalAccept() {
	var user_name = document.getElementById("name-input-textfield").value.trim();
	var user_score = PH_score;

	var req = new XMLHttpRequest()
	var reqURL = "/add-user-rank";
	console.log("== reqURL: " + reqURL);
	req.open("POST", reqURL);

	let user = {
		name: user_name,
		score: user_score
	}

	console.log("== new user entry: ", user);
	console.log("== req: ", req);
	req.setRequestHeader("Content-Type", "application/json");

	var reqBody = JSON.stringify(user);
	req.send(reqBody);

	closeUserModal();
	window.location.reload();
}

function PHScore() {
	var user_score = document.getElementById("user-score");
	var new_score = randScore();
	user_score.textContent = "You scored: " + new_score;

	return new_score;
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