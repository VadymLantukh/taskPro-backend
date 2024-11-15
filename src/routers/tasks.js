import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { isValidId } from '../middlewares/isValidId.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { createTaskSchema, updateTaskSchema } from '../validation/tasks.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  deleteTaskController,
  postTaskController,
  updateTaskController,
} from '../controllers/tasks.js';

const tasksRouter = Router();

tasksRouter.use(authenticate);

tasksRouter.post(
  '/',
  validateBody(createTaskSchema),
  ctrlWrapper(postTaskController),
);

tasksRouter.patch(
  '/:id',
  validateBody(updateTaskSchema),
  isValidId,
  ctrlWrapper(updateTaskController),
);

tasksRouter.delete('/:id', isValidId, ctrlWrapper(deleteTaskController));

export default tasksRouter;
