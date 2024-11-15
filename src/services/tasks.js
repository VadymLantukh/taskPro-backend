import TasksCollection from '../db/Tasks.js';

export const postTask = (payload) => TasksCollection.create(payload);

export const updateTask = async (filter, payload, options = {}) => {
  const result = await TasksCollection.findOneAndUpdate(filter, payload, {
    new: true,
    includeResultMetadata: true,
    ...options,
  });

  return {
    data: result.value,
    isNew: Boolean(result.lastErrorObject.upserted),
  };
};

export const deleteTask = (filter) => TasksCollection.findByIdAndDelete(filter);
