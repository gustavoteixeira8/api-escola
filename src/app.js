import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import helmet from 'helmet';
import { resolve } from 'path';
import './database'; // Executa o método init do model
import userRoutes from './routes/userRoutes';
import tokenRoutes from './routes/tokenRoutes';
import studentRoutes from './routes/studentRoutes';
import studentAvatarRoutes from './routes/studentAvatarRoutes';

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(express.static(resolve('uploads')));
    this.app.use(helmet());
  }

  routes() {
    this.app.use('/user', userRoutes);
    this.app.use('/token', tokenRoutes);
    this.app.use('/student', studentRoutes);
    this.app.use('/student-avatar', studentAvatarRoutes);
    this.app.use((req, res) => res.status(404).json({ message: 'Not Found', httpCode: 404, name: 'NotFound' }));
  }
}

export default new App().app;
