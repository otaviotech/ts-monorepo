import {
  FindProfileByEmailRepository,
  FindProfileByUsernameRepository,
} from '@data/protocols';
import { AuthTokenGenerator } from '@data/protocols/authTokenGenerator';
import { FindUserByProfileIdRepository } from '@data/protocols/findUserByProfileIdRepository';
import { PasswordHashComparer } from '@data/protocols/passwordHashComparer';
import { InvalidCredentialsError } from '@domain/errors/invalidCredentials';
import { SignIn, SignInUseCaseInput } from '@domain/usecases/signin';
import { Types } from '@main/ioc/types';
import { inject, injectable } from 'inversify';

@injectable()
export class SignInUseCase implements SignIn {
  constructor(
    @inject(Types.FindProfileByEmailRepository)
    private readonly findProfileByEmailRepository: FindProfileByEmailRepository,
    @inject(Types.FindProfileByUsernameRepository)
    private readonly findProfileByUsernameRepository: FindProfileByUsernameRepository,
    @inject(Types.FindUserByProfileIdRepository)
    private readonly findUserByProfileIdRepository: FindUserByProfileIdRepository,
    @inject(Types.PasswordHashComparer)
    private readonly passwordHashComparer: PasswordHashComparer,
    @inject(Types.AuthTokenGenerator)
    private readonly authTokenGenerator: AuthTokenGenerator
  ) {}

  async signin(input: SignInUseCaseInput): Promise<string> {
    let profile = await this.findProfileByEmailRepository.find(
      input.identifier
    );

    if (!profile) {
      profile = await this.findProfileByUsernameRepository.find(
        input.identifier
      );
    }

    if (!profile) {
      throw new InvalidCredentialsError();
    }

    const user = await this.findUserByProfileIdRepository.find(profile.id);

    const passwordsMatch = await this.passwordHashComparer.compare(
      input.password,
      user?.password || ''
    );

    if (!passwordsMatch) {
      throw new InvalidCredentialsError();
    }

    return this.authTokenGenerator.generate({ id: user?.id });
  }
}
