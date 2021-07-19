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
