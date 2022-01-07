import { Container } from 'inversify';

import { SignInUseCase } from '@data/usecases/signin';

import { SignIn } from '@domain/usecases/signin';

import { Types } from '@main/ioc/types';

export const bindSignInUseCase = (container: Container) => {
  container.bind<SignIn>(Types.SignInUseCase).to(SignInUseCase);
};
