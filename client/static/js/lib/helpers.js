function showLoginPassword(e) {
	e.preventDefault();
	const passwordInput = document.getElementById('password');
	passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
	e.target.innerText = passwordInput.type === 'password' ? 'Show password' : 'Hide Password';
}

module.exports = { showLoginPassword };
