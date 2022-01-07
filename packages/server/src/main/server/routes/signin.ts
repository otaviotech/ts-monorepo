import { adapt } from '@main/server/adapters/expressRoute';
import { container } from '@main/ioc/container';
import { SignInController } from '@presentation/controllers/signin';
import { Router } from 'express';

const router = Router();

router.post('/', adapt(container.get(SignInController)));

export default {
  prefix: '/signin',
  router,
};
