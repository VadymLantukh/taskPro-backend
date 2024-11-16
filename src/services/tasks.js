import ColumnCollection from '../db/Columns.js';
import TasksCollection from '../db/Tasks.js';

export const postTask = async (body) => {
  const newTask = await TasksCollection.create(body);

  const { boardId, columnId, userId, _id } = newTask;

  if (newTask) {
    await ColumnCollection.findOneAndUpdate(
      { _id: columnId, boardId, userId },
      { $push: { tasks: _id } },
    );
  }

  return newTask;
};

export const checkColumn = async (filter) => {
  return await ColumnCollection.findOne(filter);
};

export const updateTask = async (filter, payload) => {
  const result = await TasksCollection.findOneAndUpdate(filter, payload, {
    new: true,
  });

  return {
    data: result,
    isNew: Boolean(result && result.upserted),
  };
};

export const deleteTask = (filter) => TasksCollection.findByIdAndDelete(filter);
