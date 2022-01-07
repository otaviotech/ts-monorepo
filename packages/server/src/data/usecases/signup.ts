import { inject, injectable } from 'inversify';

// Domain
import { EmailAlreadyTakenError } from '@domain/errors/emailAlreadyTaken';
import { UsernameAlreadyTakenError } from '@domain/errors/usernameAlreadyTaken';
import { SignUp, SignUpUseCaseInput } from '@domain/usecases/signup';
import { User } from '@domain/models';

// Data
import {
  FindProfileByEmailRepository,
  FindProfileByUsernameRepository,
  PasswordHasher,
} from '@data/protocols';

// Main
import { Types } from '@main/ioc/types';
import { UserRepository } from '@infra/facades/userRepository';

@injectable()
export class SignUpUseCase implements SignUp {
  constructor(
    @inject(Types.PasswordHasher)
    private readonly passwordHasher: PasswordHasher,

    @inject(Types.FindProfileByEmailRepository)
    private readonly findProfileByEmailRepository: FindProfileByEmailRepository,

    @inject(Types.FindProfileByUsernameRepository)
    private readonly findProfileByUsernameRepository: FindProfileByUsernameRepository,

    @inject(Types.UserRepository)
    private readonly userRepository: UserRepository
  ) {}

  async signup(input: SignUpUseCaseInput): Promise<User> {
    const user = await this.userRepository.findByEmail(input.email);

    if (user) {
      throw new EmailAlreadyTakenError();
    }

    let profile = await this.findProfileByEmailRepository.find(input.email);

    if (profile) {
      throw new EmailAlreadyTakenError();
    }

    profile = await this.findProfileByUsernameRepository.find(input.username);

    if (profile) {
      throw new UsernameAlreadyTakenError();
    }

    const hashedPassword = await this.passwordHasher.hash(input.password);

    const payload: SignUpUseCaseInput = {
      ...input,
      password: hashedPassword,
    };

    return this.userRepository.createWithProfile(payload);
  }
}
