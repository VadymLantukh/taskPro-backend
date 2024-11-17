import BoardCollection from '../db/Boards.js';
import ColumnCollection from '../db/Columns.js';
import TasksCollection from '../db/Tasks.js';
import { UsersCollection } from '../db/User.js';

export const getBoards = async (userId) => {
  const filter = { userId };

  const boards = await BoardCollection.find(filter);

  return boards;
};

export const getBoard = async (filter) => {
  const board = await BoardCollection.findOne(filter).populate({
    path: 'columns',
    select: '-userId -boardId',
    populate: {
      path: 'tasks',
      model: 'task',
      select: '-userId -boardId -columnId',
    },
  });

  return board;
};

export const addBoard = async (payload) => {
  const newBoard = await BoardCollection.create(payload);

  await UsersCollection.findByIdAndUpdate(payload.userId, {
    $push: { boards: newBoard._id },
  });

  return newBoard;
};

export const updateBoard = async (filter, payload, options = {}) => {
  const result = await BoardCollection.findOneAndUpdate(filter, payload, {
    new: true,
    includeResultMetadata: true,
    ...options,
  });

  if (!result || !result.value) return null;

  return {
    data: result.value,
  };
};

export const deleteBoard = async (filter) => {
  const deletedBoard = await BoardCollection.findOneAndDelete(filter);
  if (deletedBoard) {
    await ColumnCollection.deleteMany({ boardId: filter._id });
    await TasksCollection.deleteMany({ boardId: filter._id });
  }

  return deletedBoard;
};
