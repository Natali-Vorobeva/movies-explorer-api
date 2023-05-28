const Movie = require('../models/movie');

const ForbiddenError = require('../utils/errors/forbidden');
const NotFoundError = require('../utils/errors/not-found');

const getMovies = (req, res, next) => {
  Movie
    .find({ owner: req.user._id })
    .then((movies) => {
      res.status(200).send(movies);
    })
    .catch(next);
};

const createMovies = (req, res, next) => {
  Movie.create({ ...req.body, owner: req.user._id })
    .then((movie) => res.status(201).send(movie))
    .catch((err) => next(err));
};

const deleteMovie = (req, res, next) => {
  const owner = req.user._id;
  const { movieId } = req.params;
  Movie.findById(movieId)
    .orFail(new NotFoundError('Фильм не найден.'))
    .then((movie) => {
      if (owner.toString() === movie.owner.toString()) {
        return Movie.findByIdAndDelete(req.params.movieId)
          .then(() => res.status(200).send({ message: 'Фильм удалён' }));
      }
      throw new ForbiddenError('Нельзя удалять чужой фильм');
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  createMovies,
  getMovies,
  deleteMovie,
};
