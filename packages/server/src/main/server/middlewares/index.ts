import { Express } from 'express';

import helmet from 'helmet';

export const registerMiddlewares = (app: Express) => {
  app.use(helmet());
};
