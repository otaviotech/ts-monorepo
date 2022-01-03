import { Container } from 'inversify';

import { bindSignUpUseCase } from './signup';

export const bindUseCases = (container: Container) => {
  bindSignUpUseCase(container);
};
