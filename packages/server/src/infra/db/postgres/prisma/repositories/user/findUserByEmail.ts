import { FindUserByEmailRepository } from '@data/protocols';
import { User } from '@domain/models';
import { PrismaClient } from '@prisma/client';

export class PrismaFindUserByEmailRepository
  implements FindUserByEmailRepository
{
  constructor(private readonly prisma: PrismaClient) {}

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
