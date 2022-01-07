import {
  FindProfileByEmailRepository,
  FindProfileByUsernameRepository,
} from '@data/protocols';
import { FindUserByProfileIdRepository } from '@data/protocols/findUserByProfileIdRepository';
import { PasswordHashComparer } from '@data/protocols/passwordHashComparer';
import { InvalidCredentialsError } from '@domain/errors/invalidCredentials';
import { SignInUseCase, SignInUseCaseInput } from '@domain/usecases/signin';

export class SignIn implements SignInUseCase {
  constructor(
    private readonly findProfileByEmailRepository: FindProfileByEmailRepository,
    private readonly findProfileByUsernameRepository: FindProfileByUsernameRepository,
    private readonly findUserByProfileIdRepository: FindUserByProfileIdRepository,
    private readonly passwordHashComparer: PasswordHashComparer
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

    return '';
  }
}
