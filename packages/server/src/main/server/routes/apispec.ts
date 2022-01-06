import path from 'path';
import { Router } from 'express';

const PROJECT_ROOT = path.resolve(__dirname, '../../../../');

const router = Router();

router.get('/', (req, res) => {
  res.sendFile('public/spec.html', { root: PROJECT_ROOT });
});

export default {
  prefix: '/spec',
  router,
};
