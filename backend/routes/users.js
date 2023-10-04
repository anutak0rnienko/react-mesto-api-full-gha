const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { urlRegexPattern } = require('../utils/constants');
const {
  getUsersInfo,
  getUserId,
  getCurrentUserInfo,
  editProfileUserInfo,
  updateProfileUserAvatar,
} = require('../controllers/users');

router.get('/', getUsersInfo);
router.get('/me', getCurrentUserInfo);

router.get(
  '/:id',
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().length(24).hex().required(),
    }),
  }),
  getUserId,
);

router.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
    }),
  }),
  editProfileUserInfo,
);

router.patch(
  '/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().pattern(urlRegexPattern),
    }),
  }),
  updateProfileUserAvatar,
);

module.exports = router;
