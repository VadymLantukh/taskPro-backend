import ColumnCollection from '../db/Colums.js'; // Corrected the import
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

export const updateTask = async (filter, payload, options = {}) => {
  const result = await TasksCollection.findOneAndUpdate(filter, payload, {
    new: true,
    ...options,
  });

  return {
    data: result,
    isNew: Boolean(result && result.upserted),
  };
};

export const deleteTask = (filter) => TasksCollection.findByIdAndDelete(filter);

export const replaceTask = async (oldColumn, newColumn, taskId) => {
  await ColumnCollection.findOneAndUpdate(oldColumn, {
    $pull: { tasks: taskId },
  });

  await ColumnCollection.findOneAndUpdate(newColumn, {
    $push: { tasks: taskId },
  });
};

export const deleteTaskFromColumn = async (filter, taskId) => {
  return await ColumnCollection.findOneAndUpdate(filter, {
    $pull: { tasks: taskId },
  });
};
