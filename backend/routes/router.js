const router = require('express').Router();
const NotFoundStatusCode = require('../utils/ForbiddenError');
const userRoutes = require('./users');
const cardRoutes = require('./cards');
const { createUser, login } = require('../controllers/users');
const { validationCreateUser, validationLogin } = require('../utils/validator');
const auth = require('../middlewares/auth');

router.post('/signup', validationCreateUser, createUser);
router.post('/signin', validationLogin, login);

router.use(auth);

router.use('/users', userRoutes);
router.use('/cards', cardRoutes);

router.use('*', (req, res, next) => {
  next(new NotFoundStatusCode('Страница не найдена'));
});

module.exports = router;
