export const Types = {
  PasswordHasher: Symbol.for('PasswordHasher'),
  SignUpInputValidator: Symbol.for('SignUpInputValidator'),
  CreateUserWithProfileRepository: Symbol.for(
    'CreateUserWithProfileRepository'
  ),
  FindUserByEmailRepository: Symbol.for('FindUserByEmailRepository'),
  FindProfileByEmailRepository: Symbol.for('FindProfileByEmailRepository'),
  FindProfileByUsernameRepository: Symbol.for(
    'FindProfileByUsernameRepository'
  ),
  PrismaClient: Symbol.for('PrismaClient'),

  SignUpUseCase: Symbol.for('SignUpUseCase'),
};
