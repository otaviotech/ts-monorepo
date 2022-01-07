import { AuthTokenGenerator } from '@data/protocols/authTokenGenerator';

export class AuthTokenGeneratorStub implements AuthTokenGenerator {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async generate(payload: any): Promise<string> {
    return 'A.JWT.TOKEN';
  }
}
