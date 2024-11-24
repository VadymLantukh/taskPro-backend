import Joi from 'joi';

import { getDate } from '../utils/getDate.js';
import { priorityList } from '../constants/tasks.js';

const date = getDate();

export const createTaskSchema = Joi.object({
  title: Joi.string().required().messages({
    'string.empty': '"title" cannot be an empty field',
    'any.required': 'Missing required field "title"',
  }),
  description: Joi.string().required().messages({
    'string.base': '"description" must be a string',
  }),
  priority: Joi.string()
    .valid(...priorityList)
    .messages({
      'string.empty': '"priority" cannot be an empty field',
      'any.required': 'Missing required field "priority"',
      'any.only':
        '"priority" must be one of the following values: Without, Low, Medium, High',
    }),
  deadline: Joi.date().min(date).messages({
    'date.min': '"deadline" cannot be less than the current date',
    'any.required': 'Missing required field "deadline"',
  }),
  columnId: Joi.string().required().messages({
    'string.base': '"columnId" must be a string',
    'any.required': 'Missing required field "columnId"',
  }),
  boardId: Joi.string().required().messages({
    'string.base': '"boardId" must be a string',
    'any.required': 'Missing required field "boardId"',
  }),
});

export const updateTaskSchema = Joi.object({
  title: Joi.string().messages({
    'string.base': '"title" must be a string',
  }),
  description: Joi.string().messages({
    'string.base': '"description" must be a string',
  }),
  priority: Joi.string().valid('Without', 'Low', 'Medium', 'High').messages({
    'string.base': '"priority" must be a string',
    'any.only':
      '"priority" must be one of the following values: Without, Low, Medium, High',
  }),
  deadline: Joi.date().min(date).messages({
    'date.min': '"deadline" cannot be less than the current date',
  }),
  columnId: Joi.string().messages({
    'string.base': '"columnId" must be a string',
  }),
});
