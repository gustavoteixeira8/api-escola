import { Router } from 'express';
import studentAvatarController from '../controllers/studentAvatarController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.use(loginRequired);

router.post('/:studentId', studentAvatarController.create);

export default router;
