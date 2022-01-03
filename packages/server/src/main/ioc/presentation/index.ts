import { Container } from 'inversify';
import { bindInputValidators } from './validators';

export const bindPresentationLayer = (container: Container) => {
  bindInputValidators(container);
};
