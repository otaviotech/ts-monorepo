import faker from 'faker';
import * as Factory from 'factory.ts';
import { User } from '@domain/models';

export const UserFactory = Factory.Sync.makeFactory<User>({
  id: faker.datatype.number(),
  email: faker.internet.email(),
  password: faker.internet.password(6),
});
