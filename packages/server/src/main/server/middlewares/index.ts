import { Express } from 'express';

import helmet from 'helmet';
import bodyParser from 'body-parser';
import { httpRequestLogger } from './logger';

export const registerMiddlewares = (app: Express) => {
  app.use(httpRequestLogger);
  app.use(bodyParser.json());
  app.use(helmet());
};
