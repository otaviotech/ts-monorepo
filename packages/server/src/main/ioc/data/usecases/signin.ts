import { Container } from 'inversify';

import { SignIn } from '@data/usecases/signin';

import { SignInUseCase } from '@domain/usecases/signin';

import { Types } from '@main/ioc/types';

export const bindSignInUseCase = (container: Container) => {
  container.bind<SignInUseCase>(Types.SignInUseCase).to(SignIn);
};
