import { FindProfileByEmailRepository } from '@data/protocols';
import { Profile } from '@domain/models';
import { ProfileFactory } from '@test/factories/domain/models';

export class FindProfileByEmailStub implements FindProfileByEmailRepository {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async find(email: string): Promise<Profile | undefined> {
    return ProfileFactory.build({});
  }
}
