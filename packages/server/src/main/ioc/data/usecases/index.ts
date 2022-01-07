import { Container } from 'inversify';
import { bindSignInUseCase } from './signin';

import { bindSignUpUseCase } from './signup';

export const bindUseCases = (container: Container) => {
  bindSignUpUseCase(container);
  bindSignInUseCase(container);
};
