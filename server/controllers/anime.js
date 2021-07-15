const animeRouter = require('express').Router();
const Anime = require('../models/anime');

animeRouter.get('/', async (req, res) => {
	try {
		const anime = await Anime.all;
		res.send({ anime });
	} catch (err) {
		res.status(500).send({ error: err.message });
	}
});

animeRouter.get('/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const anime = await Anime.findAnimeById(id);
		res.send({ anime });
	} catch (err) {
		if (err.message === 'Anime not found.') {
			res.status(404).send({ error: err.message });
		} else {
			res.status(500).send({ error: err.message });
		}
	}
});

animeRouter.post('/', async (req, res) => {
	try {
		const { anime } = req.body;
		const newAnime = await Anime.addNewAnime(anime);
		res.send({ newAnime });
	} catch (err) {
		res.status(500).send({ err: err.message });
	}
});

module.exports = animeRouter;
