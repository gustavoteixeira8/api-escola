import multer from 'multer';
import Sequelize from 'sequelize';
import multerConfig from '../config/multer';
import StudentAvatarModel from '../models/StudentAvatarModel';
import StudentModel from '../models/StudentModel';
import AppError from '../config/AppError';
import AppSuccess from '../config/AppSuccess';

const uploads = multer(multerConfig).single('studentAvatar');

class StudentAvatarController {
  create(req, res) {
    uploads(req, res, async (err) => {
      try {
        if (err) {
          throw new AppError(err.message, 400, 'BadRequest');
        }

        const { originalname, filename } = req.file;
        const { studentId: id_student } = req.params;

        const student = await StudentModel.findByPk(id_student);

        if (!student) {
          throw new AppError('Student not found', 404, 'NotFound');
        }

        const avatar = await StudentAvatarModel.create({ originalname, filename, id_student });

        return res.status(201).json(new AppSuccess({ avatar, student }, 201, 'Created'));
      } catch (e) {
        console.log(e);
        if (e instanceof Sequelize.ValidationError) {
          return res.status(400).json(new AppError(e.errors.map((error) => error.message), 400, 'BadRequest'));
        }

        return res.status(e.httpCode || 500).json(e);
      }
    });
  }
}

export default new StudentAvatarController();
