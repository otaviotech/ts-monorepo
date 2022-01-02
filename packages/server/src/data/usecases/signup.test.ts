import { CreateUserWithProfileRepositoryStub } from '@test/stubs/data/protocols/createUserWithProfileRepository';
import { FindProfileByUsernameRepositoryStub } from '@test/stubs/data/protocols/findProfileByUsernameRepository';
import { FindUserByEmailRepositoryStub } from '@test/stubs/data/protocols/findUserByEmailRepository';
import { FindProfileByEmailStub } from '@test/stubs/data/protocols/findProfileByEmailRepository';
import { PasswordHasherStub } from '@test/stubs/data/protocols/passwordHasher';
import SignUpUseCaseFactory from '@test/factories/domain/usecases/signup';
import { EmailAreadyTakenError } from '@domain/errors/emailAlreadyTaken';
import { UsernameAlreadyTakenError } from '@domain/errors/usernameAlreadyTaken';
import { SignUpUseCase } from './signup';

const makeSut = () => {
  const passwordHasherStub = new PasswordHasherStub();
  const findUserByEmailRepoStub = new FindUserByEmailRepositoryStub();
  const findProfileByEmailRepoStub = new FindProfileByEmailStub();
  const findProfileByUsernameRepoStub =
    new FindProfileByUsernameRepositoryStub();
  const createUserWithProfileRepoStub =
    new CreateUserWithProfileRepositoryStub();

  const validInput = SignUpUseCaseFactory.ValidInputFactory.build({});

  const sut = new SignUpUseCase(
    passwordHasherStub,
    findUserByEmailRepoStub,
    findProfileByEmailRepoStub,
    findProfileByUsernameRepoStub,
    createUserWithProfileRepoStub
  );

  return {
    sut,
    passwordHasherStub,
    findUserByEmailRepoStub,
    findProfileByEmailRepoStub,
    findProfileByUsernameRepoStub,
    createUserWithProfileRepoStub,
    validInput,
  };
};

describe('SignUpUseCase', () => {
  it('should hash the password', async () => {
    const {
      sut,
      passwordHasherStub,
      findUserByEmailRepoStub,
      findProfileByEmailRepoStub,
      findProfileByUsernameRepoStub,
      validInput,
    } = makeSut();

    jest
      .spyOn(findUserByEmailRepoStub, 'find')
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
      findUserByEmailRepoStub,
      findProfileByEmailRepoStub,
      findProfileByUsernameRepoStub,
      validInput,
    } = makeSut();

    jest
      .spyOn(findUserByEmailRepoStub, 'find')
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

    expect(promise).rejects.toThrow(new EmailAreadyTakenError());
  });

  it("should throw if there's already a profile with the same email", () => {
    const { sut, findUserByEmailRepoStub, validInput } = makeSut();

    jest
      .spyOn(findUserByEmailRepoStub, 'find')
      .mockResolvedValueOnce(undefined);

    const promise = sut.signup(validInput);

    expect(promise).rejects.toThrow(new EmailAreadyTakenError());
  });

  it("should throw if there's already a profile with the same username", () => {
    const {
      sut,
      findUserByEmailRepoStub,
      findProfileByEmailRepoStub,
      validInput,
    } = makeSut();

    jest
      .spyOn(findUserByEmailRepoStub, 'find')
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
      findUserByEmailRepoStub,
      findProfileByEmailRepoStub,
      findProfileByUsernameRepoStub,
      createUserWithProfileRepoStub,
      validInput,
    } = makeSut();

    jest
      .spyOn(findUserByEmailRepoStub, 'find')
      .mockResolvedValueOnce(undefined);

    jest
      .spyOn(findProfileByEmailRepoStub, 'find')
      .mockResolvedValueOnce(undefined);

    jest
      .spyOn(findProfileByUsernameRepoStub, 'find')
      .mockResolvedValueOnce(undefined);

    jest.spyOn(createUserWithProfileRepoStub, 'create');

    const user = await sut.signup(validInput);

    expect(createUserWithProfileRepoStub.create).toHaveBeenCalledWith({
      ...validInput,
      password: `hashed_${validInput.password}`,
    });

    expect(user).toBeDefined();
  });
});
