import { InvalidCredentialsError } from '@domain/errors/invalidCredentials';
import { User } from '@domain/models';
import { SignInUseCaseInput } from '@domain/usecases/signin';
import {
  FindProfileByEmailStub,
  FindProfileByUsernameRepositoryStub,
} from '@test/stubs/data/protocols';
import { FindUserByProfileIdRepositoryStub } from '@test/stubs/data/protocols/findUserByProfileIdRepository';
import { AuthServiceStub } from '@test/stubs/infra/facades/authService';
import { SignInUseCase } from './signin';

describe('SignInUseCase', () => {
  const makeSut = () => {
    const findProfileByEmailRepositoryStub = new FindProfileByEmailStub();
    const findProfileByUsernameRepositoryStub =
      new FindProfileByUsernameRepositoryStub();
    const findUserByProfileIdRepositoryStub =
      new FindUserByProfileIdRepositoryStub();
    const authServiceStub = new AuthServiceStub();

    const sut = new SignInUseCase(
      findProfileByEmailRepositoryStub,
      findProfileByUsernameRepositoryStub,
      findUserByProfileIdRepositoryStub,
      authServiceStub
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
      authServiceStub,
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
      findUserByProfileIdRepositoryStub,
      authServiceStub,
      validInput,
    } = makeSut();

    const dbPassword = 'any password';

    jest
      .spyOn(findUserByProfileIdRepositoryStub, 'find')
      .mockResolvedValueOnce({ id: 1, password: dbPassword } as User);

    jest.spyOn(authServiceStub, 'compare').mockResolvedValueOnce(false);

    sut.signin(validInput).catch((error) => {
      expect(error).toEqual(new InvalidCredentialsError());
      expect(authServiceStub.compare).toHaveBeenCalledWith(
        validInput.password,
        dbPassword
      );
    });
  });

  it("should generate(and return) a jwt token using the user's id", async () => {
    const {
      sut,
      findUserByProfileIdRepositoryStub,
      authServiceStub,
      validInput,
    } = makeSut();

    const user = { id: 1 } as User;
    jest
      .spyOn(findUserByProfileIdRepositoryStub, 'find')
      .mockResolvedValueOnce(user);

    jest.spyOn(authServiceStub, 'generate');

    const result = await sut.signin(validInput);

    expect(authServiceStub.generate).toHaveBeenCalledWith(user);

    expect(result).toEqual('A.JWT.TOKEN');
  });
});
