import createHttpError from 'http-errors';
import mongoose from 'mongoose';

export const convertColumnId = (req, res, next) => {
  const { columnId } = req.body;

  if (!columnId) {
    throw createHttpError(400, 'Missing columnId');
  }

  if (!mongoose.Types.ObjectId.isValid(columnId)) {
    throw createHttpError(400, 'Invalid columnId format');
  }

  req.body.columnId = new mongoose.Types.ObjectId(columnId);

  next();
};
