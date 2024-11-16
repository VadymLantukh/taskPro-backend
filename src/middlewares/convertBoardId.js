import mongoose from 'mongoose';
import createHttpError from 'http-errors';

export const convertBoardId = (req, res, next) => {
  const { boardId } = req.body;

  if (!boardId) {
    throw createHttpError(400, 'Missing boardId');
  }

  if (!mongoose.Types.ObjectId.isValid(boardId)) {
    throw createHttpError(400, 'Invalid boardId format');
  }

  req.body.boardId = new mongoose.Types.ObjectId(boardId);

  next();
};
