import BoardCollection from '../db/Boards.js';

export const getBoard = async (filter) => {
  const board = await BoardCollection.findOne(filter).populate({
    path: 'columns',
    populate: {
      path: 'tasks',
      model: 'Task',
    },
  });

  return board;
};

export const addBoard = (payload) => BoardCollection.create(payload);

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
