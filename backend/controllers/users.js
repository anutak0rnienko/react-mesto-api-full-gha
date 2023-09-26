const { JWT_SECRET, NODE_ENV } = process.env;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/user');
const NotFoundStatusCode = require('../utils/NotFoundStatusCode');
const BadRequestStatusCode = require('../utils/BadRequestStatusCode');
const ErrorConflict = require('../utils/ErrorConflict');
const IntervalServerErrorStatusCode = require('../utils/IntervalServerErrorStatusCode');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

module.exports.getCurrentUser = (req, res, next) => {
  User
    .findById(req.params.userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundStatusCode('Пользователь не найден');
      } else {
        next(res.send(user));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestStatusCode('Переданные некорректные данные при поиске пользователя'));
        return;
      }
      next(err);
    });
};

// Регистрация
module.exports.createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;
  const passwordHash = bcrypt.hash(password, 10);
  passwordHash.then((hash) => User.create({
    name,
    about,
    avatar,
    email,
    password: hash,
  }))
    .then((data) => res.status(201).send({
      name: data.name,
      about: data.about,
      avatar: data.avatar,
      _id: data._id,
      email: data.email,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestStatusCode('Неверно'));
      } else if (err.code === 11000) {
        next(new ErrorConflict('Пользователь с таким email уже зарегистрирован'));
        return;
      }
      next(err);
    });
};

// Редактирование данных пользователя:
module.exports.editProfileUserInfo = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  ).then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestStatusCode('Ошибка валидации'));
      } else {
        next(new IntervalServerErrorStatusCode('На сервере произошла ошибка'));
      }
    });
};

// Редактирование аватара пользователя:
module.exports.updateProfileUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestStatusCode('Ошибка валидации'));
      } else {
        next(new IntervalServerErrorStatusCode('На сервере произошла ошибка'));
      }
    });
};

// Авторизация пользователя
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      // создадим токен
      const tokenJwt = jwt.sign(
        { _id: user._id },
        `${NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret'}`,
        { expiresIn: '7d' },
      );
      res.cookie('jwt', tokenJwt, {
        maxAge: 24 * 7 * 60 * 60,
        httpOnly: true,
        sameSite: true,
      })
        .send({ message: 'Вы успешно авторизировались' });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        next(new NotFoundStatusCode('Переданы некорректные данные при получение информации о пользователе'));
      } else {
        res.status(200).send({ data: user });
      }
    })
    .catch((err) => { next(err); });
};
