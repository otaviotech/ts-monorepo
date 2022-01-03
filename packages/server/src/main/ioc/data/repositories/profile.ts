import { Container } from 'inversify';

import {
  FindProfileByUsernameRepository,
  FindProfileByEmailRepository,
} from '@data/protocols';

import {
  PrismaFindProfileByUsername,
  PrismaFindProfileByEmailRepository,
} from '@infra/db/postgres/prisma/repositories';

import { Types } from '@main/ioc/types';

export const bindProfileRepositories = (container: Container) => {
  container
    .bind<FindProfileByUsernameRepository>(
      Types.FindProfileByUsernameRepository
    )
    .to(PrismaFindProfileByUsername);

  container
    .bind<FindProfileByEmailRepository>(Types.FindProfileByEmailRepository)
    .to(PrismaFindProfileByEmailRepository);
};
