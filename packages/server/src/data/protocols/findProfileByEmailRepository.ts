import { Profile } from '../../domain/models/profile';

export interface FindProfileByEmailRepository {
  findByEmail(email: string): Promise<Profile | undefined>;
}
