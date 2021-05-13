"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);
var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
var _multer3 = require('../config/multer'); var _multer4 = _interopRequireDefault(_multer3);
var _StudentAvatarModel = require('../models/StudentAvatarModel'); var _StudentAvatarModel2 = _interopRequireDefault(_StudentAvatarModel);
var _StudentModel = require('../models/StudentModel'); var _StudentModel2 = _interopRequireDefault(_StudentModel);
var _AppError = require('../config/AppError'); var _AppError2 = _interopRequireDefault(_AppError);
var _AppSuccess = require('../config/AppSuccess'); var _AppSuccess2 = _interopRequireDefault(_AppSuccess);

const uploads = _multer2.default.call(void 0, _multer4.default).single('studentAvatar');

class StudentAvatarController {
  create(req, res) {
    uploads(req, res, async (err) => {
      try {
        if (err) {
          throw new (0, _AppError2.default)(err.message, 400, 'BadRequest');
        }

        const { originalname, filename } = req.file;
        const { studentId: id_student } = req.params;

        const student = await _StudentModel2.default.findByPk(id_student);

        if (!student) {
          throw new (0, _AppError2.default)('Student not found', 404, 'NotFound');
        }

        const avatar = await _StudentAvatarModel2.default.create({ originalname, filename, id_student });

        return res.status(201).json(new (0, _AppSuccess2.default)({ avatar, student }, 201, 'Created'));
      } catch (e) {
        console.log(e);
        if (e instanceof _sequelize2.default.ValidationError) {
          return res.status(400).json(new (0, _AppError2.default)(e.errors.map((error) => error.message), 400, 'BadRequest'));
        }

        return res.status(e.httpCode || 500).json(e);
      }
    });
  }
}

exports. default = new StudentAvatarController();
