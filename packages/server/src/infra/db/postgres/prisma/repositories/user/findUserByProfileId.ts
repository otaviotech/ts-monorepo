import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';

// Data
import { FindUserByProfileIdRepository } from '@data/protocols/findUserByProfileIdRepository';

// Domain
import { User } from '@domain/models';
import { Types } from '@main/ioc/types';

@injectable()
export class PrismaFindUserByProfileIdRepository
  implements FindUserByProfileIdRepository
{
  constructor(
    @inject(Types.PrismaClient) private readonly prisma: PrismaClient
  ) {}

  async find(id: number): Promise<User | undefined> {
    const prismaUser = await this.prisma.user.findFirst({
      where: { id },
    });

    if (!prismaUser) {
      return undefined;
    }

    return prismaUser as User;
  }
}
