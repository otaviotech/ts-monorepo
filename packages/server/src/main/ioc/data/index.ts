import { PrismaClient } from '@prisma/client';
import { Container } from 'inversify';

import { Types } from '@main/ioc/types';

import { bindDataRepositories } from './repositories';
import { bindUseCases } from './usecases';
import { bindHashers } from './hashers';

export const bindDataLayer = (container: Container) => {
  bindDataRepositories(container);
  bindUseCases(container);
  bindHashers(container);

  container
    .bind<PrismaClient>(Types.PrismaClient)
    .toDynamicValue(() => new PrismaClient());
};
