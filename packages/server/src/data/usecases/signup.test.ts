import {
  FindProfileByUsernameRepositoryStub,
  FindProfileByEmailStub,
  PasswordHasherStub,
} from '@test/stubs/data/protocols';
import SignUpUseCaseFactory from '@test/factories/domain/usecases/signup';
import { EmailAlreadyTakenError } from '@domain/errors/emailAlreadyTaken';
import { UsernameAlreadyTakenError } from '@domain/errors/usernameAlreadyTaken';
import { UserRepositoryStub } from '@test/stubs/infra/facades/userRepository';
import { SignUpUseCase } from './signup';

const makeSut = () => {
  const passwordHasherStub = new PasswordHasherStub();
  const findProfileByEmailRepoStub = new FindProfileByEmailStub();
  const findProfileByUsernameRepoStub =
    new FindProfileByUsernameRepositoryStub();
  const userRepositoryStub = new UserRepositoryStub();

  const validInput = SignUpUseCaseFactory.ValidInputFactory.build({});

  const sut = new SignUpUseCase(
    passwordHasherStub,
    findProfileByEmailRepoStub,
    findProfileByUsernameRepoStub,
    userRepositoryStub
  );

  return {
    sut,
    passwordHasherStub,
    findProfileByEmailRepoStub,
    findProfileByUsernameRepoStub,
    userRepositoryStub,
    validInput,
  };
};

describe('SignUpUseCase', () => {
  it('should hash the password', async () => {
    const {
      sut,
      passwordHasherStub,
      findProfileByEmailRepoStub,
      findProfileByUsernameRepoStub,
      userRepositoryStub,
      validInput,
    } = makeSut();

    jest
      .spyOn(userRepositoryStub, 'findByEmail')
      .mockResolvedValueOnce(undefined);

    jest
      .spyOn(findProfileByEmailRepoStub, 'find')
      .mockResolvedValueOnce(undefined);

    jest
      .spyOn(findProfileByUsernameRepoStub, 'find')
      .mockResolvedValueOnce(undefined);

    jest.spyOn(passwordHasherStub, 'hash');

    await sut.signup(validInput);

    expect(passwordHasherStub.hash).toHaveBeenCalledWith(validInput.password);
  });

  it('should throw if the password hasher throws', async () => {
    const {
      sut,
      passwordHasherStub,
      userRepositoryStub,
      findProfileByEmailRepoStub,
      findProfileByUsernameRepoStub,
      validInput,
    } = makeSut();

    jest
      .spyOn(userRepositoryStub, 'findByEmail')
      .mockResolvedValueOnce(undefined);

    jest
      .spyOn(findProfileByEmailRepoStub, 'find')
      .mockResolvedValueOnce(undefined);

    jest
      .spyOn(findProfileByUsernameRepoStub, 'find')
      .mockResolvedValueOnce(undefined);

    jest
      .spyOn(passwordHasherStub, 'hash')
      .mockRejectedValueOnce(new Error('ERROR'));

    const promise = sut.signup(validInput);

    expect(promise).rejects.toThrow(new Error('ERROR'));
  });

  it("should throw if there's already a user with the same email", () => {
    const { sut, validInput } = makeSut();

    const promise = sut.signup(validInput);

    expect(promise).rejects.toThrow(new EmailAlreadyTakenError());
  });

  it("should throw if there's already a profile with the same email", () => {
    const { sut, userRepositoryStub, validInput } = makeSut();

    jest
      .spyOn(userRepositoryStub, 'findByEmail')
      .mockResolvedValueOnce(undefined);

    const promise = sut.signup(validInput);

    expect(promise).rejects.toThrow(new EmailAlreadyTakenError());
  });

  it("should throw if there's already a profile with the same username", () => {
    const { sut, userRepositoryStub, findProfileByEmailRepoStub, validInput } =
      makeSut();

    jest
      .spyOn(userRepositoryStub, 'findByEmail')
      .mockResolvedValueOnce(undefined);

    jest
      .spyOn(findProfileByEmailRepoStub, 'find')
      .mockResolvedValueOnce(undefined);

    const promise = sut.signup(validInput);

    expect(promise).rejects.toThrow(new UsernameAlreadyTakenError());
  });

  it('should create a user with a profile attached', async () => {
    const {
      sut,
      findProfileByEmailRepoStub,
      findProfileByUsernameRepoStub,
      userRepositoryStub,
      validInput,
    } = makeSut();

    jest
      .spyOn(userRepositoryStub, 'findByEmail')
      .mockResolvedValueOnce(undefined);

    jest
      .spyOn(findProfileByEmailRepoStub, 'find')
      .mockResolvedValueOnce(undefined);

    jest
      .spyOn(findProfileByUsernameRepoStub, 'find')
      .mockResolvedValueOnce(undefined);

    jest.spyOn(userRepositoryStub, 'createWithProfile');

    const user = await sut.signup(validInput);

    expect(userRepositoryStub.createWithProfile).toHaveBeenCalledWith({
      ...validInput,
      password: `hashed_${validInput.password}`,
    });

    expect(user).toBeDefined();
  });
});
