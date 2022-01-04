import { Container } from 'inversify';
import { bindControllers } from './controllers';
import { bindInputValidators } from './validators';

export const bindPresentationLayer = (container: Container) => {
  bindInputValidators(container);
  bindControllers(container);
};
