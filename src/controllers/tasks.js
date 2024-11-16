import createHttpError from 'http-errors';
import {
  checkColumn,
  deleteTask,
  postTask,
  replaceTask,
  updateTask,
} from '../services/tasks.js';
import { Types } from 'mongoose';

export const postTaskController = async (req, res) => {
  const { _id: userId } = req.user;
  const { boardId, columnId } = req.body;

  const column = await checkColumn({ _id: columnId, boardId, userId });

  if (!column) {
    throw createHttpError(404, `Column with id:${columnId} not found`);
  }
  if (!column) {
    throw createHttpError(404, `Column with id:${columnId} not found`);
  }

  req.body.userId = userId;
  // req.body.boardId = boardId;
  // req.body.columnId = columnId;

  const data = await postTask(req.body);

  const { _id, title, description, priority, deadline, createdAt, updatedAt } =
    data;

  res.status(201).json({
    status: 201,
    message: 'Task created successfully',
    data: { _id, title, description, priority, deadline, createdAt, updatedAt },
  });
};

export const updateTaskController = async (req, res) => {
  const { id: _id } = req.params;
  const { _id: userId } = req.user;

  const { boardId, columnId, newColumnId } = req.body;
  // const { columnId: newColumnId } = req.body;

  const column = await checkColumn({
    _id: columnId,
    boardId,
    userId,
  });

  if (!column) {
    throw createHttpError(404, `Column with id:${columnId} not found`);
  }

  if (newColumnId) {
    const column = await checkColumn({
      _id: newColumnId,
      boardId,
      userId,
    });
    if (!column) {
      throw createHttpError(404, `Column with id:${newColumnId} not found`);
    }
  }

  const data = await updateTask(
    { _id: taskId, columnId, boardId, userId },
    req.body,
  );

  if (!data) {
    throw createHttpError(404, `Task with id:${taskId} not found`);
  }

  if (newColumnId) {
    const taskObjectId = new Types.ObjectId(taskId);

    await replaceTask(
      { _id: columnId, boardId, userId },
      { _id: newColumnId, boardId, userId },
      taskObjectId,
    );
  }

  const {
    taskId,
    title,
    description,
    priority,
    deadline,
    createdAt,
    updatedAt,
  } = data;

  res.status(200).json({
    status: 200,
    message: 'Task updated successfully',
    data: { _id, title, description, priority, deadline, createdAt, updatedAt },
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
