import { SignIn, SignInUseCaseInput } from '@domain/usecases/signin';

export class SignInUseCaseStub implements SignIn {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async signin(input: SignInUseCaseInput): Promise<string> {
    return '';
  }
}
