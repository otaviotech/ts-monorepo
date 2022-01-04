import { Express } from 'express';

import helmet from 'helmet';
import bodyParser from 'body-parser';

export const registerMiddlewares = (app: Express) => {
  app.use(bodyParser.json());
  app.use(helmet());
};
