import bcrypt from 'bcrypt';
import { BcryptPasswordHashComparer } from './bcryptPasswordHashComparer';

describe('BcryptPasswordHashComparer', () => {
  const makeSut = () => {
    const sut = new BcryptPasswordHashComparer();

    return { sut };
  };

  it('should return what bcrypt says', async () => {
    const { sut } = makeSut();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(true);

    const result = await sut.compare('abc', 'hashed_abc');

    expect(bcrypt.compare).toHaveBeenCalledWith('abc', 'hashed_abc');

    expect(result).toBe(true);
  });

  it('should throw if bcrypt throws', async () => {
    const { sut } = makeSut();

    const errorThrown = new Error('Error thrown by bcrypt.compare()');

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    jest.spyOn(bcrypt, 'compare').mockImplementationOnce(() => {
      throw errorThrown;
    });

    const promise = sut.compare('abc', 'hashed_abc');

    expect(promise).rejects.toThrow(errorThrown);
  });
});
