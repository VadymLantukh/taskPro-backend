import { Router } from 'express';

import { validateBody } from '../middlewares/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  loginUsersController,
  logoutUserController,
  registerUsersController,
  updateUserController,
} from '../controllers/auth.js';
import { loginUsersSchema, registerUsersSchema, updateUserSchema } from '../validation/auth.js';
import { isValidId } from '../middlewares/isValidId.js';
import { upload } from '../middlewares/multer.js';

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

authRouter.patch(
  '/:id',
  isValidId,
  upload.single('avatar'),
  validateBody(updateUserSchema),
  ctrlWrapper(updateUserController),
);

authRouter.post('/logout', ctrlWrapper(logoutUserController));

export default authRouter;
