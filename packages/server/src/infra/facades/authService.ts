import { PasswordHasher } from '@data/protocols';
import { AuthTokenGenerator } from '@data/protocols/authTokenGenerator';
import { PasswordHashComparer } from '@data/protocols/passwordHashComparer';
import { Types } from '@main/ioc/types';
import { inject, injectable } from 'inversify';

export interface AuthService
  extends PasswordHasher,
    PasswordHashComparer,
    AuthTokenGenerator {}

@injectable()
export class AuthServiceFacade implements AuthService {
  constructor(
    @inject(Types.PasswordHasher)
    private readonly passwordHasher: PasswordHasher,
    @inject(Types.PasswordHashComparer)
    private readonly passwordHashComparer: PasswordHashComparer,
    @inject(Types.AuthTokenGenerator)
    private readonly authTokenGenerator: AuthTokenGenerator
  ) {}

  async generateAuthToken(payload: any): Promise<string> {
    return this.authTokenGenerator.generateAuthToken(payload);
  }

  async hashPassword(password: string): Promise<string> {
    return this.passwordHasher.hashPassword(password);
  }

  async comparePasswords(left: string, right: string): Promise<boolean> {
    return this.passwordHashComparer.comparePasswords(left, right);
  }
}
