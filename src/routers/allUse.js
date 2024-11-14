import { Router } from 'express';
import authRouter from './auth.js';

const mainRouter = Router();

mainRouter.use('/auth', authRouter);
mainRouter.use('/boards', authRouter);
mainRouter.use('/colums', authRouter);
mainRouter.use('/tasks', authRouter);

export default mainRouter;
