// eslint-disable-next-line max-classes-per-file
import { User } from '../../domain/models/user';
import { SignUpUseCaseInput } from '../../domain/usecases/signup';
import { FindUserByEmailRepository } from '../protocols/findUserByEmailRepository';
import { PasswordHasher } from '../protocols/passwordHasher';
import { SignUpUseCase } from './signup';
import { EmailAreadyTakenError } from '../../domain/errors/emailAlreadyTaken';
import { FindProfileByEmailRepository } from '../protocols/findProfileByEmailRepository';
import { Profile } from '../../domain/models/profile';
import { UsernameAlreadyTakenError } from '../../domain/errors/usernameAlreadyTaken';
import { FindProfileByUsernameRepository } from '../protocols/findProfileByEmailRepository copy';

const makePasswordHasherStub = () => {
  class PasswordHasherStub implements PasswordHasher {
    async hash(password: string): Promise<string> {
      return `hashed_${password}`;
    }
  }

  return new PasswordHasherStub();
};

const makeFindUserByEmailRepoStub = () => {
  class FindUserByEmailRepoStub implements FindUserByEmailRepository {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async find(email: string): Promise<User> {
      return {
        id: 1,
        email: 'johndoe@email.com',
        name: 'John Doe',
        password: 'abc123',
      };
    }
  }

  return new FindUserByEmailRepoStub();
};

const makeFindProfileByEmailStub = () => {
  class FindProfileByEmailStub implements FindProfileByEmailRepository {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async find(email: string): Promise<Profile> {
      return {} as Profile;
    }
  }

  return new FindProfileByEmailStub();
};

const makeFindProfileByUsernameRepo = () => {
  class FindProfileByUsernameRepositoryStub
    implements FindProfileByUsernameRepository
  {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async find(username: string): Promise<Profile> {
      return {} as Profile;
    }
  }

  return new FindProfileByUsernameRepositoryStub();
};

const makeSut = () => {
  const passwordHasherStub = makePasswordHasherStub();
  const findUserByEmailRepoStub = makeFindUserByEmailRepoStub();
  const findProfileByEmailRepoStub = makeFindProfileByEmailStub();
  const findProfileByUsernameRepoStub = makeFindProfileByUsernameRepo();

  const validInput = {
    email: 'johndoe@email.com',
    username: 'jdoe',
    password: 'abc123',
  } as SignUpUseCaseInput;

  const sut = new SignUpUseCase(
    passwordHasherStub,
    findUserByEmailRepoStub,
    findProfileByEmailRepoStub,
    findProfileByUsernameRepoStub
  );

  return {
    sut,
    passwordHasherStub,
    findUserByEmailRepoStub,
    findProfileByEmailRepoStub,
    findProfileByUsernameRepoStub,
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
});
