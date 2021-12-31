import faker from 'faker';
import * as Factory from 'factory.ts';
import { SignUpUseCaseInput } from '@domain/usecases/signup';

const ValidInputFactory = Factory.Sync.makeFactory<SignUpUseCaseInput>({
  email: faker.internet.email(),
  password: faker.internet.password(6),
  username: [
    faker.name.firstName().toLowerCase(),
    faker.name.lastName().toLowerCase(),
  ].join('_'),
});

const SignUpUseCaseFactory = {
  ValidInputFactory,
};

export default SignUpUseCaseFactory;
