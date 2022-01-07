import jwt from 'jsonwebtoken';
import { JwtTokenGenerator } from './jwtTokenGenerator';

describe('JwtTokenGenerator', () => {
  const makeSut = () => {
    const sut = new JwtTokenGenerator('SECRET_KEY');
    const validInput = { id: 1 };

    return { sut, validInput };
  };

  it('should generate a jwt token using the secret and the payload', async () => {
    const { sut, validInput } = makeSut();

    const JWT_RESULT = 'A.JWT.TOKEN';

    jest
      .spyOn(jwt, 'sign')
      .mockImplementationOnce((a, b, c, cb) => cb(null, JWT_RESULT));

    const result = await sut.generateAuthToken(validInput);

    expect(result).toBe(JWT_RESULT);
  });

  it('should throw if jwt throws', async () => {
    const { sut, validInput } = makeSut();

    const errorThrown = new Error('Error throw by jsonwebtoken');

    jest.spyOn(jwt, 'sign').mockImplementationOnce(() => {
      throw errorThrown;
    });

    const promise = sut.generateAuthToken(validInput);

    expect(promise).rejects.toThrow(errorThrown);
  });

  it('should throw if jwt has an error', async () => {
    const { sut, validInput } = makeSut();

    const errorThrown = new Error('Error throw by jsonwebtoken');

    jest
      .spyOn(jwt, 'sign')
      .mockImplementationOnce((a, b, c, cb) => cb(errorThrown, undefined));

    const promise = sut.generateAuthToken(validInput);

    expect(promise).rejects.toThrow(errorThrown);
  });
});
