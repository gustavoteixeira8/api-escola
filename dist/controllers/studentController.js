"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
var _AppError = require('../config/AppError'); var _AppError2 = _interopRequireDefault(_AppError);
var _AppSuccess = require('../config/AppSuccess'); var _AppSuccess2 = _interopRequireDefault(_AppSuccess);
var _StudentModel = require('../models/StudentModel'); var _StudentModel2 = _interopRequireDefault(_StudentModel);
var _StudentAvatarModel = require('../models/StudentAvatarModel'); var _StudentAvatarModel2 = _interopRequireDefault(_StudentAvatarModel);

class StudentController {
  async create(req, res) {
    try {
      if (_StudentModel2.default.checkBodyValuesIsEmpty(req.body) || !Object.keys(req.body).length) {
        throw new (0, _AppError2.default)('Complete all fields', 400, 'BadRequest');
      }

      const student = await _StudentModel2.default.create(req.body);

      return res.status(201).json(new (0, _AppSuccess2.default)(student, 201, 'Created'));
    } catch (e) {
      if (e instanceof _sequelize2.default.ValidationError) {
        return res.status(400).json(new (0, _AppError2.default)(e.errors.map((err) => err.message), 400, 'BadRequest'));
      }

      return res.status(e.httpCode || 500).json(e);
    }
  }

  async index(req, res) {
    try {
      const students = await _StudentModel2.default.findAll({
        include: { model: _StudentAvatarModel2.default, order: ['created_at', 'DESC'] },
      });

      return res.status(200).json(new (0, _AppSuccess2.default)(students, 200, 'Success'));
    } catch (e) {
      return res.status(500).json({});
    }
  }

  async show(req, res) {
    try {
      const { studentId } = req.params;

      const student = await _StudentModel2.default.findOne({
        where: { id: studentId },
        include: { model: _StudentAvatarModel2.default, order: ['created_at', 'DESC'] },
      });

      if (!student) {
        throw new (0, _AppError2.default)('Student not found', 404, 'NotFound');
      }

      return res.status(200).json(new (0, _AppSuccess2.default)(student, 200, 'Success'));
    } catch (e) {
      return res.status(e.httpCode || 500).json(e);
    }
  }

  async update(req, res) {
    try {
      if (_StudentModel2.default.checkBodyValuesIsEmpty(req.body) || !Object.keys(req.body).length) {
        throw new (0, _AppError2.default)('Complete all fields', 400, 'BadRequest');
      }

      const { studentId } = req.params;

      const student = await _StudentModel2.default.findByPk(studentId);

      if (!student) {
        throw new (0, _AppError2.default)('Student not found', 404, 'NotFound');
      }

      await student.update(req.body);

      const {
        name, last_name, email, birthdate, grade, updated_at, created_at,
      } = student;

      return res.status(200).json(new (0, _AppSuccess2.default)(
        { name, last_name, email, birthdate, class: student.class, grade, updated_at, created_at }, 200, 'Success',
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
      const { studentId } = req.params;

      const student = await _StudentModel2.default.findByPk(studentId);

      if (!student) {
        throw new (0, _AppError2.default)('Student not found', 404, 'NotFound');
      }

      await student.destroy();

      return res.status(204).json();
    } catch (e) {
      return res.status(e.httpCode || 500).json(e);
    }
  }
}

exports. default = new StudentController();
