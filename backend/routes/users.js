const userRoutes = require('express').Router();
const {
  validateId,
  validateUpdateUser,
  validateUpdateAvatar,
} = require('../middleware/validation');
const {
  getUsers,
  getUserById,
  getUserMe,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

userRoutes.get('/', getUsers);
userRoutes.get('/me', getUserMe);
userRoutes.get('/:id', validateId, getUserById);
userRoutes.patch('/me', validateUpdateUser, updateUser);
userRoutes.patch('/me/avatar', validateUpdateAvatar, updateAvatar);

module.exports = userRoutes;
