import createHttpError from 'http-errors';
import {
  checkColumn,
  deleteTask,
  deleteTaskFromColumn,
  filterTasksByPriority,
  findOldColumnId,
  postTask,
  replaceTask,
  updateTask,
} from '../services/tasks.js';
import { Types } from 'mongoose';

export const postTaskController = async (req, res, next) => {
  const { _id: userId } = req.user;
  const { boardId, columnId } = req.body;

  const column = await checkColumn({ _id: columnId, boardId, userId });
  console.log(column);

  if (!column) {
    return next(createHttpError(404, `Column with id:${columnId} not found`));
  }

  req.body.userId = userId;

  const newTask = await postTask(req.body);

  const { _id, title, description, priority, deadline, createdAt, updatedAt } =
    newTask;

  res.status(201).json({
    status: 201,
    message: 'Task created successfully',
    data: { _id, title, description, priority, deadline, createdAt, updatedAt },
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
      return next(
        createHttpError(404, `Column with id:${req.body.columnId} not found`),
      );
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

export const deleteTaskController = async (req, res) => {
  const { id } = req.params;
  const { columnId } = req.body;
  const { _id: userId } = req.user;

  const objectTaskId = new Types.ObjectId(id);

  await deleteTaskFromColumn({ _id: columnId, userId }, objectTaskId);

  const data = await deleteTask({ _id: id, userId, columnId });

  if (!data) {
    throw new createHttpError(404, `Task with id:${id} not found`);
  }

  res.status(204).send();
};

export const filterTasksController = async (req, res, next) => {
  const { priority } = req.query;
  const { _id: userId } = req.user;

  if (!priority) {
    return next(createHttpError(400, 'Missing priority query parameter'));
  }

  const validPriorities = ['Without', 'Low', 'Medium', 'High'];
  if (!validPriorities.includes(priority)) {
    return next(
      createHttpError(
        400,
        `Invalid priority value. Must be one of: ${validPriorities.join(', ')}`,
      ),
    );
  }

  const tasks = await filterTasksByPriority(priority, userId);

  if (!tasks || tasks.length === 0) {
    return next(
      createHttpError(404, 'No tasks found with the specified priority'),
    );
  }

  res.status(200).json({
    status: 200,
    message: 'Tasks filtered successfully',
    data: tasks,
  });
};
