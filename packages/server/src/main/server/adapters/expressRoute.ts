import { Controller, HttpRequest } from '@presentation/protocols';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { appLogger } from '../middlewares/logger';

export const adapt =
  (controller: Controller) =>
  async (expressReq: Request, expressRes: Response) => {
    const req: HttpRequest = {
      body: expressReq.body,
    };

    try {
      const res = await controller.handle(req);

      const { statusCode, ...resBody } = res;

      return expressRes.status(statusCode).json(resBody);
    } catch (err) {
      // LOG!
      appLogger.error(err);
      return expressRes.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
  };
