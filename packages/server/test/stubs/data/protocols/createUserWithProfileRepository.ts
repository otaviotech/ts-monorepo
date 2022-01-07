import { CreateUserWithProfileRepository } from '@data/protocols';
import { User } from '@domain/models';
import { SignUpUseCaseInput } from '@domain/usecases/signup';
import { UserFactory } from '@test/factories/domain/models';

export class CreateUserWithProfileRepositoryStub
  implements CreateUserWithProfileRepository
{
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async createWithProfile(input: SignUpUseCaseInput): Promise<User> {
    return UserFactory.build({});
  }
}
