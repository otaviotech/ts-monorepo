import { SignUpUseCaseInput } from '../../domain/usecases/signup';
import { PasswordHasher } from '../protocols/passwordHasher';
import { SignUpUseCase } from './signup';

const makePasswordHasherStub = () => {
  class PasswordHasherStub implements PasswordHasher {
    async hash(password: string): Promise<string> {
      return `hashed_${password}`;
    }
  }

  return new PasswordHasherStub();
};

const makeSut = () => {
  const passwordHasherStub = makePasswordHasherStub();

  const validInput = {
    email: 'johndoe@email.com',
    username: 'jdoe',
    password: 'abc123',
  } as SignUpUseCaseInput;

  const sut = new SignUpUseCase(passwordHasherStub);

  return {
    sut,
    passwordHasherStub,
    validInput,
  };
};

describe('SignUpUseCase', () => {
  it('should hash the password', async () => {
    const { sut, passwordHasherStub, validInput } = makeSut();

    jest.spyOn(passwordHasherStub, 'hash');

    await sut.signup(validInput);

    expect(passwordHasherStub.hash).toHaveBeenCalledWith(validInput.password);
  });

  it('should throw if the password hasher throws', async () => {
    const { sut, passwordHasherStub, validInput } = makeSut();

    jest
      .spyOn(passwordHasherStub, 'hash')
      .mockRejectedValueOnce(new Error('ERROR'));

    const promise = sut.signup(validInput);

    expect(promise).rejects.toThrow(new Error('ERROR'));
  });
});
