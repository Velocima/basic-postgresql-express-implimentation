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
