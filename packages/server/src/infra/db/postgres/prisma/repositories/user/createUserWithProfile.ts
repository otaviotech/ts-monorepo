import { PrismaClient, Prisma } from '@prisma/client';
import { inject, injectable } from 'inversify';

// Data
import { CreateUserWithProfileRepository } from '@data/protocols';

// Domain
import { User } from '@domain/models';
import { SignUpUseCaseInput } from '@domain/usecases/signup';
import { Types } from '@main/ioc/types';

@injectable()
export class PrismaCreateUserWithProfileRepository
  implements CreateUserWithProfileRepository
{
  constructor(
    @inject(Types.PrismaClient) private readonly prismaClient: PrismaClient
  ) {}

  async create(input: SignUpUseCaseInput): Promise<User> {
    const payload: Prisma.UserCreateInput = {
      email: input.email,
      password: input.password,
      profiles: {
        create: [{ username: input.username, email: input.email }],
      },
    };

    const u = await this.prismaClient.user.create({
      data: payload,
    });

    return { id: u.id } as User;
  }
}
