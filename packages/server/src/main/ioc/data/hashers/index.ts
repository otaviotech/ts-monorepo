import { Container } from 'inversify';
import { bindPasswordHasher } from './passwordHasher';

export const bindHashers = (container: Container) => {
  bindPasswordHasher(container);
};
