import { Profile } from '../models/profile';

export interface SignUpUseCaseInput {
  email: string;
  username: string;
  password: string;
}

export interface SignUp {
  signup(input: SignUpUseCaseInput): Promise<Profile>;
}
