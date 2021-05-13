import Sequelize from 'sequelize';
import AppError from '../config/AppError';
import AppSuccess from '../config/AppSuccess';
import StudentModel from '../models/StudentModel';
import StudentAvatarModel from '../models/StudentAvatarModel';

class StudentController {
  async create(req, res) {
    try {
      if (StudentModel.checkBodyValuesIsEmpty(req.body) || !Object.keys(req.body).length) {
        throw new AppError('Complete all fields', 400, 'BadRequest');
      }

      const student = await StudentModel.create(req.body);

      return res.status(201).json(new AppSuccess(student, 201, 'Created'));
    } catch (e) {
      if (e instanceof Sequelize.ValidationError) {
        return res.status(400).json(new AppError(e.errors.map((err) => err.message), 400, 'BadRequest'));
      }

      return res.status(e.httpCode || 500).json(e);
    }
  }

  async index(req, res) {
    try {
      const students = await StudentModel.findAll({
        include: { model: StudentAvatarModel, order: ['created_at', 'DESC'] },
      });

      return res.status(200).json(new AppSuccess(students, 200, 'Success'));
    } catch (e) {
      return res.status(500).json({});
    }
  }

  async show(req, res) {
    try {
      const { studentId } = req.params;

      const student = await StudentModel.findOne({
        where: { id: studentId },
        include: { model: StudentAvatarModel, order: ['created_at', 'DESC'] },
      });

      if (!student) {
        throw new AppError('Student not found', 404, 'NotFound');
      }

      return res.status(200).json(new AppSuccess(student, 200, 'Success'));
    } catch (e) {
      return res.status(e.httpCode || 500).json(e);
    }
  }

  async update(req, res) {
    try {
      if (StudentModel.checkBodyValuesIsEmpty(req.body) || !Object.keys(req.body).length) {
        throw new AppError('Complete all fields', 400, 'BadRequest');
      }

      const { studentId } = req.params;

      const student = await StudentModel.findByPk(studentId);

      if (!student) {
        throw new AppError('Student not found', 404, 'NotFound');
      }

      await student.update(req.body);

      const {
        name, last_name, email, birthdate, grade, updated_at, created_at,
      } = student;

      return res.status(200).json(new AppSuccess(
        { name, last_name, email, birthdate, class: student.class, grade, updated_at, created_at }, 200, 'Success',
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
      const { studentId } = req.params;

      const student = await StudentModel.findByPk(studentId);

      if (!student) {
        throw new AppError('Student not found', 404, 'NotFound');
      }

      await student.destroy();

      return res.status(204).json();
    } catch (e) {
      return res.status(e.httpCode || 500).json(e);
    }
  }
}

export default new StudentController();
