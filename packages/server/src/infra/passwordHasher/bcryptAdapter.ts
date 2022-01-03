import bcrypt from 'bcrypt';
import { injectable } from 'inversify';
import { PasswordHasher } from '@data/protocols';

const SALT = 12;

@injectable()
export class BcryptAdapter implements PasswordHasher {
  async hash(password: string): Promise<string> {
    const hashed = await bcrypt.hash(password, SALT);
    return hashed;
  }
}
