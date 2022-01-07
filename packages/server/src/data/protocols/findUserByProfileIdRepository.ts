import { User } from '@domain/models';

export interface FindUserByProfileIdRepository {
  findByProfileId(profileId: number): Promise<User | undefined>;
}
