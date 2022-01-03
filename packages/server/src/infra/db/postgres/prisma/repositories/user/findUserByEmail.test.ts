import { User as PrismaUser } from '@prisma/client';
import { createMockContext } from '@test/mocks/prismaContext';
import { PrismaFindUserByEmailRepository } from './findUserByEmail';

describe('PrismaUserByEmailRepository', () => {
  const makeSut = () => {
    const prismaContext = createMockContext();
    const sut = new PrismaFindUserByEmailRepository(prismaContext.prisma);
    const validInput = 'johndoe@email.com';

    return {
      sut,
      prismaContext,
      validInput,
    };
  };

  it('should call Prisma with the correct payload', async () => {
    const { sut, prismaContext, validInput } = makeSut();

    jest
      .spyOn(prismaContext.prisma.user, 'findFirst')
      .mockResolvedValueOnce({ id: 1 } as PrismaUser);

    const result = await sut.find(validInput);

    expect(result?.id).toBe(1);
  });

  it('should return undefined profile is not found', async () => {
    const { sut, prismaContext, validInput } = makeSut();

    jest
      .spyOn(prismaContext.prisma.user, 'findFirst')
      .mockResolvedValueOnce(null);

    const result = await sut.find(validInput);

    expect(result).toBeUndefined();
  });
});
