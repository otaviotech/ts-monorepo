import { FindProfileByEmailRepository } from '@data/protocols/findProfileByEmailRepository';
import { Profile } from '@domain/models/profile';
import { ProfileFactory } from '@test/factories/profile';

export class FindProfileByEmailStub implements FindProfileByEmailRepository {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async find(email: string): Promise<Profile> {
    return ProfileFactory.build({});
  }
}
