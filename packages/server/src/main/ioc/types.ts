export const Repositories = {
  CreateUserWithProfileRepository: Symbol.for(
    'CreateUserWithProfileRepository'
  ),
  FindUserByEmailRepository: Symbol.for('FindUserByEmailRepository'),
  FindProfileByEmailRepository: Symbol.for('FindProfileByEmailRepository'),
  FindProfileByUsernameRepository: Symbol.for(
    'FindProfileByUsernameRepository'
  ),
  FindUserByProfileIdRepository: Symbol.for('FindUserByProfileId'),
};

const InputValidators = {
  SignUpInputValidator: Symbol.for('SignUpInputValidator'),
  SignInInputValidator: Symbol.for('SignInInputValidator'),
};

const Hashers = {
  PasswordHasher: Symbol.for('PasswordHasher'),
};

const UseCases = {
  SignUpUseCase: Symbol.for('SignUpUseCase'),
  SignInUseCase: Symbol.for('SignInUseCase'),
};

export const Types = {
  PrismaClient: Symbol.for('PrismaClient'),
  AuthTokenGenerator: Symbol.for('AuthTokenGenerator'),
  PasswordHashComparer: Symbol.for('PasswordHashComparer'),
  ...Repositories,
  ...InputValidators,
  ...Hashers,
  ...UseCases,
};
