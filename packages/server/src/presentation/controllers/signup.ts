import { HttpRequest, HttpResponse } from '../protocols/http';
import { Controller } from '../protocols/controller';
import { InputValidator } from '../protocols/inputValidator';

export interface SignUpInput {
  email?: string;
  username?: string;
  password?: string;
}

export class SignUpController implements Controller {
  constructor(
    private readonly signUpInputValidator: InputValidator<SignUpInput>
  ) {}

  async handle(req: HttpRequest): Promise<HttpResponse> {
    const validationResult = await this.signUpInputValidator.validate(req.body);

    if (!validationResult.isValid) {
      return {
        statusCode: 400,
        error: validationResult.errors[0],
      };
    }

    return { statusCode: 400 };
  }
}
