import * as yup from 'yup';
import { SignInInput } from '@presentation/controllers/signin';
import { InputValidationResult, InputValidator } from '@presentation/protocols';
import { RequestValidationError } from '@presentation/errors/validation';
import { injectable } from 'inversify';

@injectable()
export class SignInInputValidator implements InputValidator<SignInInput> {
  async validate(input: SignInInput): Promise<InputValidationResult> {
    const result: InputValidationResult = {
      isValid: true,
      errors: [],
    };

    const schema: yup.SchemaOf<SignInInput> = yup.object({
      identifier: yup.string().required('Field identifier is required'),
      password: yup.string().required('Field password is required'),
    });

    try {
      await schema.validate(input);
    } catch (error) {
      const parsedErrors = error.errors.map(
        (e: yup.ValidationError) => new RequestValidationError(e)
      );

      result.errors.push(...parsedErrors);
      result.isValid = false;
    }

    return result;
  }
}
