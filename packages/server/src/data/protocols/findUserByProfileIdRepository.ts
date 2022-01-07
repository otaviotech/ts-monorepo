import { User } from '@domain/models';

export interface FindUserByProfileIdRepository {
  find(profileId: number): Promise<User | undefined>;
}
