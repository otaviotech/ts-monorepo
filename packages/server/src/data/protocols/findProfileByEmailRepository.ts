import { Profile } from '../../domain/models/profile';

export interface FindProfileByEmailRepository {
  find(email: string): Promise<Profile>;
}
