import faker from 'faker';
import * as Factory from 'factory.ts';
import { Profile } from '../../src/domain/models/profile';

export const ProfileFactory = Factory.Sync.makeFactory<Profile>({
  id: faker.datatype.number(),
  userId: faker.datatype.number(),
  username: [
    faker.name.firstName().toLowerCase(),
    faker.name.lastName().toLowerCase(),
  ].join('_'),
  email: faker.internet.email(),
  name: faker.name.findName(),
  bio: faker.lorem.paragraph(2),
  phone: faker.phone.phoneNumber(),
  site: faker.internet.url(),
});
