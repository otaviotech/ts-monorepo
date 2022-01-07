import { InvalidCredentialsError } from '@domain/errors/invalidCredentials';
import { User } from '@domain/models';
import { SignInUseCaseInput } from '@domain/usecases/signin';
import {
  FindProfileByEmailStub,
  FindProfileByUsernameRepositoryStub,
} from '@test/stubs/data/protocols';
import { FindUserByProfileIdRepositoryStub } from '@test/stubs/data/protocols/findUserByProfileIdRepository';
import { PasswordHashComparerStub } from '@test/stubs/data/protocols/passwordHashComparer';
import { SignIn } from './signin';

describe('SignInUseCase', () => {
  const makeSut = () => {
    const findProfileByEmailRepositoryStub = new FindProfileByEmailStub();
    const findProfileByUsernameRepositoryStub =
      new FindProfileByUsernameRepositoryStub();
    const findUserByProfileIdRepositoryStub =
      new FindUserByProfileIdRepositoryStub();
    const passwordHashComparerStub = new PasswordHashComparerStub();

    const sut = new SignIn(
      findProfileByEmailRepositoryStub,
      findProfileByUsernameRepositoryStub,
      findUserByProfileIdRepositoryStub,
      passwordHashComparerStub
    );

    const validInput: SignInUseCaseInput = {
      identifier: 'johndoe@email.com',
      password: 'strongpassword',
    };

    return {
      sut,
      findProfileByEmailRepositoryStub,
      findProfileByUsernameRepositoryStub,
      findUserByProfileIdRepositoryStub,
      passwordHashComparerStub,
      validInput,
    };
  };

  it("should throw an InvalidCredentialsError if can't find the profile by email or username", async () => {
    const {
      sut,
      findProfileByEmailRepositoryStub,
      findProfileByUsernameRepositoryStub,
      validInput,
    } = makeSut();

    jest
      .spyOn(findProfileByEmailRepositoryStub, 'find')
      .mockResolvedValueOnce(undefined);

    jest
      .spyOn(findProfileByUsernameRepositoryStub, 'find')
      .mockResolvedValueOnce(undefined);

    const promise = sut.signin(validInput);

    expect(promise).rejects.toThrow(new InvalidCredentialsError());
  });

  it("should throw if the passwords don't match", async () => {
    const {
      sut,
      passwordHashComparerStub,
      findUserByProfileIdRepositoryStub,
      validInput,
    } = makeSut();

    const dbPassword = 'any password';

    jest
      .spyOn(findUserByProfileIdRepositoryStub, 'find')
      .mockResolvedValueOnce({ id: 1, password: dbPassword } as User);

    jest
      .spyOn(passwordHashComparerStub, 'compare')
      .mockResolvedValueOnce(false);

    sut.signin(validInput).catch((error) => {
      expect(error).toEqual(new InvalidCredentialsError());
      expect(passwordHashComparerStub.compare).toHaveBeenCalledWith(
        validInput.password,
        dbPassword
      );
    });

    // expect(passwordHashComparerStub.compare).toHaveBeenCalledWith(
    //   validInput.password,
    //   expect.any('')
    // );

    // expect(promise).rejects.toThrow(new InvalidCredentialsError());
  });
});
