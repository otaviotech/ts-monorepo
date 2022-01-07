import { FindProfileByUsernameRepository } from '@data/protocols';
import { Profile } from '@domain/models';
import { ProfileFactory } from '@test/factories/domain/models';

export class FindProfileByUsernameRepositoryStub
  implements FindProfileByUsernameRepository
{
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async findByUsername(username: string): Promise<Profile | undefined> {
    return ProfileFactory.build({});
  }
}
