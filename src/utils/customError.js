class NotFoundError extends Error {
    constructor(message) {
      super(message);
      this.name = "NotFoundError";
      this.status = 404;
    }
  }
  class UnauthorizedError extends Error {
    constructor(message) {
      super(message);
      this.name = "UnauthorizedError";
      this.status = 401;
    }
  }
  
  module.exports = {NotFoundError,
    UnauthorizedError}