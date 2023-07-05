class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'BadRequestError';
    this.statusCode = 404;
  }
}

module.exports = NotFoundError;
