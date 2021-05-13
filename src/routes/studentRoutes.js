import { Router } from 'express';
import loginRequired from '../middlewares/loginRequired';
import studentController from '../controllers/studentController';

const router = new Router();

router.use(loginRequired);

router.post('/', studentController.create);
router.get('/', studentController.index);
router.get('/:studentId', studentController.show);
router.put('/:studentId', studentController.update);
router.delete('/:studentId', studentController.delete);

export default router;
