import { PasswordHasher } from '@data/protocols/passwordHasher';

export class PasswordHasherStub implements PasswordHasher {
  async hash(password: string): Promise<string> {
    return `hashed_${password}`;
  }
}
