import bcrypt from 'bcrypt';
import { PasswordHasher } from '@data/protocols';

const SALT = 12;

export class BcryptAdapter implements PasswordHasher {
  async hash(password: string): Promise<string> {
    const hashed = await bcrypt.hash(password, SALT);
    return hashed;
  }
}
