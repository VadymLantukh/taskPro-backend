import Joi from 'joi';

export const createColumnSchema = Joi.object({
  boardId: Joi.string().required().messages({
    'string.empty': 'Board ID is required',
  }),
  title: Joi.string().required().messages({
    'string.empty': 'Title is required',
  }),
});

export const updateColumnSchema = Joi.object({
  title: Joi.string().optional().messages({
    'string.empty': 'Title is required',
  }),
  tasks: Joi.array().items(Joi.string()).optional(),
});
