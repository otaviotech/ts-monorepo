import {
  FindProfileByEmailRepository,
  FindProfileByUsernameRepository,
} from '@data/protocols';
import { InvalidCredentialsError } from '@domain/errors/invalidCredentials';
import { SignIn, SignInUseCaseInput } from '@domain/usecases/signin';
import { AuthService } from '@infra/facades/authService';
import { UserRepository } from '@infra/facades/userRepository';
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
    private readonly userRepository: UserRepository,
    @inject(Types.AuthService)
    private readonly authService: AuthService
  ) {}

  async signin(input: SignInUseCaseInput): Promise<string> {
    let profile = await this.findProfileByEmailRepository.findByEmail(
      input.identifier
    );

    if (!profile) {
      profile = await this.findProfileByUsernameRepository.findByUsername(
        input.identifier
      );
    }

    if (!profile) {
      throw new InvalidCredentialsError();
    }

    const user = await this.userRepository.findByProfileId(profile.id);

    const passwordsMatch = await this.authService.comparePasswords(
      input.password,
      user?.password || ''
    );

    if (!passwordsMatch) {
      throw new InvalidCredentialsError();
    }

    return this.authService.generateAuthToken({ id: user?.id });
  }
}
