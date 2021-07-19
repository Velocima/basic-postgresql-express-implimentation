const usersRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');

// super dodgy get all users endpoint for testing

usersRouter.get('/', async (req, res) => {
	try {
		const users = await User.all;
		res.status(200).send({ users });
	} catch (err) {
		res.status(500).send({ error: err.message });
	}
});

usersRouter.post('/register', async (req, res) => {
	try {
		const { username, password } = req.body;
		const salt = await bcrypt.genSalt();
		const passwordHash = await bcrypt.hash(password, salt);
		const user = await User.createNewUser({ username, password: passwordHash });
		res.status(201).send({ user });
	} catch (err) {
		res.status(500).send({ error: err.message });
	}
});

usersRouter.post('/login', async (req, res) => {
	try {
		const { username, password } = req.body;
		const user = await User.findUserByUsername(username);
		const authed = bcrypt.compare(password, user.password);
		if (authed) {
			const payload = { username: user.username };
			const sendToken = (err, token) => {
				if (err) {
					throw new Error('Error in token generation');
				}
				res.status(200).json({
					success: true,
					token: 'Bearer ' + token,
				});
			};
			jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 300 }, sendToken);
		} else {
			throw new Error('User could not be authenticated');
		}
	} catch (err) {
		res.status(500).send({ error: err.message });
	}
});

module.exports = usersRouter;
