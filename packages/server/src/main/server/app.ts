import express from 'express';
import { registerMiddlewares } from './middlewares';
import { registerRoutes } from './routes';

const app = express();

registerRoutes(app);
registerMiddlewares(app);

export default app;
