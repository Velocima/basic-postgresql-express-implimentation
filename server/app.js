const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
	res.send({ message: 'Hello World!' });
});

const animeRouter = require('./controllers/anime');
app.use('/anime', animeRouter);

const usersRouter = require('./controllers/users');
app.use('/users', usersRouter);

module.exports = app;
