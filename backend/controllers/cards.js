const NotFoundStatusCode = require('../utils/NotFoundStatusCode');
const BadRequestStatusCode = require('../utils/BadRequestStatusCode');
const ForbiddenError = require('../utils/ForbiddenError');
const Card = require('../models/card');

// Все карточки:
module.exports.getInitialCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

// Создание новой карточки:
module.exports.addNewCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => {
      res.status(201).send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestStatusCode('Переданы некорректные данные при создании карточки.'));
      } else {
        next(err);
      }
    });
};

// Удаление карточки:
module.exports.removeCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundStatusCode('Карточка с указанным _id не найдена');
      } else if (card.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Невозможно удалить карточку');
      }
      return Card.deleteOne(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestStatusCode('Переданы некорректные данные карточки.'));
      } else {
        next(err);
      }
    });
};

// Лайк на карточки:
module.exports.addLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundStatusCode('Карточка c указанным id не найдена');
      }
      return res.send(card);
    })
    // eslint-disable-next-line consistent-return
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestStatusCode('Переданы некорректные данные для постановки лайка.'));
      } else {
        next(err);
      }
    });
};

// Удаление лайка с карточки:
module.exports.removeLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundStatusCode('Карточка c указанным id не найдена');
      }
      return res.send(card);
    })
    // eslint-disable-next-line consistent-return
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestStatusCode('Переданы некорректные данные для удаления лайка.'));
      } else {
        next(err);
      }
    });
};
