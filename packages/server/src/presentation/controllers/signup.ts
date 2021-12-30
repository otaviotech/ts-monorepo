import { HttpRequest, HttpResponse } from '../protocols/http';
import { Controller } from '../protocols/controller';
import { InputValidator } from '../protocols/inputValidator';
import { badRequest } from '../helpers/badRequest';
import { SignUp, SignUpUseCaseInput } from '../../domain/usecases/signup';

export interface SignUpInput {
  email?: string;
  username?: string;
  password?: string;
}

export class SignUpController implements Controller {
  constructor(
    private readonly signUpInputValidator: InputValidator<SignUpInput>,
    private readonly signUp: SignUp
  ) {}

  async handle(req: HttpRequest): Promise<HttpResponse> {
    const validationResult = await this.signUpInputValidator.validate(req.body);

    if (!validationResult.isValid) {
      return badRequest(validationResult.errors?.[0]);
    }

    await this.signUp.signup(req.body as SignUpUseCaseInput);

    return { statusCode: 201 };
  }
}
