import express, { RequestHandler } from 'express';

import { userController } from '@controllers/index';
import { protect } from '@middlewares/auth.middleware';

const router = express.Router();

router.param('userId', function (req, res, next, id) {
  next();
});
router.get('/:userId', protect as RequestHandler, userController.getUser as RequestHandler);
router.post('/', userController.createUser as RequestHandler);
router.delete('/', userController.deleteUser as RequestHandler);

export default router;
