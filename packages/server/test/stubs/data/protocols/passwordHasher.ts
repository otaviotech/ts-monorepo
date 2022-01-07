import { PasswordHasher } from '@data/protocols';

export class PasswordHasherStub implements PasswordHasher {
  async hashPassword(password: string): Promise<string> {
    return `hashed_${password}`;
  }
}
