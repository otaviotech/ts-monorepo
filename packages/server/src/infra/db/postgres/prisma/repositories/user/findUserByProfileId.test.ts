import { User as PrismaUser } from '@prisma/client';
import { createMockContext } from '@test/mocks/prismaContext';
import { PrismaFindUserByProfileIdRepository } from './findUserByProfileId';

describe('PrismaFindUserByProfileIdRepository', () => {
  const makeSut = () => {
    const prismaContext = createMockContext();
    const sut = new PrismaFindUserByProfileIdRepository(prismaContext.prisma);
    const validInput = 1;

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

    const result = await sut.findByProfileId(validInput);

    expect(result?.id).toBe(1);
  });

  it('should return undefined profile is not found', async () => {
    const { sut, prismaContext, validInput } = makeSut();

    jest
      .spyOn(prismaContext.prisma.user, 'findFirst')
      .mockResolvedValueOnce(null);

    const result = await sut.findByProfileId(validInput);

    expect(result).toBeUndefined();
  });
});
