import { User } from '@domain/models';
import { SignUp, SignUpUseCaseInput } from '@domain/usecases/signup';

import { UserFactory } from '@test/factories/domain/models';

export class SignUpUseCaseStub implements SignUp {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async signup(input: SignUpUseCaseInput): Promise<User> {
    return UserFactory.build({});
  }
}
