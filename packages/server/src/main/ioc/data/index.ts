import { PrismaClient } from '@prisma/client';
import { Container } from 'inversify';

import { Types } from '@main/ioc/types';

import { AuthTokenGenerator } from '@data/protocols/authTokenGenerator';
import { JwtTokenGenerator } from '@infra/authTokenGenerator/jwtTokenGenerator';
import { PasswordHashComparer } from '@data/protocols/passwordHashComparer';
import { BcryptPasswordHashComparer } from '@infra/passwordHashComparer/bcryptPasswordHashComparer';
import { AuthService, AuthServiceFacade } from '@infra/facades/authService';
import {
  UserRepository,
  UserRepositoryFacade,
} from '@infra/facades/userRepository';
import {
  ProfileRepository,
  ProfileRepositoryFacade,
} from '@infra/facades/profileRepository';
import { AppEnv } from '@main/env';
import { bindDataRepositories } from './repositories';

import { bindUseCases } from './usecases';
import { bindHashers } from './hashers';

export const bindDataLayer = (container: Container) => {
  bindDataRepositories(container);
  bindUseCases(container);
  bindHashers(container);

  container
    .bind<AuthTokenGenerator>(Types.AuthTokenGenerator)
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    .toConstantValue(new JwtTokenGenerator(AppEnv.AUTH_SECRET!));

  container
    .bind<PasswordHashComparer>(Types.PasswordHashComparer)
    .to(BcryptPasswordHashComparer);

  container.bind<AuthService>(Types.AuthService).to(AuthServiceFacade);
  container.bind<UserRepository>(Types.UserRepository).to(UserRepositoryFacade);
  container
    .bind<ProfileRepository>(Types.ProfileRepository)
    .to(ProfileRepositoryFacade);

  container
    .bind<PrismaClient>(Types.PrismaClient)
    .toDynamicValue(() => new PrismaClient());
};
