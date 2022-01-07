import { AuthService } from '@infra/facades/authService';
import { PasswordHasherStub } from '@test/stubs/data/protocols';
import { AuthTokenGeneratorStub } from '@test/stubs/data/protocols/authTokenGenerator';
import { PasswordHashComparerStub } from '@test/stubs/data/protocols/passwordHashComparer';

export class AuthServiceStub implements AuthService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  hash(password: string): Promise<string> {
    return new PasswordHasherStub().hash('');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  compare(left: string, right: string): Promise<boolean> {
    return new PasswordHashComparerStub().compare('', '');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  generate(payload: any): Promise<string> {
    return new AuthTokenGeneratorStub().generate({});
  }
}
