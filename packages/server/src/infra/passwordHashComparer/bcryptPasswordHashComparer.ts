import bcrypt from 'bcrypt';

import { PasswordHashComparer } from '@data/protocols/passwordHashComparer';
import { injectable } from 'inversify';

@injectable()
export class BcryptPasswordHashComparer implements PasswordHashComparer {
  async compare(left: string, right: string): Promise<boolean> {
    const passwordsMatch = await bcrypt.compare(left, right);
    return passwordsMatch;
  }
}
