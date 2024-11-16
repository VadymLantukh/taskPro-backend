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

const tasksRouter = Router();

tasksRouter.use(authenticate);

tasksRouter.post(
  '/',
  validateBody(createTaskSchema),
  convertBoardId,
  convertColumnId,
  postTaskController,
);

tasksRouter.patch(
  '/:id',
  validateBody(updateTaskSchema),
  convertBoardId,
  convertColumnId,
  updateTaskController,
);

tasksRouter.delete(
  '/:id',
  convertBoardId,
  convertColumnId,
  deleteTaskController,
);

export default tasksRouter;
