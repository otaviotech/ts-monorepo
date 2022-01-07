import { FindUserByProfileIdRepository } from '@data/protocols/findUserByProfileIdRepository';
import { User } from '@domain/models';
import { UserFactory } from '@test/factories/domain/models';

export class FindUserByProfileIdRepositoryStub
  implements FindUserByProfileIdRepository
{
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async find(profileId: number): Promise<User | undefined> {
    return UserFactory.build({});
  }
}
