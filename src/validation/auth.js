import Joi from 'joi';

export const registerUsersSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const loginUsersSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const updateUserSchema = Joi.object({
  name: Joi.string().min(3).max(20),
  email: Joi.string().email(),
  password: Joi.string(),
  avatar: Joi.string(),
});
