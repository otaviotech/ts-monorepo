import { FindProfileByEmailRepository } from '../../../../src/data/protocols/findProfileByEmailRepository';
import { Profile } from '../../../../src/domain/models/profile';
import { ProfileFactory } from '../../../factories/profile';

export class FindProfileByEmailStub implements FindProfileByEmailRepository {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async find(email: string): Promise<Profile> {
    return ProfileFactory.build({});
  }
}
