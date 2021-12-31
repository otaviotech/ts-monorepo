import { User } from '../../domain/models/user';

export interface FindUserByEmailRepository {
  find(email: string): Promise<User>;
}
