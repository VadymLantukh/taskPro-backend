import { Router } from 'express';

import { authenticate } from '../middlewares/authenticate.js';
import { convertColumnId } from '../middlewares/convertColumnId.js';
import { convertBoardId } from '../middlewares/convertBoardId.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createTaskSchema, updateTaskSchema } from '../validation/tasks.js';
import {
  postTaskController,
  updateTaskController,
  deleteTaskController,
} from '../controllers/tasks.js';
import { isValidId } from '../middlewares/isValidId.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidColumnId } from '../middlewares/isValidColumnId.js';

const tasksRouter = Router();

tasksRouter.use(authenticate);

tasksRouter.post(
  '/',
  isValidColumnId,
  validateBody(createTaskSchema),
  convertBoardId,
  convertColumnId,
  ctrlWrapper(postTaskController),
);

tasksRouter.patch(
  '/:id',
  isValidId,
  validateBody(updateTaskSchema),
  isValidColumnId,
  ctrlWrapper(updateTaskController),
);

tasksRouter.delete('/:id', isValidId, ctrlWrapper(deleteTaskController));

export default tasksRouter;
