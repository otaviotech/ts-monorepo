import { Container } from 'inversify';
import { bindProfileRepositories } from './profile';
import { bindUserRepositories } from './user';

export const bindDataRepositories = (container: Container) => {
  bindProfileRepositories(container);
  bindUserRepositories(container);
};
