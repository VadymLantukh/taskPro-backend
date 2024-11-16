import BoardCollection from '../db/Boards.js';
import ColumnCollection from '../db/Columns.js';
import TaskCollection from '../db/Tasks.js';

// export const getColumns = async ({ boardId, userId }) => {
//   return await ColumnCollection.find({ boardId, userId })
//     .populate('tasks')
//     .sort('order');
// };

// export const getColumnById = async ({ columnId, userId }) => {
//   return await ColumnCollection.findById({ _id: columnId, userId }).populate(
//     'tasks',
//   );
// };

export const addColumn = async (payload) => {
  const { boardId, userId } = payload;

  const board = await BoardCollection.findOne({ _id: boardId, userId });
  if (!board) {
    throw new Error('User does not have access to this board.');
  }

  const newColumn = new ColumnCollection({ ...payload, tasks: [] });
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

export const deleteColumn = async ({ _id, userId }) => {
  const deletedColumn = await ColumnCollection.findOneAndDelete({
    _id,
    userId,
  });

  if (deletedColumn) {
    await TaskCollection.deleteMany({ columnId: _id });
  }

  return deletedColumn;
};
