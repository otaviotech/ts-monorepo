import { FindUserByEmailRepository } from '@data/protocols/findUserByEmailRepository';
import { User } from '@domain/models/user';
import { UserFactory } from '@test/factories/user';

export class FindUserByEmailRepositoryStub
  implements FindUserByEmailRepository
{
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async find(email: string): Promise<User> {
    return UserFactory.build({});
  }
}
