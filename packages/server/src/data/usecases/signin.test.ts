import { InvalidCredentialsError } from '@domain/errors/invalidCredentials';
import { User } from '@domain/models';
import { SignInUseCaseInput } from '@domain/usecases/signin';
import {
  FindProfileByEmailStub,
  FindProfileByUsernameRepositoryStub,
} from '@test/stubs/data/protocols';
import { AuthServiceStub } from '@test/stubs/infra/facades/authService';
import { UserRepositoryStub } from '@test/stubs/infra/facades/userRepository';
import { SignInUseCase } from './signin';

describe('SignInUseCase', () => {
  const makeSut = () => {
    const findProfileByEmailRepositoryStub = new FindProfileByEmailStub();
    const findProfileByUsernameRepositoryStub =
      new FindProfileByUsernameRepositoryStub();
    const userRepositoryStub = new UserRepositoryStub();
    const authServiceStub = new AuthServiceStub();

    const sut = new SignInUseCase(
      findProfileByEmailRepositoryStub,
      findProfileByUsernameRepositoryStub,
      userRepositoryStub,
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
      userRepositoryStub,
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
      .spyOn(findProfileByEmailRepositoryStub, 'findByEmail')
      .mockResolvedValueOnce(undefined);

    jest
      .spyOn(findProfileByUsernameRepositoryStub, 'findByUsername')
      .mockResolvedValueOnce(undefined);

    const promise = sut.signin(validInput);

    expect(promise).rejects.toThrow(new InvalidCredentialsError());
  });

  it("should throw if the passwords don't match", async () => {
    const { sut, userRepositoryStub, authServiceStub, validInput } = makeSut();

    const dbPassword = 'any password';

    jest
      .spyOn(userRepositoryStub, 'findByProfileId')
      .mockResolvedValueOnce({ id: 1, password: dbPassword } as User);

    jest
      .spyOn(authServiceStub, 'comparePasswords')
      .mockResolvedValueOnce(false);

    sut.signin(validInput).catch((error) => {
      expect(error).toEqual(new InvalidCredentialsError());
      expect(authServiceStub.comparePasswords).toHaveBeenCalledWith(
        validInput.password,
        dbPassword
      );
    });
  });

  it("should generate(and return) a jwt token using the user's id", async () => {
    const { sut, userRepositoryStub, authServiceStub, validInput } = makeSut();

    const user = { id: 1 } as User;
    jest
      .spyOn(userRepositoryStub, 'findByProfileId')
      .mockResolvedValueOnce(user);

    jest.spyOn(authServiceStub, 'generateAuthToken');

    const result = await sut.signin(validInput);

    expect(authServiceStub.generateAuthToken).toHaveBeenCalledWith(user);

    expect(result).toEqual('A.JWT.TOKEN');
  });
});
