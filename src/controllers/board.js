import createHttpError from 'http-errors';

import * as boardsServices from '../services/boards.js';

export const getBoardsController = async (req, res) => {
  const { _id: userId } = req.user;

  const data = await boardsServices.getBoards(userId);

  res.json({
    status: 200,
    message: 'Successfully found boards!',
    data,
  });
};

export const getBoardController = async (req, res, next) => {
  const { id: _id } = req.params;
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
  console.log(userId);

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

export const updateBoardController = async (req, res, next) => {
  const { id } = req.params;
  const { _id: userId } = req.user;

  const result = await boardsServices.updateBoard(
    { _id: id, userId },
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

export const deleteBoardController = async (req, res, next) => {
  const { id } = req.params;
  const { _id: userId } = req.user;
  const data = await boardsServices.deleteBoard({ _id: id, userId });

  if (!data) {
    next(createHttpError(404, 'Board not found'));
    return;
  }

  res.status(204).send();
};
