import {
  FindProfileByEmailRepository,
  FindProfileByUsernameRepository,
} from '@data/protocols';
import { Profile } from '@domain/models';
import { Types } from '@main/ioc/types';
import { inject, injectable } from 'inversify';

export interface ProfileRepository
  extends FindProfileByEmailRepository,
    FindProfileByUsernameRepository {}

@injectable()
export class ProfileRepositoryFacade implements ProfileRepository {
  constructor(
    @inject(Types.FindProfileByEmailRepository)
    private readonly findProfileByEmailRepository: FindProfileByEmailRepository,

    @inject(Types.FindProfileByUsernameRepository)
    private readonly findProfileByUsernameRepository: FindProfileByUsernameRepository
  ) {}

  async findByEmail(email: string): Promise<Profile | undefined> {
    return this.findProfileByEmailRepository.findByEmail(email);
  }

  async findByUsername(username: string): Promise<Profile | undefined> {
    return this.findProfileByUsernameRepository.findByUsername(username);
  }
}
