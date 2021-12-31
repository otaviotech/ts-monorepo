import { FindProfileByUsernameRepository } from '../../../../src/data/protocols/findProfileByUsernameRepository';
import { Profile } from '../../../../src/domain/models/profile';
import { ProfileFactory } from '../../../factories/profile';

export class FindProfileByUsernameRepositoryStub
  implements FindProfileByUsernameRepository
{
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async find(username: string): Promise<Profile> {
    return ProfileFactory.build({});
  }
}
