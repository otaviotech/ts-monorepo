import { FindUserByEmailRepository } from '@data/protocols';
import { User } from '@domain/models';
import { UserFactory } from '@test/factories/domain/models';

export class FindUserByEmailRepositoryStub
  implements FindUserByEmailRepository
{
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async findByEmail(email: string): Promise<User | undefined> {
    return UserFactory.build({});
  }
}
