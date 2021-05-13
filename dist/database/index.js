"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
var _database = require('../config/database'); var _database2 = _interopRequireDefault(_database);
var _StudentModel = require('../models/StudentModel'); var _StudentModel2 = _interopRequireDefault(_StudentModel);
var _UserModel = require('../models/UserModel'); var _UserModel2 = _interopRequireDefault(_UserModel);
var _StudentAvatarModel = require('../models/StudentAvatarModel'); var _StudentAvatarModel2 = _interopRequireDefault(_StudentAvatarModel);

const models = [_StudentModel2.default, _UserModel2.default, _StudentAvatarModel2.default];

const connection = new (0, _sequelize2.default)(_database2.default);

models.forEach((model) => model.init(connection));
models.forEach((model) => model.associate && model.associate(connection.models));

exports. default = connection;
