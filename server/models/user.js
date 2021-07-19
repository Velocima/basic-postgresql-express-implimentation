const db = require('../initdb');

class User {
	constructor({ username, password }) {
		this.username = username;
		this.password = password;
	}

	static get all() {
		return new Promise(async (resolve, reject) => {
			try {
				const userData = await db.query('SELECT * FROM users;');
				const users = userData.rows.map((user) => new User(user));
				resolve(users);
			} catch (err) {
				reject(err.message);
			}
		});
	}

	static createNewUser({ username, password }) {
		return new Promise(async (resolve, reject) => {
			try {
				const user = await db.query(
					'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING username;',
					[username, password]
				);
				if (!user.rows[0]) {
					throw new Error('User creation failed');
				}
				resolve(user.rows[0]);
			} catch (err) {
				reject(err);
			}
		});
	}

	static findUserByUsername(username) {
		return new Promise(async (resolve, reject) => {
			try {
				const user = await db.query('SELECT * FROM users WHERE username = $1', [username]);
				if (!user.rows[0]) {
					throw new Error('User not found');
				}
				resolve(user.rows[0]);
			} catch (err) {
				reject(err);
			}
		});
	}
}

module.exports = User;
