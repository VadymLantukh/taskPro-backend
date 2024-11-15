import { Router } from 'express';

import authRouter from './auth.js';
import boardsRouter from './boards.js';
import columnsRouter from './columns.js';
import tasksRouter from './tasks.js';

const mainRouter = Router();

mainRouter.use('/auth', authRouter);
mainRouter.use('/boards', boardsRouter);
mainRouter.use('/columns', columnsRouter);
mainRouter.use('/tasks', tasksRouter);

export default mainRouter;
