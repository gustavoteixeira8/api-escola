"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
var _UserModel = require('../models/UserModel'); var _UserModel2 = _interopRequireDefault(_UserModel);
var _AppError = require('../config/AppError'); var _AppError2 = _interopRequireDefault(_AppError);
var _AppSuccess = require('../config/AppSuccess'); var _AppSuccess2 = _interopRequireDefault(_AppSuccess);

class UserController {
  async create(req, res) {
    try {
      if (_UserModel2.default.checkBodyValuesIsEmpty(req.body) || !Object.keys(req.body).length) {
        throw new (0, _AppError2.default)('Complete all fields', 400, 'BadRequest');
      }

      const {
        id, name, last_name, email, birthdate, profession, updated_at, created_at,
      } = await _UserModel2.default.create(req.body);

      const user = { id, name, last_name, email, birthdate, profession, updated_at, created_at };

      return res.status(201).json(new (0, _AppSuccess2.default)(user, 201, 'Created'));
    } catch (e) {
      if (e instanceof _sequelize2.default.ValidationError) {
        return res.status(400).json(new (0, _AppError2.default)(e.errors.map((err) => err.message), 400, 'BadRequest'));
      }

      return res.status(e.httpCode || 500).json(e);
    }
  }

  async show(req, res) {
    try {
      const { id } = req.userData;

      const user = await _UserModel2.default.findByPk(id);

      if (!user) {
        throw new (0, _AppError2.default)('User not found', 404, 'NotFound');
      }

      const {
        name, last_name, email, birthdate, profession, updated_at, created_at,
      } = user;

      return res.status(200).json(new (0, _AppSuccess2.default)(
        { id, name, last_name, email, birthdate, profession, updated_at, created_at }, 200, 'Success',
      ));
    } catch (e) {
      return res.status(e.httpCode || 500).json(e);
    }
  }

  async update(req, res) {
    try {
      if (_UserModel2.default.checkBodyValuesIsEmpty(req.body) || !Object.keys(req.body).length) {
        throw new (0, _AppError2.default)('Complete all fields', 400, 'BadRequest');
      }

      const { id } = req.userData;

      const user = await _UserModel2.default.findByPk(id);

      if (!user) {
        throw new (0, _AppError2.default)('User not found', 404, 'NotFound');
      }

      await user.update(req.body);

      const {
        name, last_name, email, birthdate, profession, updated_at, created_at,
      } = user;

      return res.status(200).json(new (0, _AppSuccess2.default)(
        { id, name, last_name, email, birthdate, profession, updated_at, created_at }, 200, 'Success',
      ));
    } catch (e) {
      if (e instanceof _sequelize2.default.ValidationError) {
        return res.status(400).json(new (0, _AppError2.default)(e.errors.map((err) => err.message), 400, 'BadRequest'));
      }

      return res.status(e.httpCode || 500).json(e);
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.userData;

      const user = await _UserModel2.default.findByPk(id);

      if (!user) {
        throw new (0, _AppError2.default)('User not found', 404, 'NotFound');
      }

      await user.destroy();

      return res.status(204).json();
    } catch (e) {
      return res.status(e.httpCode || 500).json(e);
    }
  }
}

exports. default = new UserController();
