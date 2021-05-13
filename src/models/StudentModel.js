import Sequelize, { Model } from 'sequelize';

export default class Student extends Model {
  static init(sequelize) {
    super.init({
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
        validate: {
          len: {
            args: [2, 100],
            msg: 'Name must be longer than 2 characters',
          },
          not: {
            args: /[-!$%^&*()_+|~&@=`{}\[\]:";'<>?,\.\/]/g,
            msg: 'The name does not accept symbols',
          },
        },
      },
      last_name: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
        validate: {
          len: {
            args: [2, 100],
            msg: 'Last name must be longer than 2 characters',
          },
          not: {
            args: /[-!$%^&*()_+|~=`{}\[\]:";'<>?,\.\/]/g,
            msg: 'The last name does not accept symbols',
          },
        },
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        defaultValue: '',
        validate: {
          len: {
            args: [5, 200],
            msg: 'Email must be longer than 2 characters',
          },
          isEmail: {
            msg: 'Invalid email',
          },
          async isUnique(value, next) {
            try {
              const student = await Student.findOne({ where: { email: value } });

              if (student) throw new Sequelize.ValidationError('Email already exists');

              return next();
            } catch (e) {
              return next(e);
            }
          },
        },
      },
      birthdate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        defaultValue: '',
        validate: {
          isDate: {
            args: true,
            msg: 'Birth Date must be a Date',
          },
          isAfter: {
            args: `${new Date().getFullYear() - 100}-01-01`,
            msg: `Birth Date must be greater than ${new Date().getFullYear() - 100}`,
          },
        },
      },
      grade: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: '',
        validate: {
          max: {
            args: 9,
            msg: 'Max grade: 9',
          },
          min: {
            args: 1,
            msg: 'Min grade: 1',
          },
          isInt: {
            args: true,
            msg: 'Grade must be an integer',
          },
        },
      },
      class: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: '',
        validate: {
          max: {
            args: 999,
            msg: 'Max class: 999',
          },
          min: {
            args: 100,
            msg: 'Min class: 100',
          },
          isInt: {
            args: true,
            msg: 'Class must be an integer',
          },
        },
      },
    }, { sequelize });

    return this;
  }

  static associate(models) {
    this.hasMany(models.StudentAvatar, { foreignKey: 'id_student' });
  }

  static checkBodyValuesIsEmpty(body) {
    // Se existir uma STR com valor FALSY, retorna false
    return Object.values(body)
      .map((str) => !!str)
      .includes(false);
  }
}
