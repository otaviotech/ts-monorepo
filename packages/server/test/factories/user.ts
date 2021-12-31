import faker from 'faker';
import * as Factory from 'factory.ts';
import { User } from '@domain/models/user';

export const UserFactory = Factory.Sync.makeFactory<User>({
  id: faker.datatype.number(),
  email: faker.internet.email(),
  name: faker.name.findName(),
  password: faker.internet.password(6),
});
