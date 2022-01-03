import { FindProfileByUsernameRepository } from '@data/protocols';
import { Profile } from '@domain/models';
import { PrismaClient } from '@prisma/client';

export class PrismaFindProfileByUsername
  implements FindProfileByUsernameRepository
{
  constructor(private readonly prisma: PrismaClient) {}

  async find(username: string): Promise<Profile | undefined> {
    const prismaProfile = await this.prisma.profile.findFirst({
      where: { username },
    });

    if (!prismaProfile) {
      return undefined;
    }

    return prismaProfile as Profile;
  }
}
