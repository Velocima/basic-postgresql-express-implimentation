const { showLoginPassword } = require('./helpers');
const { handleLoginFormSubmit } = require('./auth');

function bindHandleLoginFormSubmit() {
	const form = document.querySelector('form');
	form.addEventListener('submit', handleLoginFormSubmit);
}

function bindShowLoginPassword() {
	const button = document.querySelector('.toggle-password');
	button.addEventListener('click', showLoginPassword);
}

function initPageBindings() {
	const path = window.location.pathname.split('.')[0].slice(1);
	if (path === 'login') {
		bindShowLoginPassword();
		bindHandleLoginFormSubmit();
	}
}

module.exports = { initPageBindings };
