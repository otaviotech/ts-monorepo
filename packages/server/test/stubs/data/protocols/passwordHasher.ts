import { PasswordHasher } from '@data/protocols';

export class PasswordHasherStub implements PasswordHasher {
  async hash(password: string): Promise<string> {
    return `hashed_${password}`;
  }
}