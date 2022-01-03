import 'reflect-metadata';
import dotenv from 'dotenv';

import { Container } from 'inversify';
import { PasswordHasher } from '@data/protocols/passwordHasher';
import { SignUpInputValidator } from '@presentation/validators/signUp';
import { CreateUserWithProfileRepository } from '@data/protocols';
import prismaClient from '@infra/db/postgres/prisma/client';
import { BcryptAdapter } from '@infra/passwordHasher/bcryptAdapter';
import { PrismaCreateUserWithProfileRepository } from '@infra/db/postgres/prisma/repositories/user/createUserWithProfile';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const container = new Container();

const Types = {
  PasswordHasher: Symbol.for('PasswordHasher'),
  SignUpInputValidator: Symbol.for('SignUpInputValidator'),
  CreateUserWithProfileRepository: Symbol.for(
    'CreateUserWithProfileRepository'
  ),
  PrismaClient: Symbol.for('PrismaClient'),
};

container.bind<PrismaClient>(Types.PrismaClient).toConstantValue(prismaClient);

container.bind<PasswordHasher>(Types.PasswordHasher).to(BcryptAdapter);
container
  .bind<SignUpInputValidator>(Types.SignUpInputValidator)
  .to(SignUpInputValidator);

container
  .bind<CreateUserWithProfileRepository>(Types.CreateUserWithProfileRepository)
  .to(PrismaCreateUserWithProfileRepository);
