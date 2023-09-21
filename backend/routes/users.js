const router = require('express').Router();
const { validationUserId, validationEditProfileUserInfo, validationUpdateProfileUserAvatar } = require('../utils/validator');

const {
  getUsers,
  getCurrentUser,
  createUser,
  editProfileUserInfo,
  updateProfileUserAvatar,
  getUserInfo,
} = require('../controllers/users');

router.get('/me', getUserInfo);
// Пользователи:
router.get('/', getUsers);
// Конкретный пользователь по его ID:
router.get('/:userId', validationUserId, getCurrentUser);
// Создание пользователя:
router.post('/', createUser);
// Редактирование данных пользователя:
router.patch('/me', validationEditProfileUserInfo, editProfileUserInfo);
// Редактирование аватара пользователя:
router.patch('/me/avatar', validationUpdateProfileUserAvatar, updateProfileUserAvatar);

module.exports = router;
