import { Profile } from '@domain/models';
import { ProfileRepository } from '@infra/facades/profileRepository';
import {
  FindProfileByEmailStub,
  FindProfileByUsernameRepositoryStub,
} from '@test/stubs/data/protocols';

export class ProfileRepositoryStub implements ProfileRepository {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async findByEmail(email: string): Promise<Profile | undefined> {
    return new FindProfileByEmailStub().findByEmail('');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async findByUsername(username: string): Promise<Profile | undefined> {
    return new FindProfileByUsernameRepositoryStub().findByUsername('');
  }
}
