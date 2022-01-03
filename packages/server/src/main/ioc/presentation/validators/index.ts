import { Container } from 'inversify';
import { SignUpInputValidator } from '@presentation/validators/signUp';
import { Types } from '@main/ioc/types';

export const bindInputValidators = (container: Container) => {
  container
    .bind<SignUpInputValidator>(Types.SignUpInputValidator)
    .to(SignUpInputValidator);
};
