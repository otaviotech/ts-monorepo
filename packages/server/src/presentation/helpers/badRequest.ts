import { StatusCodes } from 'http-status-codes';
import { HttpResponse } from '@presentation/protocols/http';

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: StatusCodes.BAD_REQUEST,
  error,
});
