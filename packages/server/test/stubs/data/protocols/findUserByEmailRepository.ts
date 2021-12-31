import { FindUserByEmailRepository } from '../../../../src/data/protocols/findUserByEmailRepository';
import { User } from '../../../../src/domain/models/user';
import { UserFactory } from '../../../factories/user';

export class FindUserByEmailRepositoryStub
  implements FindUserByEmailRepository
{
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async find(email: string): Promise<User> {
    return UserFactory.build({});
  }
}
