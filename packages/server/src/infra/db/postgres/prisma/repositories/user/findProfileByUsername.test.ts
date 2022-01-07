import { Profile as PrismaProfile } from '@prisma/client';
import { createMockContext } from '@test/mocks/prismaContext';
import { PrismaFindProfileByUsername } from './findProfileByUsername';

describe('PrismaProfileByUsernameRepository', () => {
  const makeSut = () => {
    const prismaContext = createMockContext();
    const sut = new PrismaFindProfileByUsername(prismaContext.prisma);
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
      .spyOn(prismaContext.prisma.profile, 'findFirst')
      .mockResolvedValueOnce({ id: 1 } as PrismaProfile);

    const result = await sut.findByUsername(validInput);

    expect(result?.id).toBe(1);
  });

  it('should return undefined profile is not found', async () => {
    const { sut, prismaContext, validInput } = makeSut();

    jest
      .spyOn(prismaContext.prisma.profile, 'findFirst')
      .mockResolvedValueOnce(null);

    const result = await sut.findByUsername(validInput);

    expect(result).toBeUndefined();
  });
});
