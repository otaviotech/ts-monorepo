import 'reflect-metadata';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import { Container } from 'inversify';

// Main
import { Types } from '@main/ioc/types';

// Presentation
import { SignUpInputValidator } from '@presentation/validators/signUp';

// Domain
import { SignUp } from '@domain/usecases/signup';

// Data
import { SignUpUseCase } from '@data/usecases/signup';
import { PasswordHasher } from '@data/protocols/passwordHasher';
import {
  CreateUserWithProfileRepository,
  FindProfileByEmailRepository,
  FindProfileByUsernameRepository,
  FindUserByEmailRepository,
} from '@data/protocols';

// Infra
import { BcryptAdapter } from '@infra/passwordHasher/bcryptAdapter';
import {
  PrismaFindProfileByUsername,
  PrismaFindUserByEmailRepository,
  PrismaFindProfileByEmailRepository,
  PrismaCreateUserWithProfileRepository,
} from '@infra/db/postgres/prisma/repositories';

dotenv.config();

export const container = new Container();

container
  .bind<PrismaClient>(Types.PrismaClient)
  .toDynamicValue(() => new PrismaClient());

container.bind<PasswordHasher>(Types.PasswordHasher).to(BcryptAdapter);

container
  .bind<SignUpInputValidator>(Types.SignUpInputValidator)
  .to(SignUpInputValidator);

container
  .bind<FindProfileByUsernameRepository>(Types.FindProfileByUsernameRepository)
  .to(PrismaFindProfileByUsername);

container
  .bind<FindUserByEmailRepository>(Types.FindUserByEmailRepository)
  .to(PrismaFindUserByEmailRepository);

container
  .bind<FindProfileByEmailRepository>(Types.FindProfileByEmailRepository)
  .to(PrismaFindProfileByEmailRepository);

container
  .bind<CreateUserWithProfileRepository>(Types.CreateUserWithProfileRepository)
  .to(PrismaCreateUserWithProfileRepository);

container.bind<SignUp>(Types.SignUpUseCase).to(SignUpUseCase);
