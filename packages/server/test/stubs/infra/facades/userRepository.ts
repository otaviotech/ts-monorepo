import { User } from '@domain/models';
import { SignUpUseCaseInput } from '@domain/usecases/signup';
import { UserRepository } from '@infra/facades/userRepository';
import {
  CreateUserWithProfileRepositoryStub,
  FindUserByEmailRepositoryStub,
} from '@test/stubs/data/protocols';
import { FindUserByProfileIdRepositoryStub } from '@test/stubs/data/protocols/findUserByProfileIdRepository';

export class UserRepositoryStub implements UserRepository {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  createWithProfile(input: SignUpUseCaseInput): Promise<User> {
    return new CreateUserWithProfileRepositoryStub().createWithProfile({
      email: '',
      password: '',
      username: '',
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  findByEmail(email: string): Promise<User | undefined> {
    return new FindUserByEmailRepositoryStub().findByEmail('');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  findByProfileId(profileId: number): Promise<User | undefined> {
    return new FindUserByProfileIdRepositoryStub().findByProfileId(1);
  }
}
