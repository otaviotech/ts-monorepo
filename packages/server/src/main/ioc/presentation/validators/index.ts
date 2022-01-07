import { Container } from 'inversify';
import { SignUpInputValidator } from '@presentation/validators/signUp';
import { Types } from '@main/ioc/types';
import { SignInInputValidator } from '@presentation/validators/signIn';

export const bindInputValidators = (container: Container) => {
  container
    .bind<SignUpInputValidator>(Types.SignUpInputValidator)
    .to(SignUpInputValidator);

  container
    .bind<SignInInputValidator>(Types.SignInInputValidator)
    .to(SignInInputValidator);
};
