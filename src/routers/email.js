import { Router } from 'express';

import { sendEmailController } from '../controllers/email.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { authenticate } from '../middlewares/authenticate.js';
import { validateBody } from '../middlewares/validateBody.js';
import { helpEmailSchema } from '../validation/email.js';

const emailRouter = Router();

emailRouter.use(authenticate);

emailRouter.post(
  '/send-email',
  validateBody(helpEmailSchema),
  ctrlWrapper(sendEmailController),
);

export default emailRouter;
