import Joi from 'joi';
import { themeType } from '../constants/themeType.js';

export const registerUsersSchema = Joi.object({
  name: Joi.string().min(2).max(32).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(64).required(),
});

export const loginUsersSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(64).required(),
});

export const updateUserSchema = Joi.object({
  name: Joi.string().min(2).max(32),
  email: Joi.string().email(),
  password: Joi.string().min(8).max(64),
  avatar: Joi.string(),
  theme: Joi.string().valid(...themeType),
});
