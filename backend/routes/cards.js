const cards = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

cards.get('/', getCards);

cards.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required(),
    link: Joi.string().required().regex(/https?:\/\/(w{3}\.)?[\w-]*\.[\w/.!#$%&_?]*/),
  }),
}), createCard);

cards.delete('/:cardId', celebrate({
  body: Joi.object().keys({
    cardId: Joi.string().required().alphanum().length(24),
  }),
}), deleteCard);

cards.put('/:cardId/likes', celebrate({
  body: Joi.object().keys({
    cardId: Joi.string().required().alphanum().length(24),
  }),
}), likeCard);

cards.delete('/:cardId/likes', celebrate({
  body: Joi.object().keys({
    cardId: Joi.string().required().alphanum().length(24),
  }),
}), dislikeCard);

module.exports = cards;