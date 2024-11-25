import { Router } from 'express';

import * as columnsController from '../controllers/columns.js';
import { isValidId } from '../middlewares/isValidId.js';
import { validateBody } from '../middlewares/validateBody.js';
import { authenticate } from '../middlewares/authenticate.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  createColumnSchema,
  updateColumnSchema,
} from '../validation/columns.js';
import { convertBoardId } from '../middlewares/convertBoardId.js';

const columnsRouter = Router();

columnsRouter.use(authenticate);

columnsRouter.post(
  '/',
  validateBody(createColumnSchema),
  convertBoardId,
  ctrlWrapper(columnsController.addColumnController),
);

columnsRouter.patch(
  '/:id',
  isValidId,
  validateBody(updateColumnSchema),
  ctrlWrapper(columnsController.updateColumnController),
);
columnsRouter.delete(
  '/:id',
  isValidId,
  ctrlWrapper(columnsController.deleteColumnController),
);

export default columnsRouter;
