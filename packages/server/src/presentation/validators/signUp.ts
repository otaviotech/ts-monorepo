import * as yup from 'yup';
import {
  InputValidator,
  InputValidationResult,
} from '../protocols/inputValidator';
import { SignUpInput } from '../controllers/signup';
import { RequestValidationError } from '../errors/validation';

export class SignUpInputValidator implements InputValidator<SignUpInput> {
  async validate(input: SignUpInput): Promise<InputValidationResult> {
    const result = {
      isValid: true,
      errors: [],
    };

    const schema: yup.SchemaOf<SignUpInput> = yup.object({
      email: yup
        .string()
        .email('Field email must be a valid email')
        .required('Field email is required'),
      username: yup.string().required('Field username is required'),
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
