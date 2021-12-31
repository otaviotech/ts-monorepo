import { CreateUserWithProfileRepository } from '../../../../src/data/protocols/createUserWithProfileRepository';
import { User } from '../../../../src/domain/models/user';
import { SignUpUseCaseInput } from '../../../../src/domain/usecases/signup';
import { UserFactory } from '../../../factories/user';

export class CreateUserWithProfileRepositoryStub
  implements CreateUserWithProfileRepository
{
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async create(input: SignUpUseCaseInput): Promise<User> {
    return UserFactory.build({});
  }
}
