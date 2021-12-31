// Presentation
import { HttpRequest, HttpResponse } from '@presentation/protocols/http';
import { Controller } from '@presentation/protocols/controller';
import { InputValidator } from '@presentation/protocols/inputValidator';
import { badRequest } from '@presentation/helpers/badRequest';

// Domain
import { SignUp, SignUpUseCaseInput } from '@domain/usecases/signup';

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
