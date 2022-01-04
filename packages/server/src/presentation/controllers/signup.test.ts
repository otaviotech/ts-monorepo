import { omit } from '@test/utils';

// Presentation
import { RequestValidationError } from '@presentation/errors/validation';
import { SignUpInputValidator } from '@presentation/validators/signUp';
import { HttpRequest } from '@presentation/protocols';
import {
  SignUpController,
  SignUpInput,
} from '@presentation/controllers/signup';

// Domain
import { SignUpUseCaseInput } from '@domain/usecases/signup';

// Test
import { SignUpUseCaseStub } from '@test/stubs/data/usecases/signup';
import { EmailAlreadyTakenError } from '@domain/errors/emailAlreadyTaken';
import { UsernameAlreadyTakenError } from '@domain/errors/usernameAlreadyTaken';

describe('RegisterController', () => {
  const makeSut = () => {
    const signUpInputValidator = new SignUpInputValidator();
    const signUpUseCaseStub = new SignUpUseCaseStub();

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

  const domainErrors = [
    {
      DomainError: EmailAlreadyTakenError,
      name: EmailAlreadyTakenError.name,
    },
    {
      DomainError: UsernameAlreadyTakenError,
      name: UsernameAlreadyTakenError.name,
    },
  ];

  it.each(domainErrors)(
    'should return 400 if any domain error ($name) is thrown',
    async ({ DomainError }) => {
      const { sut, validRequest, signUpUseCaseStub } = makeSut();

      const errorThrown = new DomainError();

      jest.spyOn(signUpUseCaseStub, 'signup').mockImplementationOnce(() => {
        throw errorThrown;
      });

      const httpResponse = await sut.handle(validRequest);

      expect(httpResponse.statusCode).toBe(400);
      expect(httpResponse.error).toEqual(errorThrown);
      expect(httpResponse.data).toBeUndefined();
    }
  );

  it('should throw if error is not a RequestValidationError nor a DomainError', async () => {
    const { sut, validRequest, signUpUseCaseStub } = makeSut();

    const errorThrown = new Error('This error should not be catch');

    jest.spyOn(signUpUseCaseStub, 'signup').mockImplementationOnce(() => {
      throw errorThrown;
    });

    const promise = sut.handle(validRequest);

    expect(promise).rejects.toThrow(errorThrown);
  });

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
