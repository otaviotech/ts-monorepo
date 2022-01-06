import { omit } from '@test/utils';
import { RequestValidationError } from '@presentation/errors/validation';
import { SignInInput } from '@presentation/controllers/signin';
import { SignInInputValidator } from './signIn';

describe('SignInRequestValidator', () => {
  const makeSut = () => {
    const sut = new SignInInputValidator();

    const validInput: SignInInput = {
      identifier: 'johndoe@email.com',
      password: 'abc123',
    };

    return {
      sut,
      validInput,
    };
  };

  describe('Should validate all fields', () => {
    const requiredFields = ['identifier', 'password'];

    it.each(requiredFields)(
      'should invalidate if no %s is provided',
      async (requiredField) => {
        const { sut, validInput } = makeSut();

        const input: SignInInput = omit(validInput, requiredField);

        const result = await sut.validate(input);

        expect(result.isValid).toBe(false);
        expect(result.errors).toEqual([
          new RequestValidationError(`Field ${requiredField} is required`),
        ]);
      }
    );
  });
});
