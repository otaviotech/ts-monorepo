import { FindProfileByUsernameRepository } from '@data/protocols/findProfileByUsernameRepository';
import { Profile } from '@domain/models/profile';
import { ProfileFactory } from '@test/factories/profile';

export class FindProfileByUsernameRepositoryStub
  implements FindProfileByUsernameRepository
{
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async find(username: string): Promise<Profile> {
    return ProfileFactory.build({});
  }
}
