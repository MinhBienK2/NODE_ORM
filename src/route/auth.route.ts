import express, { RequestHandler } from 'express';

import { authController } from '@controllers/index';

const router = express.Router();

router.post('/login', authController.login as RequestHandler);
router.post('/register', authController.register as RequestHandler);
router.delete('/refresh', authController.refreshToken as RequestHandler);

export default router;
