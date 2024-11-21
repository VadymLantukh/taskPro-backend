import { Router } from 'express';

import { validateBody } from '../middlewares/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  getUserController,
  loginUsersController,
  logoutUserController,
  refreshUsersSessionController,
  registerUsersController,
  updateUserController,
} from '../controllers/auth.js';
import {
  loginUsersSchema,
  registerUsersSchema,
  updateUserSchema,
} from '../validation/auth.js';
import { upload } from '../middlewares/multer.js';
import { authenticate } from '../middlewares/authenticate.js';

const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(registerUsersSchema),
  ctrlWrapper(registerUsersController),
);

authRouter.post(
  '/login',
  validateBody(loginUsersSchema),
  ctrlWrapper(loginUsersController),
);

authRouter.get('/', authenticate, ctrlWrapper(getUserController));

authRouter.patch(
  '/',
  authenticate,
  upload.single('avatar'),
  validateBody(updateUserSchema),
  ctrlWrapper(updateUserController),
);

authRouter.post('/refresh', ctrlWrapper(refreshUsersSessionController));

authRouter.post('/logout', ctrlWrapper(logoutUserController));

export default authRouter;
