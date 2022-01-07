import { inject, injectable } from 'inversify';
import { PrismaClient } from '@prisma/client';

// Data
import { FindProfileByUsernameRepository } from '@data/protocols';

// Domain
import { Profile } from '@domain/models';
import { Types } from '@main/ioc/types';

@injectable()
export class PrismaFindProfileByUsername
  implements FindProfileByUsernameRepository
{
  constructor(
    @inject(Types.PrismaClient) private readonly prisma: PrismaClient
  ) {}

  async findByUsername(username: string): Promise<Profile | undefined> {
    const prismaProfile = await this.prisma.profile.findFirst({
      where: { username },
    });

    if (!prismaProfile) {
      return undefined;
    }

    return prismaProfile as Profile;
  }
}
