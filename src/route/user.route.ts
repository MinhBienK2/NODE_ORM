import express, { RequestHandler } from 'express';

import { userController } from '@controllers/index';

const router = express.Router();

router.param('userId', function (req, res, next, id) {
  console.log(id);
  console.log('CALLED ONLY ONCE');
  next();
});
router.get('/:userId', userController.getUser as RequestHandler);
router.post('/', userController.createUser as RequestHandler);
router.delete('/', userController.deleteUser as RequestHandler);

export default router;
