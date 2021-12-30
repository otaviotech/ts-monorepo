import { SignUpController } from './signup';
import { RequestValidationError } from '../errors/validation';

const omit = (obj, ...keys) =>
  Object.fromEntries(
    Object.entries(obj).filter(([key]) => !keys.includes(key))
  );

describe('RegisterController', () => {
  const makeSut = () => {
    const sut = new SignUpController();
    const inputData = {
      body: {
        email: 'johndoe@email.com',
        username: 'jdoe',
        password: 'abc123',
      },
    };

    return {
      sut,
      inputData,
    };
  };

  const requiredFields = ['email', 'username', 'password'];

  it.each(requiredFields)(
    'should return 400 if no %s is provided',
    async (requiredField) => {
      const { sut, inputData } = makeSut();

      const req = {
        body: omit(inputData.body, requiredField),
      };

      const httpResponse = await sut.handle(req);

      expect(httpResponse.statusCode).toBe(400);
      expect(httpResponse.error).toEqual(
        new RequestValidationError(`Field ${requiredField} is required.`)
      );
      expect(httpResponse.data).toBeUndefined();
    }
  );
});
