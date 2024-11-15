import createHttpError from 'http-errors';
import * as boardsServices from '../services/boards.js';

export const getBoardController = async (req, res, next) => {
  const { boardId: _id } = req.params;
  const { _id: userId } = req.user;

  const data = await boardsServices.getBoard({ _id, userId });

  if (!data) {
    next(createHttpError(404, `Board with id ${_id} not found!`));
    return;
  }

  res.json({
    status: 200,
    message: `Successfully found board with id ${_id}!`,
    data,
  });
};
