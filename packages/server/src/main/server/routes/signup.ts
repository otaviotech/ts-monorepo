import { Router } from 'express';

const router = Router();

router.post('/', (req, res) => res.sendStatus(400));

export default {
  prefix: '/signup',
  router,
};
