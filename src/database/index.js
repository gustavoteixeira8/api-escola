import Sequelize from 'sequelize';
import configDB from '../config/database';
import StudentModel from '../models/StudentModel';
import UserModel from '../models/UserModel';
import StudentAvatarModel from '../models/StudentAvatarModel';

const models = [StudentModel, UserModel, StudentAvatarModel];

const connection = new Sequelize(configDB);

models.forEach((model) => model.init(connection));
models.forEach((model) => model.associate && model.associate(connection.models));

export default connection;
