import { NextFunction, Request, Response } from 'express';
import { appLogger } from './logger';

export const errorMiddleware = (
  error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  appLogger.error(error);
  res.sendStatus(500);
  next();
};
