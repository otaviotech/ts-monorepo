import { adapt } from '@main/server/adapters/expressRoute';
import { container } from '@main/ioc/container';
import { SignUpController } from '@presentation/controllers/signup';
import { Router } from 'express';

const router = Router();

router.post('/', adapt(container.get(SignUpController)));

export default {
  prefix: '/signup',
  router,
};
