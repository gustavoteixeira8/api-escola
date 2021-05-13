import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import dotenv from 'dotenv';
import UserModel from '../models/UserModel';
import AppError from '../config/AppError';
dotenv.config();

export default async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      throw new AppError('Missing authorization token', 401, 'Unauthorized');
    }

    const [, token] = authorization.split(' ');

    const { id, email, name } = jwt.verify(token, process.env.TOKEN_SECRET);

    const user = await UserModel.findOne({ where: { id, email } });

    if (!user) {
      throw new AppError('Invalid token', 401, 'Unauthorized');
    }

    req.userData = { id, email, name };
    return next();
  } catch (e) {
    if (e instanceof JsonWebTokenError) {
      return res.status(401).json(new AppError('Invalid token', 401, 'Unauthorized'));
    }

    return res.status(e.httpCode || 500).json(e);
  }
};
