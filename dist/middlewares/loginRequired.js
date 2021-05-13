"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _dotenv = require('dotenv'); var _dotenv2 = _interopRequireDefault(_dotenv);
var _UserModel = require('../models/UserModel'); var _UserModel2 = _interopRequireDefault(_UserModel);
var _AppError = require('../config/AppError'); var _AppError2 = _interopRequireDefault(_AppError);
_dotenv2.default.config();

exports. default = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      throw new (0, _AppError2.default)('Missing authorization token', 401, 'Unauthorized');
    }

    const [, token] = authorization.split(' ');

    const { id, email, name } = _jsonwebtoken2.default.verify(token, process.env.TOKEN_SECRET);

    const user = await _UserModel2.default.findOne({ where: { id, email } });

    if (!user) {
      throw new (0, _AppError2.default)('Invalid token', 401, 'Unauthorized');
    }

    req.userData = { id, email, name };
    return next();
  } catch (e) {
    if (e instanceof _jsonwebtoken.JsonWebTokenError) {
      return res.status(401).json(new (0, _AppError2.default)('Invalid token', 401, 'Unauthorized'));
    }

    return res.status(e.httpCode || 500).json(e);
  }
};
