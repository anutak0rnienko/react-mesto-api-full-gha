const router = require('express').Router();
const { validationAddNewCard, validationCardId } = require('../utils/validator');

const {
  getInitialCards,
  addNewCard,
  removeCard,
  addLike,
  removeLike,
} = require('../controllers/cards');

// Все карточки:
router.get('/', getInitialCards);
// Создание новой карточки:
router.post('/', validationAddNewCard, addNewCard);
// Удаление карточки:
router.delete('/:cardId', validationCardId, removeCard);
// Лайк на карточки:
router.put('/:cardId/likes', validationCardId, addLike);
// Удаление лайка с карточки:
router.delete('/:cardId/likes', validationCardId, removeLike);

module.exports = router;
