import Joi from 'joi';

import { boardIcons, boardImages } from '../constants/boards.js';

export const createBoardSchema = Joi.object({
  title: Joi.string().min(3).max(30).required(),
  backgroundImage: Joi.string()
    .valid(...boardImages)
    .allow(null),
  icon: Joi.string().valid(...boardIcons),
});

export const updateBoardSchema = Joi.object({
  title: Joi.string().min(3).max(30),
  backgroundImage: Joi.string()
    .valid(...boardImages)
    .allow(null),
  icon: Joi.string().valid(...boardIcons),
});
