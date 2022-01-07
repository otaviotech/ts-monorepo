import { Container } from 'inversify';

import { SignUpController } from '@presentation/controllers/signup';
import { SignInController } from '@presentation/controllers/signin';

export const bindControllers = (container: Container) => {
  container.bind<SignUpController>(SignUpController).toSelf();
  container.bind<SignInController>(SignInController).toSelf();
};
