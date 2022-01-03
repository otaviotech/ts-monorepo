import * as yup from 'yup';
import { injectable } from 'inversify';

import {
  InputValidator,
  InputValidationResult,
} from '@presentation/protocols/inputValidator';
import { SignUpInput } from '@presentation/controllers/signup';
import { RequestValidationError } from '@presentation/errors/validation';

@injectable()
export class SignUpInputValidator implements InputValidator<SignUpInput> {
  async validate(input: SignUpInput): Promise<InputValidationResult> {
    const result: InputValidationResult = {
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
