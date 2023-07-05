const router = require('express').Router();
const userRoutes = require('./users');
const cardRoutes = require('./card');
const NotFoundError = require('../errors/NotFoundError');

router.use('/users', userRoutes);
router.use('/cards', cardRoutes);
router.use('*', (req, res, next) => next(new NotFoundError('Указан несуществующий маршрут')));

module.exports = router;
