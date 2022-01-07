import jwt from 'jsonwebtoken';
import { AuthTokenGenerator } from '@data/protocols/authTokenGenerator';

export class JwtTokenGenerator implements AuthTokenGenerator {
  constructor(private readonly secret: string) {}

  async generate(payload: any): Promise<string> {
    return new Promise((resolve) => {
      jwt.sign(payload, this.secret, {}, (err, token) => {
        if (err) {
          throw err;
        }

        if (token) {
          resolve(token);
        }
      });
    });
  }
}
