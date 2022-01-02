import { Profile } from '../../domain/models/profile';

export interface FindProfileByUsernameRepository {
  find(username: string): Promise<Profile | undefined>;
}
