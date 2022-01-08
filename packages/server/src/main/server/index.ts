import '../../../root';
import 'reflect-metadata';
import { AppEnv } from '@main/env';
import app from './app';
import { appLogger } from './middlewares/logger';

process.on('uncaughtException', (err) => {
  appLogger.error(err);
  process.exit(1);
});

app.listen(AppEnv.PORT, () => {
  // eslint-disable-next-line no-console
  appLogger.info(`Server listening at port: ${AppEnv.PORT}`);
});
