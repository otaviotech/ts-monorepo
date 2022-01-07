import { User } from '../../domain/models/user';
import { SignUpUseCaseInput } from '../../domain/usecases/signup';

export interface CreateUserWithProfileRepository {
  createWithProfile(input: SignUpUseCaseInput): Promise<User>;
}
