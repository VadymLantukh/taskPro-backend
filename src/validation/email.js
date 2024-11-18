import Joi from 'joi';

export const helpEmailSchema = Joi.object({
  email: Joi.string().email().required(),
  comment: Joi.string().min(8).max(500).required(),
});
