const users = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers, getUser, updateAvatar, updateUserInfo, getCurrentUser,
} = require('../controllers/users');

users.get('/', getUsers);
users.get('/me', getCurrentUser);

users.get('/:_id', celebrate({
  params: Joi.object().keys({
    _id: Joi.string().alphanum().length(24),
  }),
}), getUser);

users.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUserInfo);

users.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(/https?:\/\/(w{3}\.)?[\w-]*\.[\w/.!#$%&_?]*/),
  }),
}), updateAvatar);

module.exports = users;
