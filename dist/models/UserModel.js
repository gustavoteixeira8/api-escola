"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
var _bcryptjs = require('bcryptjs'); var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

 class User extends _sequelize.Model {
  static init(sequelize) {
    super.init({
      name: {
        type: _sequelize2.default.STRING,
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
        type: _sequelize2.default.STRING,
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
        type: _sequelize2.default.STRING,
        defaultValue: '',
        allowNull: false,
        validate: {
          isEmail: {
            msg: 'Invalid email',
          },
          async isUnique(value, next) {
            try {
              const user = await User.findOne({ where: { email: value } });

              if (user) throw new _sequelize2.default.ValidationError('Email already exists');

              return next();
            } catch (e) {
              return next(e);
            }
          },
        },
      },
      birthdate: {
        type: _sequelize2.default.DATEONLY,
        allowNull: false,
        defaultValue: '',
        validate: {
          isDate: {
            args: true,
            msg: 'Birth Date must be a Date',
          },
          isAfter: {
            args: `${new Date().getFullYear() - 100}-01-01`,
            msg: `Birth Date must be longer than ${new Date().getFullYear() - 100}-01-01`,
          },
        },
      },
      profession: {
        type: _sequelize2.default.STRING,
        allowNull: false,
        defaultValue: '',
        validate: {
          len: {
            args: [5, 200],
            msg: 'Profession must be longer than 5 characters',
          },
          not: {
            args: /[-!$%^&*()_+|~=`{}\[\]:";'<>?,\.\/]/g,
            msg: 'Profession does not accept symbols',
          },
        },
      },
      password_hash: {
        type: _sequelize2.default.STRING,
      },
      password: {
        type: _sequelize2.default.VIRTUAL,
        defaultValue: '',
        validate: {
          len: {
            args: [5, 200],
            msg: 'Password must be longer than 5 characters',
          },
        },
      },
    }, { sequelize });

    this.addHook('beforeSave', async (user) => {
      if (!user.password) return;
      user.password_hash = await _bcryptjs2.default.hash(user.password, 8);
    });

    return this;
  }

  checkPassword(password) {
    return _bcryptjs2.default.compare(password, this.password_hash);
  }

  static checkBodyValuesIsEmpty(body) {
    // Se existir uma STR com valor FALSY, retorna false
    return Object.values(body)
      .map((str) => !!str)
      .includes(false);
  }
} exports.default = User;
