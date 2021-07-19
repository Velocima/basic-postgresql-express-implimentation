const jwt_decode = require('jwt-decode');

function showLoginPassword(e) {
	e.preventDefault();
	const passwordInput = document.getElementById('password');
	passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
	e.target.innerText = passwordInput.type === 'password' ? 'Show password' : 'Hide Password';
}

function loadUserProfile() {
	const token = localStorage.getItem('token');
	if (jwt_decode(token).exp < Date.now() / 1000) {
		window.location.href = 'http://localhost:3000/login.html';
		localStorage.removeItem('username');
		localStorage.removeItem('token');
		return;
	}
	const username = localStorage.getItem('username');
	const header = document.querySelector('h1');
	header.innerText = `Hey, ${username}`;
}

module.exports = { showLoginPassword, loadUserProfile };
