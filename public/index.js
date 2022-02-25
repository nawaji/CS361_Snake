function openUserModal() {
	let modalBackground = document.getElementById("modal-background");
	var userModal = document.getElementById("add-user-modal");

	modalBackground.classList.remove("hidden");
	userModal.classList.remove("hidden");
}

function closeUserModal() {
	let modalBackground = document.getElementById("modal-background");
	var userModal = document.getElementById("add-user-modal");

	modalBackground.classList.add("hidden");
	userModal.classList.add("hidden");	
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
});