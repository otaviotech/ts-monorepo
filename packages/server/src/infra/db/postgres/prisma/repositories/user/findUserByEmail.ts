import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';

// Data
import { FindUserByEmailRepository } from '@data/protocols';

// Domain
import { User } from '@domain/models';
import { Types } from '@main/ioc/types';

@injectable()
export class PrismaFindUserByEmailRepository
  implements FindUserByEmailRepository
{
  constructor(
    @inject(Types.PrismaClient) private readonly prisma: PrismaClient
  ) {}

  async find(email: string): Promise<User | undefined> {
    const prismaUser = await this.prisma.user.findFirst({
      where: { email },
    });

    if (!prismaUser) {
      return undefined;
    }

    return prismaUser as User;
  }
}
