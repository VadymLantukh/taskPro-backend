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
