import { CreateUserWithProfileRepository } from '@data/protocols';
import { User } from '@domain/models';
import { SignUpUseCaseInput } from '@domain/usecases/signup';
import { PrismaClient, Prisma } from '@prisma/client';

export class PrismaCreateUserWithProfileRepository
  implements CreateUserWithProfileRepository
{
  constructor(private readonly prismaClient: PrismaClient) {}

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
