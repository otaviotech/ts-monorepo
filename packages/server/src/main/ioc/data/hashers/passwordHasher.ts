import { Container } from 'inversify';

import { PasswordHasher } from '@data/protocols';

import { BcryptAdapter } from '@infra/passwordHasher/bcryptAdapter';

import { Types } from '@main/ioc/types';

export const bindPasswordHasher = (container: Container) => {
  container.bind<PasswordHasher>(Types.PasswordHasher).to(BcryptAdapter);
};
