import { EmailAreadyTakenError } from '../../domain/errors/emailAlreadyTaken';
import { UsernameAlreadyTakenError } from '../../domain/errors/usernameAlreadyTaken';
import { Profile } from '../../domain/models/profile';
import { SignUp, SignUpUseCaseInput } from '../../domain/usecases/signup';
import { FindProfileByEmailRepository } from '../protocols/findProfileByEmailRepository';
import { FindProfileByUsernameRepository } from '../protocols/findProfileByUsernameRepository';
import { FindUserByEmailRepository } from '../protocols/findUserByEmailRepository';
import { PasswordHasher } from '../protocols/passwordHasher';

export class SignUpUseCase implements SignUp {
  constructor(
    private readonly passwordHasher: PasswordHasher,
    private readonly findUserByEmailRepository: FindUserByEmailRepository,
    private readonly findProfileByEmailRepository: FindProfileByEmailRepository,
    private readonly findProfileByUsernameRepository: FindProfileByUsernameRepository
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

    await this.passwordHasher.hash(input.password);

    // findAccountRepo.find({ userEmail, accountEmail, accountUsername })

    // verificar se já tem um User com esse email
    // verificar se já tem um Profile com esse email ou username.

    return {} as Profile;
  }
}
