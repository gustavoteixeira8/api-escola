import Sequelize from 'sequelize';
import UserModel from '../models/UserModel';
import AppError from '../config/AppError';
import AppSuccess from '../config/AppSuccess';

class UserController {
  async create(req, res) {
    try {
      if (UserModel.checkBodyValuesIsEmpty(req.body) || !Object.keys(req.body).length) {
        throw new AppError('Complete all fields', 400, 'BadRequest');
      }

      const {
        id, name, last_name, email, birthdate, profession, updated_at, created_at,
      } = await UserModel.create(req.body);

      const user = { id, name, last_name, email, birthdate, profession, updated_at, created_at };

      return res.status(201).json(new AppSuccess(user, 201, 'Created'));
    } catch (e) {
      if (e instanceof Sequelize.ValidationError) {
        return res.status(400).json(new AppError(e.errors.map((err) => err.message), 400, 'BadRequest'));
      }

      return res.status(e.httpCode || 500).json(e);
    }
  }

  async show(req, res) {
    try {
      const { id } = req.userData;

      const user = await UserModel.findByPk(id);

      if (!user) {
        throw new AppError('User not found', 404, 'NotFound');
      }

      const {
        name, last_name, email, birthdate, profession, updated_at, created_at,
      } = user;

      return res.status(200).json(new AppSuccess(
        { id, name, last_name, email, birthdate, profession, updated_at, created_at }, 200, 'Success',
      ));
    } catch (e) {
      return res.status(e.httpCode || 500).json(e);
    }
  }

  async update(req, res) {
    try {
      if (UserModel.checkBodyValuesIsEmpty(req.body) || !Object.keys(req.body).length) {
        throw new AppError('Complete all fields', 400, 'BadRequest');
      }

      const { id } = req.userData;

      const user = await UserModel.findByPk(id);

      if (!user) {
        throw new AppError('User not found', 404, 'NotFound');
      }

      await user.update(req.body);

      const {
        name, last_name, email, birthdate, profession, updated_at, created_at,
      } = user;

      return res.status(200).json(new AppSuccess(
        { id, name, last_name, email, birthdate, profession, updated_at, created_at }, 200, 'Success',
      ));
    } catch (e) {
      if (e instanceof Sequelize.ValidationError) {
        return res.status(400).json(new AppError(e.errors.map((err) => err.message), 400, 'BadRequest'));
      }

      return res.status(e.httpCode || 500).json(e);
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.userData;

      const user = await UserModel.findByPk(id);

      if (!user) {
        throw new AppError('User not found', 404, 'NotFound');
      }

      await user.destroy();

      return res.status(204).json();
    } catch (e) {
      return res.status(e.httpCode || 500).json(e);
    }
  }
}

export default new UserController();
