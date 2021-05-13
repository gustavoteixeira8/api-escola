"use strict";Object.defineProperty(exports, "__esModule", {value: true}); class AppError extends Error {
  constructor(message = 'Error', httpCode, name) {
    super();
    Error.captureStackTrace(this);
    this.message = message;
    this.httpCode = httpCode;
    this.name = name;
  }
} exports.default = AppError;
