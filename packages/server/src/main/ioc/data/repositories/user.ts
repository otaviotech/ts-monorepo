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
import { FindUserByProfileIdRepository } from '@data/protocols/findUserByProfileIdRepository';
import { PrismaFindUserByProfileIdRepository } from '@infra/db/postgres/prisma/repositories/user/findUserByProfileId';

export const bindUserRepositories = (container: Container) => {
  container
    .bind<FindUserByEmailRepository>(Types.FindUserByEmailRepository)
    .to(PrismaFindUserByEmailRepository);

  container
    .bind<CreateUserWithProfileRepository>(
      Types.CreateUserWithProfileRepository
    )
    .to(PrismaCreateUserWithProfileRepository);

  container
    .bind<FindUserByProfileIdRepository>(Types.FindUserByProfileIdRepository)
    .to(PrismaFindUserByProfileIdRepository);
};
