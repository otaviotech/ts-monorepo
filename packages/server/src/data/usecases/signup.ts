// Domain
import { EmailAreadyTakenError } from '@domain/errors/emailAlreadyTaken';
import { UsernameAlreadyTakenError } from '@domain/errors/usernameAlreadyTaken';
import { SignUp, SignUpUseCaseInput } from '@domain/usecases/signup';
import { User } from '@domain/models';

// Data
import {
  CreateUserWithProfileRepository,
  FindProfileByEmailRepository,
  FindProfileByUsernameRepository,
  FindUserByEmailRepository,
  PasswordHasher,
} from '@data/protocols';

export class SignUpUseCase implements SignUp {
  constructor(
    private readonly passwordHasher: PasswordHasher,
    private readonly findUserByEmailRepository: FindUserByEmailRepository,
    private readonly findProfileByEmailRepository: FindProfileByEmailRepository,
    private readonly findProfileByUsernameRepository: FindProfileByUsernameRepository,
    private readonly createUserWithProfile: CreateUserWithProfileRepository
  ) {}

  async signup(input: SignUpUseCaseInput): Promise<User> {
    const user = await this.findUserByEmailRepository.find(input.email);

    if (user) {
      throw new EmailAreadyTakenError();
    }

    let profile = await this.findProfileByEmailRepository.find(input.email);

    if (profile) {
      throw new EmailAreadyTakenError();
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

    return this.createUserWithProfile.create(payload);
  }
}
