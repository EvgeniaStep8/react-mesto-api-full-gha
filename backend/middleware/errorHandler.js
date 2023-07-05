module.exports = (err, req, res, next) => {
  console.log(err);
  const { statusCode = 500 } = err;
  res.status(statusCode).send({ message: err.message });
  next();
};
