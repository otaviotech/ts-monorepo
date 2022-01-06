import { SignInUseCase, SignInUseCaseInput } from '@domain/usecases/signin';

export class SignInUseCaseStub implements SignInUseCase {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async signin(input: SignInUseCaseInput): Promise<string> {
    return '';
  }
}
