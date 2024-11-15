import createHttpError from 'http-errors';
import { deleteTask, postTask, updateTask } from '../services/tasks.js';
// import { parseFilterParams } from '../utils/parseFilterParams.js';

export const postTaskController = async (req, res) => {
  console.log(req);

  const { _id: columnId } = req.params;
  const data = await postTask({ ...req.body, columnId });

  res.status(201).json({
    status: 201,
    message: 'Task created Successfully!',
    data,
  });
};
export const updateTaskController = async (req, res) => {
  const { id } = req.params;
  const { _id: columnId } = req.column;
  const { data } = await updateTask(
    { _id: id, columnId },
    { ...req.body, columnId },
  );

  if (!data) {
    throw createHttpError(404, 'Task not found');
  }

  res.json({
    status: 200,
    message: 'Task was updated Successfully!',
    data,
  });
};
export const deleteTaskController = async (req, res) => {
  const { id } = req.params;
  const { _id: columnId } = req.column;
  const data = await deleteTask({ _id: id, columnId });

  if (!data) {
    throw createHttpError(404, 'Task not found');
  }

  res.status(204).send();
};
