import fs from 'node:fs';
import swaggerUI from 'swagger-ui-express';
import createHttpError from 'http-errors';

import { SWAGGER_PATH } from '../constants/swaggerPath.js';

export const swaggerDocs = () => {
  try {
    const swaggerDoc = JSON.parse(fs.readFileSync(SWAGGER_PATH));
    return [...swaggerUI.serve, swaggerUI.setup(swaggerDoc)];
  } catch (error) {
    return (req, res, next) => {
      next(createHttpError(500, error.message));
    };
  }
};
