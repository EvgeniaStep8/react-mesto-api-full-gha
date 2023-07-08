const { celebrate, Joi } = require('celebrate');
const { ObjectId } = require('mongoose').Types;

// eslint-disable-next-line no-useless-escape
const regexForLink = /https*:\/\/(www.)*[a-z0-9\-\.]{1,}\.[a-z]{2,3}[a-z0-9\-\._~\:\/\?\#\[\]@\!\$&'\(\)\*\+,;\=]*/;

const validateCreateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(regexForLink),
  }),
});

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const validateId = celebrate({
  params: Joi.object().keys({
    id: Joi.required().custom((value, helper) => {
      if (ObjectId.isValid(value)) {
        return value;
      }
      return helper.message('Некорректный id');
    }),
  }),
});

const validateUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(regexForLink),
  }),
});

const validateUpdateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(regexForLink),
  }),
});

const validateCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(regexForLink),
  }),
});

module.exports = {
  validateCreateUser,
  validateLogin,
  validateId,
  validateUpdateUser,
  validateUpdateAvatar,
  validateCreateCard,
};
