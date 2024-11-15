import { Router } from 'express';
import authRouter from './auth.js';
import boardsRouter from './boards.js';

const mainRouter = Router();

mainRouter.use('/auth', authRouter);
mainRouter.use('/boards', boardsRouter);
mainRouter.use('/colums', authRouter);
mainRouter.use('/tasks', authRouter);

export default mainRouter;
