import createHttpError from 'http-errors';

import {
  checkColumn,
  deleteTask,
  findOldColumnId,
  postTask,
  replaceTask,
  updateTask,
} from '../services/tasks.js';

export const postTaskController = async (req, res, next) => {
  const { _id: userId } = req.user;
  const { boardId, columnId } = req.body;

  const column = await checkColumn({ _id: columnId, boardId, userId });

  if (!column) {
    return next(
      createHttpError(
        404,
        `Column with id:${columnId} not found in board ${boardId} `,
      ),
    );
  }

  req.body.userId = userId;

  const newTask = await postTask(req.body);

  res.status(201).json({
    status: 201,
    message: 'Task created successfully',
    data: newTask,
  });
};

export const updateTaskController = async (req, res, next) => {
  const { id: _id } = req.params;
  const { _id: userId } = req.user;

  const oldColumnId = await findOldColumnId(_id);

  if (req.body.columnId) {
    const newColumn = await checkColumn({
      _id: req.body.columnId,
    });

    if (!newColumn) {
      next(
        createHttpError(404, `Column with id:${req.body.columnId} not found`),
      );
      return;
    }
  }
  if (
    req.body.columnId &&
    oldColumnId.toString() !== req.body.columnId.toString()
  ) {
    await replaceTask(
      { _id: oldColumnId, userId },
      { _id: req.body.columnId, userId },
      _id,
    );
  }

  const updatedTask = await updateTask({ _id, userId }, req.body);

  if (!updatedTask) {
    throw createHttpError(404, `Task with id:${_id} not found`);
  }

  res.status(200).json({
    status: 200,
    message: 'Task updated successfully',
    data: updatedTask,
  });
};

export const deleteTaskController = async (req, res, next) => {
  const { id } = req.params;
  const { _id: userId } = req.user;

  const data = await deleteTask({ _id: id, userId });

  if (!data) {
    return next(createHttpError(404, `Task with id:${id} not found`));
  }

  res.status(204).send();
};
