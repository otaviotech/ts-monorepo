export interface SignInUseCaseInput {
  identifier: string;
  password: string;
}

export interface SignIn {
  signin(input: SignInUseCaseInput): Promise<string>;
}
