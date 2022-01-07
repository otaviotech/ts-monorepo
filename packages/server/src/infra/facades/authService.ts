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

  async generate(payload: any): Promise<string> {
    return this.authTokenGenerator.generate(payload);
  }

  async hash(password: string): Promise<string> {
    return this.passwordHasher.hash(password);
  }

  async compare(left: string, right: string): Promise<boolean> {
    return this.passwordHashComparer.compare(left, right);
  }
}
