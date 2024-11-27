import BoardCollection from '../db/Boards.js';
import ColumnCollection from '../db/Columns.js';
import TaskCollection from '../db/Tasks.js';

export const addColumn = async (payload) => {
  const { boardId, userId } = payload;

  const board = await BoardCollection.findOne({ _id: boardId, userId });
  if (!board) {
    throw new Error('User does not have access to this board.');
  }

  const highestOrderColumn = await ColumnCollection.findOne({ boardId })
    .sort('-order')
    .exec();

  const newOrder = highestOrderColumn ? highestOrderColumn.order + 1 : 1;

  const newColumn = new ColumnCollection({
    ...payload,
    tasks: [],
    order: newOrder,
  });

  await newColumn.save();

  await BoardCollection.findByIdAndUpdate(boardId, {
    $push: { columns: newColumn._id },
  });

  return newColumn;
};

export const updateColumn = async (filter, payload) => {
  return await ColumnCollection.findOneAndUpdate(filter, payload, {
    new: true,
  });
};

export const deleteColumn = async (filter) => {
  const deletedColumn = await ColumnCollection.findOneAndDelete(filter);

  if (deletedColumn) {
    await TaskCollection.deleteMany({ columnId: filter._id });
    await BoardCollection.findOneAndUpdate(deletedColumn.boardId, {
      $pull: { columns: filter._id },
    });
  }

  return deletedColumn;
};
