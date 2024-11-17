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
  filterTasksController,
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

tasksRouter.patch('/:id', validateBody(updateTaskSchema), updateTaskController);

tasksRouter.delete('/:id', deleteTaskController);

tasksRouter.get('/filter', filterTasksController);

export default tasksRouter;
