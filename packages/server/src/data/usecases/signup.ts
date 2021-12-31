// Domain
import { EmailAreadyTakenError } from '@domain/errors/emailAlreadyTaken';
import { UsernameAlreadyTakenError } from '@domain/errors/usernameAlreadyTaken';
import { Profile } from '@domain/models/profile';
import { SignUp, SignUpUseCaseInput } from '@domain/usecases/signup';

// Data
import { CreateUserWithProfileRepository } from '@data/protocols/createUserWithProfileRepository';
import { FindProfileByEmailRepository } from '@data/protocols/findProfileByEmailRepository';
import { FindProfileByUsernameRepository } from '@data/protocols/findProfileByUsernameRepository';
import { FindUserByEmailRepository } from '@data/protocols/findUserByEmailRepository';
import { PasswordHasher } from '@data/protocols/passwordHasher';

export class SignUpUseCase implements SignUp {
  constructor(
    private readonly passwordHasher: PasswordHasher,
    private readonly findUserByEmailRepository: FindUserByEmailRepository,
    private readonly findProfileByEmailRepository: FindProfileByEmailRepository,
    private readonly findProfileByUsernameRepository: FindProfileByUsernameRepository,
    private readonly createUserWithProfile: CreateUserWithProfileRepository
  ) {}

  async signup(input: SignUpUseCaseInput): Promise<Profile> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

    await this.createUserWithProfile.create(payload);

    return {} as Profile;
  }
}
