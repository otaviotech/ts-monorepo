import { Request, Response } from 'express';
import { Controller, HttpRequest } from '@presentation/protocols';

export const adapt =
  (controller: Controller) => async (req: Request, res: Response) => {
    const adaptedRequest: HttpRequest = {
      body: req.body,
    };

    const httpResponse = await controller.handle(adaptedRequest);

    const resBody = {
      data: httpResponse.data,
      error: httpResponse.error,
    };

    return res.status(httpResponse.statusCode).json(resBody);
  };
