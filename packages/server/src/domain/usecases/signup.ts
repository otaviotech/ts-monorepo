import { User } from '@domain/models/user';

export interface SignUpUseCaseInput {
  email: string;
  username: string;
  password: string;
}

export interface SignUp {
  signup(input: SignUpUseCaseInput): Promise<User>;
}
