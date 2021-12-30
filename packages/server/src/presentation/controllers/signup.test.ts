import { SignUpController, SignUpInput } from './signup';
import { RequestValidationError } from '../errors/validation';
import { omit } from '../../../test/utils';
import { SignUpInputValidator } from '../validators/signUp';
import { HttpRequest } from '../protocols/http';

describe('RegisterController', () => {
  const makeSut = () => {
    const signUpInputValidator = new SignUpInputValidator();
    const sut = new SignUpController(signUpInputValidator);
    const validRequest: HttpRequest = {
      body: {
        email: 'johndoe@email.com',
        username: 'jdoe',
        password: 'abc123',
      } as SignUpInput,
    };

    return {
      sut,
      validRequest,
    };
  };

  const requiredFields = ['email', 'username', 'password'];

  it.each(requiredFields)(
    'should return 400 if no %s is provided',
    async (requiredField) => {
      const { sut, validRequest } = makeSut();

      const req = {
        body: omit(validRequest.body, requiredField) as SignUpInput,
      };

      const httpResponse = await sut.handle(req);

      expect(httpResponse.statusCode).toBe(400);
      expect(httpResponse.error).toEqual(
        new RequestValidationError(`Field ${requiredField} is required`)
      );
      expect(httpResponse.data).toBeUndefined();
    }
  );
});
