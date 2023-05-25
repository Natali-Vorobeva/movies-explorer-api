const moviesRouter = require('express').Router();
const { getMovies, createMovies, deleteMovie } = require('../controllers/movies');

const { validateMoviesPost, validateMovieId } = require('../middlewares/celebrate');

moviesRouter.get('/', getMovies);
moviesRouter.post('/', validateMoviesPost, createMovies);
moviesRouter.delete('/:movieId', validateMovieId, deleteMovie);

module.exports = moviesRouter;
