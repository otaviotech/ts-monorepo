export interface SignInUseCaseInput {
  identifier: string;
  password: string;
}

export interface SignInUseCase {
  signin(input: SignInUseCaseInput): Promise<string>;
}
