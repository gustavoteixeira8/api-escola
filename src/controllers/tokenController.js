import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import UserModel from '../models/UserModel';
import AppError from '../config/AppError';
import AppSuccess from '../config/AppSuccess';
dotenv.config();

class TokenController {
  async create(req, res) {
    try {
      const { email = '', password = '' } = req.body;

      if (!email || !password) {
        throw new AppError('Complete all fields', 400, 'BadRequest');
      }

      const user = await UserModel.findOne({ where: { email } });

      if (!user) {
        throw new AppError('User not found', 404, 'NotFound');
      }

      if (!(await user.checkPassword(password))) {
        throw new AppError('Invalid password', 400, 'BadRequest');
      }

      const { id, name } = user;

      const token = jwt.sign({ id, email, name }, process.env.TOKEN_SECRET, {
        expiresIn: process.env.TOKEN_EXPIRATION,
      });

      return res.status(200).json(new AppSuccess({ token, user: { id, name, email } }, 200, 'Success'));
    } catch (e) {
      return res.status(e.httpCode || 500).json(e);
    }
  }
}

export default new TokenController();
