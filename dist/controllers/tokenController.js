"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _dotenv = require('dotenv'); var _dotenv2 = _interopRequireDefault(_dotenv);
var _UserModel = require('../models/UserModel'); var _UserModel2 = _interopRequireDefault(_UserModel);
var _AppError = require('../config/AppError'); var _AppError2 = _interopRequireDefault(_AppError);
var _AppSuccess = require('../config/AppSuccess'); var _AppSuccess2 = _interopRequireDefault(_AppSuccess);
_dotenv2.default.config();

class TokenController {
  async create(req, res) {
    try {
      const { email = '', password = '' } = req.body;

      if (!email || !password) {
        throw new (0, _AppError2.default)('Complete all fields', 400, 'BadRequest');
      }

      const user = await _UserModel2.default.findOne({ where: { email } });

      if (!user) {
        throw new (0, _AppError2.default)('User not found', 404, 'NotFound');
      }

      if (!(await user.checkPassword(password))) {
        throw new (0, _AppError2.default)('Invalid password', 400, 'BadRequest');
      }

      const { id, name } = user;

      const token = _jsonwebtoken2.default.sign({ id, email, name }, process.env.TOKEN_SECRET, {
        expiresIn: process.env.TOKEN_EXPIRATION,
      });

      return res.status(200).json(new (0, _AppSuccess2.default)({ token }, 200, 'Success'));
    } catch (e) {
      return res.status(e.httpCode || 500).json(e);
    }
  }
}

exports. default = new TokenController();
