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

const HashComparers = {
  PasswordHashComparer: Symbol.for('PasswordHashComparer'),
};

const UseCases = {
  SignUpUseCase: Symbol.for('SignUpUseCase'),
  SignInUseCase: Symbol.for('SignInUseCase'),
};

const Facades = {
  AuthService: Symbol.for('AuthService'),
  UserRepository: Symbol.for('UserRepository'),
  ProfileRepository: Symbol.for('ProfileRepository'),
};

export const Types = {
  PrismaClient: Symbol.for('PrismaClient'),
  AuthTokenGenerator: Symbol.for('AuthTokenGenerator'),
  ...InputValidators,
  ...Hashers,
  ...HashComparers,
  ...UseCases,
  ...Repositories,
  ...Facades,
};
