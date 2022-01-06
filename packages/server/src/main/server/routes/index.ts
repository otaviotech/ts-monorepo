import { Express, Router } from 'express';

import Spec from './apispec';
import SignUp from './signup';

const routers = [Spec, SignUp];

export const registerRoutes = (app: Express) => {
  const api = Router();

  routers.forEach((router) => {
    api.use(router.prefix, router.router);
  });

  app.use('/api', api);
};
