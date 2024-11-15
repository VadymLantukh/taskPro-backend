import { Router } from 'express';

import * as boardsController from '../controllers/board.js';

import { isValidId } from '../middlewares/isValidId.js';
import { validateBody } from '../middlewares/validateBody.js';
import { authenticate } from '../middlewares/authenticate.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { createBoardSchema, updateBoardSchema } from '../validation/boards.js';

const boardsRouter = Router();

boardsRouter.use(authenticate);

boardsRouter.get('/', ctrlWrapper(boardsController.getBoardsController));

boardsRouter.get(
  '/:id',
  isValidId,
  ctrlWrapper(boardsController.getBoardController),
);

boardsRouter.post(
  '/',
  validateBody(createBoardSchema),
  ctrlWrapper(boardsController.addBoardController),
);

boardsRouter.patch(
  '/:id',
  isValidId,
  validateBody(updateBoardSchema),
  ctrlWrapper(boardsController.updateBoardController),
);

boardsRouter.delete(
  '/:id',
  isValidId,
  ctrlWrapper(boardsController.deleteBoardController),
);

export default boardsRouter;
