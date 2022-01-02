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

    const hash = await sut.hash(validInput);

    expect(bcrypt.hash).toHaveBeenCalledWith(validInput, SALT);
    expect(hash).toBe(expected);
  });
});
