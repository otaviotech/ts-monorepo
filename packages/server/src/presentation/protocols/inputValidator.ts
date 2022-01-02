export interface InputValidationResult {
  isValid: boolean;
  errors: Error[];
}

export interface InputValidator<T> {
  validate(input: T): Promise<InputValidationResult>;
}
