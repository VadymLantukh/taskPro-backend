import Joi from 'joi';

import { themeType } from '../constants/themeType.js';
import { emailRegexp } from '../constants/emailRegexp.js';

export const registerUsersSchema = Joi.object({
  name: Joi.string().min(2).max(32).required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(8).max(64).required(),
});

export const loginUsersSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(8).max(64).required(),
});

export const updateUserSchema = Joi.object({
  name: Joi.string().min(2).max(32).optional(),
  email: Joi.string().pattern(emailRegexp).optional(),
  password: Joi.string().min(8).max(64).optional(),
  avatar: Joi.string().optional(),
  theme: Joi.string()
    .valid(...themeType)
    .optional(),
});
