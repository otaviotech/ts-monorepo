import express from 'express';
import { buildIOC } from '@main/ioc';
import { registerMiddlewares } from './middlewares';
import { registerRoutes } from './routes';

const app = express();

buildIOC();
registerMiddlewares(app);
registerRoutes(app);

export default app;
