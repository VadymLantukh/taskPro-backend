import { Router } from 'express';

import * as boardsController from '../controllers/board.js';

import { isValidId } from '../middlewares/isValidId.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { updateBoardSchema } from '../validation/boards.js';

const boardsRouter = Router();

boardsRouter.get(
  '/:boardId',
  isValidId,
  ctrlWrapper(boardsController.getBoardController),
);

boardsRouter.post(
  '/',
  validateBody(updateBoardSchema),
  ctrlWrapper(boardsController.addBoardController),
);

export default boardsRouter;
