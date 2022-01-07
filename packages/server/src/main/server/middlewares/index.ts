import 'express-async-errors';

import { Express } from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';

import { httpRequestLogger } from './logger';
import { errorMiddleware } from './error';

export const registerMiddlewares = (app: Express) => {
  app.use(httpRequestLogger);
  app.use(bodyParser.json());
  app.use(helmet());
  app.use(errorMiddleware);
};
