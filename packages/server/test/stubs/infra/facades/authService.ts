import { AuthService } from '@infra/facades/authService';
import { PasswordHasherStub } from '@test/stubs/data/protocols';
import { AuthTokenGeneratorStub } from '@test/stubs/data/protocols/authTokenGenerator';
import { PasswordHashComparerStub } from '@test/stubs/data/protocols/passwordHashComparer';

export class AuthServiceStub implements AuthService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  hashPassword(password: string): Promise<string> {
    return new PasswordHasherStub().hashPassword('');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  comparePasswords(left: string, right: string): Promise<boolean> {
    return new PasswordHashComparerStub().comparePasswords('', '');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  generateAuthToken(payload: any): Promise<string> {
    return new AuthTokenGeneratorStub().generateAuthToken({});
  }
}
