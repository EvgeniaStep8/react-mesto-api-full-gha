const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');

const { NODE_ENV, JWT_SECRET } = process.env;

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

const getUserById = (req, res, next) => {
  User.findById(req.params.id)
    .orFail(() => new NotFoundError('Пользователь с переаднным id не найден'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.message.includes('Cast to ObjectId failed')) {
        next(new BadRequestError('Передан некорректный id'));
      } else {
        next(err);
      }
    });
};

const getUserMe = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => new NotFoundError('Пользователь с переаднным id не найден'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.message.includes('Cast to ObjectId failed')) {
        next(new BadRequestError('Передан некорректный id'));
      } else {
        next(err);
      }
    });
};

const createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 16)
    .then((hash) => User.create({ ...req.body, password: hash }))
    .then((user) => res.status(201).send(user.toJSON()))
    .catch((err) => {
      if (err.message.includes('validation failed')) {
        next(new BadRequestError('Переданы некорректные данные'));
      } else if (err.message.includes('duplicate key error')) {
        next(new ConflictError('Пользователь с переданным email уже существует'));
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: true,
        })
        .send(user.toJSON())
        .end();
    })
    .catch(next);
};

const updateUser = (req, res, next) => {
  const { _id } = req.user;
  const newUser = req.body;
  User.findByIdAndUpdate(_id, newUser, {
    new: true,
    runValidators: true,
  })
    .orFail(() => new NotFoundError('Пользователь с переаднным id не найден'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.message.includes('Cast to ObjectId failed')) {
        next(new BadRequestError('Передан некорректный id'));
      } else if (err.message.includes('Validation failed')) {
        next(new BadRequestError('Передан некорректные данные пользователя'));
      } else {
        next(err);
      }
    });
};

const updateAvatar = (req, res, next) => {
  const { _id } = req.user;
  const { avatar } = req.body;
  User.findByIdAndUpdate(_id, { avatar }, {
    new: true,
    runValidators: true,
  })
    .orFail(() => new NotFoundError('Пользователь с переаднным id не найден'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.message.includes('Cast to ObjectId failed')) {
        next(new BadRequestError('Передан некорректный id'));
      } else if (err.message.includes('Validation failed')) {
        next(new BadRequestError('Передан некорректные данные пользователя'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getUsers,
  getUserById,
  getUserMe,
  createUser,
  login,
  updateUser,
  updateAvatar,
};
