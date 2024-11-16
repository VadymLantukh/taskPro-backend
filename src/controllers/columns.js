import createHttpError from 'http-errors';
import * as columnsServices from '../services/columns.js';
import ColumnCollection from '../db/Columns.js';

// export const getAllColumnsController = async (req, res, next) => {
//   const boardId = req.params.boardId;
//   const columns = await columnsServices.getColumns(boardId);

//   if (!columns || columns.length === 0) {
//     return next(createHttpError(404, 'No columns found.'));
//   }

//   res.json({
//     status: 200,
//     message: 'Successfully fetched columns.',
//     data: columns,
//   });
// };

// export const getColumnController = async (req, res, next) => {
//   const columnId = req.params.id;
//   const column = await columnsServices.getColumnById(columnId);

//   if (!column) {
//     return next(createHttpError(404, 'Column not found.'));
//   }

//   res.json({
//     status: 200,
//     message: 'Successfully fetched column.',
//     data: column,
//   });
// };

export const addColumnController = async (req, res, next) => {
  const { _id: userId } = req.user;
  const { boardId } = req.body;

  if (!boardId) {
    return next(createHttpError(400, 'Missing boardId.'));
  }

  const newColumn = await columnsServices.addColumn({ ...req.body, userId });

  res.status(201).json({
    status: 201,
    message: 'Column successfully created.',
    data: newColumn,
  });
};

export const updateColumnController = async (req, res, next) => {
  const { id: _id } = req.params;
  const { _id: userId } = req.user;

  const column = await ColumnCollection.findById(_id);
  if (!column) {
    return next(createHttpError(404, 'Column not found.'));
  }

  if (column.userId.toString() !== userId.toString()) {
    return next(
      createHttpError(403, 'User does not have access to this column.'),
    );
  }

  const updatedColumn = await columnsServices.updateColumn(
    { _id, userId },
    req.body,
  );

  if (!updatedColumn) {
    return next(createHttpError(404, 'Column not found.'));
  }

  res.json({
    status: 200,
    message: 'Column successfully updated.',
    data: updatedColumn,
  });
};

export const deleteColumnController = async (req, res, next) => {
  const { id: _id } = req.params;
  const { _id: userId } = req.user;

  const column = await ColumnCollection.findById(_id);
  if (!column) {
    return next(createHttpError(404, 'Column not found.'));
  }

  if (column.userId.toString() !== userId.toString()) {
    return next(
      createHttpError(403, 'User does not have access to this column.'),
    );
  }

  const deletedColumn = await columnsServices.deleteColumn({ _id, userId });

  if (!deletedColumn) {
    return next(createHttpError(404, 'Column not found.'));
  }

  res.status(204).send();
};
