import createHttpError from 'http-errors';
import * as boardsServices from '../services/boards.js';
import BoardCollection from '../db/Boards.js';

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

export const addBoardController = async (req, res) => {
  const { _id: userId } = req.user;

  const data = await boardsServices.addBoard({
    ...req.body,
    userId,
  });

  res.status(201).json({
    status: 201,
    message: 'Successfully created a board!',
    data,
  });
};

export const updateContactController = async (req, res, next) => {
  const { boardId } = req.params;
  const { _id: userId } = req.user;

  const result = await BoardCollection.updateContact(
    { _id: boardId, userId },
    {
      ...req.body,
    },
  );

  if (!result) {
    next(createHttpError(404, 'Board not found'));
    return;
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully patched a board!',
    data: result,
  });
};
