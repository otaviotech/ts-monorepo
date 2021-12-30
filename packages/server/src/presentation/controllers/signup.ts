import { RequestValidationError } from '../errors/validation';
import { HttpRequest, HttpResponse } from '../protocols/http';

export class SignUpController {
  async handle(req: HttpRequest): Promise<HttpResponse> {
    const requiredFields = ['email', 'username', 'password'];

    // eslint-disable-next-line no-restricted-syntax
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return {
          statusCode: 400,
          error: new RequestValidationError(`Field ${field} is required.`),
        };
      }
    }

    return {
      statusCode: 201,
    };
  }
}
