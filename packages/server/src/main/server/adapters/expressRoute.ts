import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import R from 'ramda';
import { Controller, HttpRequest } from '@presentation/protocols';
import { appLogger } from '../middlewares/logger';

const adaptRequestForLogging = (expressReq: Request) => ({
  ...R.pick(
    [
      'headers',
      'method',
      'url',
      'httpVersion',
      'body',
      'cookies',
      'path',
      'protocol',
      'query',
      'hostname',
      'ip',
      'params',
    ],
    expressReq
  ),
});

const adaptLogTags = (expressReq: Request) => ({
  userAgent: expressReq.headers['user-agent'],
});

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
      appLogger.error(err, {
        request: adaptRequestForLogging(expressReq),
        tags: adaptLogTags(expressReq),
      });
      return expressRes.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
  };
