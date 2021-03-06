import { inject, injectable } from 'inversify';

// Main
import { Types } from '@main/ioc/types';

// Presentation
import { HttpRequest, HttpResponse } from '@presentation/protocols/http';
import { Controller } from '@presentation/protocols/controller';
import { InputValidator } from '@presentation/protocols/inputValidator';
import { badRequest } from '@presentation/helpers';

// Domain
import { SignUp, SignUpUseCaseInput } from '@domain/usecases/signup';
import { EmailAlreadyTakenError } from '@domain/errors/emailAlreadyTaken';
import { UsernameAlreadyTakenError } from '@domain/errors/usernameAlreadyTaken';

export interface SignUpInput {
  email?: string;
  username?: string;
  password?: string;
}

@injectable()
export class SignUpController implements Controller {
  constructor(
    @inject(Types.SignUpInputValidator)
    private readonly signUpInputValidator: InputValidator<SignUpInput>,
    @inject(Types.SignUpUseCase) private readonly signUp: SignUp
  ) {}

  async handle(req: HttpRequest): Promise<HttpResponse> {
    const validationResult = await this.signUpInputValidator.validate(req.body);

    if (!validationResult.isValid) {
      return badRequest(validationResult.errors[0]);
    }

    const domainErrors = [
      EmailAlreadyTakenError,
      UsernameAlreadyTakenError,
    ].map((e) => e.name);

    try {
      await this.signUp.signup(req.body as SignUpUseCaseInput);
      return { statusCode: 201 };
    } catch (error) {
      if (domainErrors.includes(error.name)) {
        return badRequest(error);
      }

      throw error;
    }
  }
}
