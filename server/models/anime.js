const db = require('../initdb');

class Anime {
	constructor({ id, title, genre, rating }) {
		this.id = id;
		this.title = title;
		this.genre = genre;
		this.rating = rating;
	}

	static get all() {
		return new Promise(async (resolve, reject) => {
			try {
				const animeData = await db.query('SELECT * FROM anime;');
				const anime = animeData.rows.map((anime) => new Anime(anime));
				resolve(anime);
			} catch (err) {
				reject(err.message);
			}
		});
	}

	static findAnimeById(id) {
		return new Promise(async (resolve, reject) => {
			try {
				const animeData = await db.query('SELECT * FROM anime WHERE id = $1;', [id]);
				if (!animeData.rows[0]) {
					throw new Error('Anime not found.');
				}
				resolve(animeData.rows[0]);
			} catch (err) {
				reject(err);
			}
		});
	}

	static addNewAnime({ title, genre, rating }) {
		return new Promise(async (resolve, reject) => {
			try {
				const values = [title, genre, rating];
				const animeData = await db.query(
					'INSERT INTO anime (title, genre, rating) VALUES ($1, $2, $3) RETURNING *;',
					values
				);
				resolve(animeData.rows);
			} catch (err) {
				reject(err);
			}
		});
	}
}

module.exports = Anime;
