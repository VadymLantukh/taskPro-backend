import { Router } from 'express';

import * as boardsController from '../controllers/board.js';

import { isValidId } from '../middlewares/isValidId.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const boardsRouter = Router();

boardsRouter.get(
  '/:boardId',
  isValidId,
  ctrlWrapper(boardsController.getBoardController),
);

export default boardsRouter;
