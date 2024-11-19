import { Router } from 'express';

import authRouter from './auth.js';
import boardsRouter from './boards.js';
import columnsRouter from './columns.js';
import tasksRouter from './tasks.js';
import emailRouter from './email.js';

const mainRouter = Router();

mainRouter.use('/auth', authRouter);
mainRouter.use('/boards', boardsRouter);
mainRouter.use('/columns', columnsRouter);
mainRouter.use('/tasks', tasksRouter);
mainRouter.use('/help', emailRouter);

export default mainRouter;
