import { HttpRequest, HttpResponse } from './http';

export interface Controller {
  handle(req: HttpRequest): Promise<HttpResponse>;
}
