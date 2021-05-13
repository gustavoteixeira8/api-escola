"use strict";Object.defineProperty(exports, "__esModule", {value: true}); class AppSuccess {
  constructor(message = 'Success', httpCode, name) {
    this.message = message;
    this.httpCode = httpCode;
    this.name = name;
  }
} exports.default = AppSuccess;
