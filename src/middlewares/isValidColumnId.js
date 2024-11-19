import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';

export const isValidColumnId = (req, res, next) => {
  const { columnId } = req.body;

  if (columnId && !isValidObjectId(columnId)) {
    return next(createHttpError(400, `${columnId} is not a valid columnId`));
  }

  next();
};
