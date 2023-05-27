const Movie = require('../models/movie');

const ForbiddenError = require('../utils/errors/forbidden');
const NotFoundError = require('../utils/errors/not-found');

const getMovies = (req, res, next) => {
  Movie
    .find({})
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

  Movie.findById(req.params.filmId)
    .orFail(new NotFoundError('Фильм не найден.'))
    .then((movie) => {
      if (movie.owner.toString() !== owner) {
        return new ForbiddenError('Отсутствие прав на удаление фильма.');
      }
      return Movie.findByIdAndRemove(req.params.cardId);
    })
    .then(() => res.send({ message: 'Фильм удалён' }))
    .catch((err) => next(err));
};

const likeMovie = (req, res, next) => {
  Movie.findByIdAndUpdate(
    req.params.movieId,
    { $addToSet: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
    .orFail(new NotFoundError('Не найдено.'))
    .then((movie) => {
      res.status(200).send({ data: movie });
    })
    .catch((err) => {
      next(err);
    });
};

const deleteLike = (req, res, next) => {
  Movie.findByIdAndUpdate(
    req.params.movieId,
    {
      $pull: { likes: req.user._id },
    },
    { new: true, runValidators: true },
  )
    .orFail(new NotFoundError('Не найдено.'))
    .then((movie) => {
      res.status(200).send({ data: movie });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  createMovies,
  getMovies,
  deleteMovie,
  likeMovie,
  deleteLike,
};
