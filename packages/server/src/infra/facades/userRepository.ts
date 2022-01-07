import {
  CreateUserWithProfileRepository,
  FindUserByEmailRepository,
} from '@data/protocols';
import { FindUserByProfileIdRepository } from '@data/protocols/findUserByProfileIdRepository';
import { User } from '@domain/models';
import { SignUpUseCaseInput } from '@domain/usecases/signup';
import { Types } from '@main/ioc/types';
import { FindUserByProfileIdRepositoryStub } from '@test/stubs/data/protocols/findUserByProfileIdRepository';
import { inject, injectable } from 'inversify';

export interface UserRepository
  extends FindUserByEmailRepository,
    FindUserByProfileIdRepositoryStub,
    CreateUserWithProfileRepository {}

@injectable()
export class UserRepositoryFacade implements UserRepository {
  constructor(
    @inject(Types.FindUserByProfileIdRepository)
    private readonly findUserByProfileIdRepository: FindUserByProfileIdRepository,
    @inject(Types.FindUserByEmailRepository)
    private readonly findUserByEmailRepository: FindUserByEmailRepository,
    @inject(Types.CreateUserWithProfileRepository)
    private readonly createUserWithProfileRepository: CreateUserWithProfileRepository
  ) {}

  async createWithProfile(input: SignUpUseCaseInput): Promise<User> {
    return this.createUserWithProfileRepository.createWithProfile(input);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.findUserByEmailRepository.findByEmail(email);
  }

  async findByProfileId(profileId: number): Promise<User | undefined> {
    return this.findUserByProfileIdRepository.findByProfileId(profileId);
  }
}
