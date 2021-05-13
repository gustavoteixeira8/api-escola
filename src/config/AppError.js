export default class AppError extends Error {
  constructor(message = 'Error', httpCode, name) {
    super();
    Error.captureStackTrace(this);
    this.message = message;
    this.httpCode = httpCode;
    this.name = name;
  }
}
