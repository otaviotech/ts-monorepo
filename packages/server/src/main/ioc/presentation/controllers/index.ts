import { Container } from 'inversify';

import { SignUpController } from '@presentation/controllers/signup';

export const bindControllers = (container: Container) => {
  container.bind<SignUpController>(SignUpController).toSelf();
};
