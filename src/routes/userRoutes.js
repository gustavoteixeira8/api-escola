import { Router } from 'express';
import userController from '../controllers/userController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.post('/', userController.create);

router.use(loginRequired);

router.get('/', userController.show);
router.put('/', userController.update);
router.delete('/', userController.delete);

/*
  * Create - POST
  * Update - PUT
  * Show (Show one USER) - GET
  * Delete - DELETE
*/

export default router;
