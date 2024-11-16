import createHttpError from 'http-errors';
import {
  checkColumn,
  deleteTask,
  postTask,
  updateTask,
} from '../services/tasks.js';

export const postTaskController = async (req, res) => {
  const { _id: userId } = req.user;
  const { body } = req;
  const { boardId, columnId } = body;

  // Check if the column exists
  //   const column = await checkColumn({ _id: columnId, boardId, userId });

  //   if (!column) {
  //     throw createHttpError(404, `Column with id:${columnId} not found`);
  //   }

  body.userId = userId;
  body.boardId = boardId;
  body.columnId = columnId;

  const data = await postTask(body);

  const { _id, title, description, priority, deadline, createdAt, updatedAt } =
    data;

  res.status(201).json({
    status: 201,
    message: 'Task created successfully',
    data: { _id, title, description, priority, deadline, createdAt, updatedAt },
  });
};

export const updateTaskController = async (req, res) => {
  const { id } = req.params;
  const { _id: userId } = req.user;
  const { boardId, columnId } = req.body;

  const { data } = await updateTask(
    { _id: id },
    { ...req.body, userId, boardId, columnId },
  );

  if (!data) {
    throw createHttpError(404, 'Task not found');
  }

  const column = await checkColumn({ _id: columnId, boardId, userId });
  if (!column) {
    throw createHttpError(404, `Column with id:${columnId} not found`);
  }

  res.json({
    status: 200,
    message: 'Task was updated successfully!',
    data,
  });
};

export const deleteTaskController = async (req, res) => {
  const { id } = req.params;
  const { columnId, boardId } = req.body;
  const { _id: userId } = req.user;

  const data = await deleteTask({ _id: id, userId, columnId, boardId });

  if (!data) {
    throw createHttpError(404, 'Task not found');
  }

  res.status(204).send();
};
