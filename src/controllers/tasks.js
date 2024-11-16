import createHttpError from 'http-errors';
import {
  checkColumn,
  deleteTask,
  findOldColumnId,
  postTask,
  replaceTask,
  updateTask,
} from '../services/tasks.js';

export const postTaskController = async (req, res) => {
  const { _id: userId } = req.user;
  const { boardId, columnId } = req.body;

  const column = await checkColumn({ _id: columnId, boardId, userId });

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
  const { columnId } = req.body;

  const oldColumnId = await findOldColumnId(_id);

  // const { boardId, columnId } = req.body

  const column = await checkColumn({
    _id: columnId,
  });

  if (!column) {
    throw createHttpError(404, `Column with id:${columnId} not found`);
  }

  // if (newColumnId) {
  //   const column = await checkColumn({
  //     _id: newColumnId,
  //     boardId,
  //     userId,
  //   });
  //   if (!column) {
  //     throw createHttpError(404, `Column with id:${newColumnId} not found`);
  //   }
  // }

  const data = await updateTask({ _id, userId }, req.body);

  if (!data) {
    throw createHttpError(404, `Task with id:${taskId} not found`);
  }

  if (columnId) {
    await replaceTask(
      { _id: oldColumnId, userId },
      { _id: columnId, userId },
      _id,
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
