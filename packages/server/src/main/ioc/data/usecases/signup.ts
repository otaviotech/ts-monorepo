import { Container } from 'inversify';

import { SignUpUseCase } from '@data/usecases/signup';

import { SignUp } from '@domain/usecases/signup';

import { Types } from '@main/ioc/types';

export const bindSignUpUseCase = (container: Container) => {
  container.bind<SignUp>(Types.SignUpUseCase).to(SignUpUseCase);
};
