import { omit } from '@test/utils';

// Presentation
import { RequestValidationError } from '@presentation/errors/validation';
import { SignUpInputValidator } from '@presentation/validators/signUp';
import { HttpRequest } from '@presentation/protocols/http';
import {
  SignUpController,
  SignUpInput,
} from '@presentation/controllers/signup';

// Domain
import { SignUp, SignUpUseCaseInput } from '@domain/usecases/signup';
import { Profile } from '@domain/models/profile';

describe('RegisterController', () => {
  const makeSignUpUseCaseStub = () => {
    class SignUpUseCaseStub implements SignUp {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async signup(input: SignUpUseCaseInput): Promise<Profile> {
        return {
          id: 1,
          userId: 1,
          username: 'jdoe',
          name: 'John Doe',
          site: '',
          bio: '',
          email: 'johndoe@email.com',
          phone: '',
        };
      }
    }

    return new SignUpUseCaseStub();
  };
  const makeSut = () => {
    const signUpInputValidator = new SignUpInputValidator();
    const signUpUseCaseStub = makeSignUpUseCaseStub();

    const sut = new SignUpController(signUpInputValidator, signUpUseCaseStub);

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
      signUpUseCaseStub,
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

  it('should call the SignUp usecase if validation passes', async () => {
    const { sut, signUpUseCaseStub, validRequest } = makeSut();
    jest.spyOn(signUpUseCaseStub, 'signup');

    const httpResponse = await sut.handle(validRequest);

    expect(signUpUseCaseStub.signup).toHaveBeenCalledWith({
      ...(validRequest.body as SignUpUseCaseInput),
    });

    expect(httpResponse.statusCode).toBe(201);
  });
});
