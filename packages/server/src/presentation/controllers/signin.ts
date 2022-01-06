import { InvalidCredentialsError } from '@domain/errors/invalidCredentials';
import { SignInUseCase, SignInUseCaseInput } from '@domain/usecases/signin';
import { badRequest } from '@presentation/helpers';
import { Controller, HttpRequest, HttpResponse } from '@presentation/protocols';
import { SignInInputValidator } from '@presentation/validators/signIn';

export interface SignInInput {
  identifier?: string;
  password?: string;
}

export class SignInController implements Controller {
  constructor(
    private readonly signInInputValidator: SignInInputValidator,
    private readonly signInUseCase: SignInUseCase
  ) {}

  async handle(req: HttpRequest): Promise<HttpResponse> {
    const validationResult = await this.signInInputValidator.validate(req.body);

    if (!validationResult.isValid) {
      return badRequest(validationResult.errors[0]);
    }

    const domainErrors = [InvalidCredentialsError].map((e) => e.name);

    try {
      const jwt = await this.signInUseCase.signin(
        req.body as SignInUseCaseInput
      );
      return { statusCode: 200, data: { jwt } };
    } catch (error) {
      if (domainErrors.includes(error.name)) {
        return badRequest(error);
      }

      throw error;
    }
  }
}
