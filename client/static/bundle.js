(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";function e(e){this.message=e}e.prototype=new Error,e.prototype.name="InvalidCharacterError";var r="undefined"!=typeof window&&window.atob&&window.atob.bind(window)||function(r){var t=String(r).replace(/=+$/,"");if(t.length%4==1)throw new e("'atob' failed: The string to be decoded is not correctly encoded.");for(var n,o,a=0,i=0,c="";o=t.charAt(i++);~o&&(n=a%4?64*n+o:o,a++%4)?c+=String.fromCharCode(255&n>>(-2*a&6)):0)o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(o);return c};function t(e){var t=e.replace(/-/g,"+").replace(/_/g,"/");switch(t.length%4){case 0:break;case 2:t+="==";break;case 3:t+="=";break;default:throw"Illegal base64url string!"}try{return function(e){return decodeURIComponent(r(e).replace(/(.)/g,(function(e,r){var t=r.charCodeAt(0).toString(16).toUpperCase();return t.length<2&&(t="0"+t),"%"+t})))}(t)}catch(e){return r(t)}}function n(e){this.message=e}function o(e,r){if("string"!=typeof e)throw new n("Invalid token specified");var o=!0===(r=r||{}).header?0:1;try{return JSON.parse(t(e.split(".")[o]))}catch(e){throw new n("Invalid token specified: "+e.message)}}n.prototype=new Error,n.prototype.name="InvalidTokenError";const a=o;a.default=o,a.InvalidTokenError=n,module.exports=a;


},{}],2:[function(require,module,exports){
const { initPageBindings } = require('./lib/handlers');

initPageBindings();

},{"./lib/handlers":4}],3:[function(require,module,exports){
const jwt_decode = require('jwt-decode');

async function handleLoginFormSubmit(e) {
	e.preventDefault();
	try {
		const headers = new Headers();
		headers.append('Content-Type', 'application/json');
		const options = {
			headers,
			method: 'POST',
			body: JSON.stringify({
				username: e.target.username.value,
				password: e.target.password.value,
			}),
		};
		const jsonResponse = await fetch('http://localhost:5000/users/login', options);
		const response = await jsonResponse.json();
		if (response.success) {
			const token = response.token.slice(7);
			const decoded = jwt_decode(token);
			localStorage.setItem('token', token);
			localStorage.setItem('username', decoded.username);
			window.location.href = 'http://localhost:3000/profile.html';
		}
	} catch (err) {
		console.log(err);
	}
}

module.exports = { handleLoginFormSubmit };

},{"jwt-decode":1}],4:[function(require,module,exports){
const { showLoginPassword, loadUserProfile } = require('./helpers');
const { handleLoginFormSubmit } = require('./auth');

function bindHandleLoginFormSubmit() {
	const form = document.querySelector('form');
	form.addEventListener('submit', handleLoginFormSubmit);
}

function bindShowLoginPassword() {
	const button = document.querySelector('.toggle-password');
	button.addEventListener('click', showLoginPassword);
}

function bindloadUserProfile() {
	document.addEventListener('DOMContentLoaded', loadUserProfile);
}

function initPageBindings() {
	const path = window.location.pathname.split('.')[0].slice(1);
	if (path === 'login') {
		bindHandleLoginFormSubmit();
		bindShowLoginPassword();
	} else if (path === 'profile') {
		bindloadUserProfile();
	}
}

module.exports = { initPageBindings };

},{"./auth":3,"./helpers":5}],5:[function(require,module,exports){
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

},{"jwt-decode":1}]},{},[2]);
