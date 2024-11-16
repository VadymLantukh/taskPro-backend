import Joi from 'joi';

export const createColumnSchema = Joi.object({
  title: Joi.string().required().messages({
    'string.empty': '"title" cannot be an empty field',
    'any.required': 'missing required field "title"',
  }),
  userId: Joi.string().required().messages({
    'string.base': '"userId" must be a string',
    'any.required': 'missing required field "columnId"',
  }),
  boardId: Joi.string().required().messages({
    'string.base': '"boardId" must be a string',
    'any.required': 'missing required field "columnId"',
  }),
});

export const updateColumnSchema = Joi.object({
  title: Joi.string().required(),
});
