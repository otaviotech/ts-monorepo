import bcrypt from 'bcrypt';
import { BcryptAdapter } from './bcryptAdapter';

describe('PasswordHasherBcryptAdapter', () => {
  const makeSut = () => {
    const sut = new BcryptAdapter();
    const validInput = 'abc123';
    const SALT = 12;

    return {
      sut,
      validInput,
      SALT,
    };
  };

  it('should encript values', async () => {
    const { sut, validInput, SALT } = makeSut();

    const expected = `hashed${validInput}`;

    jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => expected);

    const hash = await sut.hashPassword(validInput);

    expect(bcrypt.hash).toHaveBeenCalledWith(validInput, SALT);
    expect(hash).toBe(expected);
  });

  it('should throw if bcrypt throw', async () => {
    const { sut, validInput } = makeSut();

    const expected = new Error('Error thrown by bcrypt.');

    jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => {
      throw expected;
    });

    const promise = sut.hashPassword(validInput);

    expect(promise).rejects.toThrow(expected);
  });
});
