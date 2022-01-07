import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';

// Data
import { FindProfileByEmailRepository } from '@data/protocols';

// Domain
import { Profile } from '@domain/models';
import { Types } from '@main/ioc/types';

@injectable()
export class PrismaFindProfileByEmailRepository
  implements FindProfileByEmailRepository
{
  constructor(
    @inject(Types.PrismaClient) private readonly prisma: PrismaClient
  ) {}

  async findByEmail(email: string): Promise<Profile | undefined> {
    const prismaProfile = await this.prisma.profile.findFirst({
      where: { email },
    });

    if (!prismaProfile) {
      return undefined;
    }

    return prismaProfile as Profile;
  }
}
