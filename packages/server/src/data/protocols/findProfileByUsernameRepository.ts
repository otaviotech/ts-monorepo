import { Profile } from '../../domain/models/profile';

export interface FindProfileByUsernameRepository {
  findByUsername(username: string): Promise<Profile | undefined>;
}
