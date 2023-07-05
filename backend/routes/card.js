const cardRoutes = require('express').Router();
const { validateCreateCard, validateId } = require('../middleware/validation');
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

cardRoutes.get('/', getCards);
cardRoutes.post('/', validateCreateCard, createCard);
cardRoutes.delete('/:id', validateId, deleteCard);
cardRoutes.put('/:id/likes', validateId, likeCard);
cardRoutes.delete('/:id/likes', validateId, dislikeCard);

module.exports = cardRoutes;
