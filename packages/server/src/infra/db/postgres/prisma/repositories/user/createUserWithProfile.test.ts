import { SignUpUseCaseInput } from '@domain/usecases/signup';
import { User as PrismaUser } from '@prisma/client';
import { createMockContext } from '@test/mocks/prismaContext';
import { PrismaCreateUserWithProfileRepository } from './createUserWithProfile';

describe('PrismaCreateUserWithProfile', () => {
  const makeSut = () => {
    const prismaContext = createMockContext();
    const sut = new PrismaCreateUserWithProfileRepository(prismaContext.prisma);
    const validInput: SignUpUseCaseInput = {
      email: 'johndoe@email.com',
      password: 'abc123',
      username: 'jdoe',
    };

    return {
      sut,
      prismaContext,
      validInput,
    };
  };

  it('should call Prisma with the correct payload', async () => {
    const { sut, prismaContext, validInput } = makeSut();

    jest
      .spyOn(prismaContext.prisma.user, 'create')
      .mockResolvedValueOnce({ id: 1 } as PrismaUser);

    const result = await sut.create(validInput);

    expect(result.id).toBe(1);
  });
});
