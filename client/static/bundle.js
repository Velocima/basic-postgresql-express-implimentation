(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const { initPageBindings } = require('./lib/handlers');

initPageBindings();

},{"./lib/handlers":3}],2:[function(require,module,exports){
function handleLoginFormSubmit(e) {
	e.preventDefault();
	console.log(e.target.username.value, e.target.password.value);
	const options = {
		headers: new Headers({ ['Accept']: 'application/json' }),
		body: JSON.stringify({
			username: e.target.username.value,
			password: e.target.password.value,
		}),
	};
}

module.exports = { handleLoginFormSubmit };

},{}],3:[function(require,module,exports){
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

},{"./auth":2,"./helpers":4}],4:[function(require,module,exports){
function showLoginPassword(e) {
	e.preventDefault();
	const passwordInput = document.getElementById('password');
	passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
	e.target.innerText = passwordInput.type === 'password' ? 'Show password' : 'Hide Password';
}

module.exports = { showLoginPassword };

},{}]},{},[1]);
