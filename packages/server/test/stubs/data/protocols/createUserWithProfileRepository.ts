import { CreateUserWithProfileRepository } from '@data/protocols/createUserWithProfileRepository';
import { User } from '@domain/models/user';
import { SignUpUseCaseInput } from '@domain/usecases/signup';
import { UserFactory } from '@test/factories/user';

export class CreateUserWithProfileRepositoryStub
  implements CreateUserWithProfileRepository
{
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async create(input: SignUpUseCaseInput): Promise<User> {
    return UserFactory.build({});
  }
}
