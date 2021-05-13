import Sequelize, { Model } from 'sequelize';
import appConfig from '../config/appConfig';

export default class StudentAvatar extends Model {
  static init(sequelize) {
    super.init({
      originalname: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Originalname cannot be empty',
          },
        },
      },
      filename: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Filename cannot be empty',
          },
        },
      },
      urlImage: {
        type: Sequelize.VIRTUAL,
        get() {
          return `${appConfig.urlImage}/images/${this.getDataValue('filename')}`;
        },
      },
    }, { sequelize, tableName: 'student_avatars' });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Student, { foreignKey: 'id_student' });
  }
}
