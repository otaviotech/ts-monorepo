import { PasswordHashComparer } from '@data/protocols/passwordHashComparer';

export class PasswordHashComparerStub implements PasswordHashComparer {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async compare(left: string, right: string): Promise<boolean> {
    return true;
  }
}
