"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
var _appConfig = require('../config/appConfig'); var _appConfig2 = _interopRequireDefault(_appConfig);

 class StudentAvatar extends _sequelize.Model {
  static init(sequelize) {
    super.init({
      originalname: {
        type: _sequelize2.default.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Originalname cannot be empty',
          },
        },
      },
      filename: {
        type: _sequelize2.default.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Filename cannot be empty',
          },
        },
      },
      urlImage: {
        type: _sequelize2.default.VIRTUAL,
        get() {
          return `${_appConfig2.default.urlImage}/images/${this.getDataValue('filename')}`;
        },
      },
    }, { sequelize, tableName: 'student_avatars' });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Student, { foreignKey: 'id_student' });
  }
} exports.default = StudentAvatar;
