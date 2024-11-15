import { Router } from 'express';

import * as boardsController from '../controllers/board.js';

import { isValidId } from '../middlewares/isValidId';
import { ctrlWrapper } from '../utils/ctrlWrapper';

const boardsRouter = Router();

boardsRouter.get(
  '/:boardId',
  isValidId,
  ctrlWrapper(boardsController.getBoardController),
);

export default boardsRouter;
