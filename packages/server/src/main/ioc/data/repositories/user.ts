import { Container } from 'inversify';

import {
  CreateUserWithProfileRepository,
  FindUserByEmailRepository,
} from '@data/protocols';

import {
  PrismaCreateUserWithProfileRepository,
  PrismaFindUserByEmailRepository,
} from '@infra/db/postgres/prisma/repositories';

import { Types } from '@main/ioc/types';

export const bindUserRepositories = (container: Container) => {
  container
    .bind<FindUserByEmailRepository>(Types.FindUserByEmailRepository)
    .to(PrismaFindUserByEmailRepository);

  container
    .bind<CreateUserWithProfileRepository>(
      Types.CreateUserWithProfileRepository
    )
    .to(PrismaCreateUserWithProfileRepository);
};
