import { Profile } from '../../domain/models/profile';
import { SignUp, SignUpUseCaseInput } from '../../domain/usecases/signup';
import { PasswordHasher } from '../protocols/passwordHasher';

export class SignUpUseCase implements SignUp {
  constructor(private readonly passwordHasher: PasswordHasher) {}

  async signup(input: SignUpUseCaseInput): Promise<Profile> {
    await this.passwordHasher.hash(input.password);

    return {} as Profile;
  }
}
