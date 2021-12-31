import { omit } from '@test/utils';
import { RequestValidationError } from '@presentation/errors/validation';
import { SignUpInput } from '@presentation/controllers/signup';
import { SignUpInputValidator } from './signUp';

describe('SignUpRequestValidator', () => {
  const makeSut = () => {
    const sut = new SignUpInputValidator();

    const validInput: SignUpInput = {
      email: 'johndoe@email.com',
      username: 'jdoe',
      password: 'abc123',
    };

    return {
      sut,
      validInput,
    };
  };

  describe('Should validate all fields', () => {
    const requiredFields = ['email', 'username', 'password'];

    it.each(requiredFields)(
      'should invalidate if no %s is provided',
      async (requiredField) => {
        const { sut, validInput } = makeSut();

        const input: SignUpInput = omit(validInput, requiredField);

        const result = await sut.validate(input);

        expect(result.isValid).toBe(false);
        expect(result.errors).toEqual([
          new RequestValidationError(`Field ${requiredField} is required`),
        ]);
      }
    );

    it('should invalidate an invalid email is provided', async () => {
      const { sut, validInput } = makeSut();

      const input: SignUpInput = { ...validInput, email: 'foobar.com' };

      const result = await sut.validate(input);

      expect(result.isValid).toBe(false);
      expect(result.errors).toEqual([
        new RequestValidationError('Field email must be a valid email'),
      ]);
    });
  });
});
