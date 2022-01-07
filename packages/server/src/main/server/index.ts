import 'reflect-metadata';
import dotenv from 'dotenv';
import app from './app';
import { appLogger } from './middlewares/logger';

dotenv.config();

process.on('uncaughtException', (err) => {
  appLogger.error(err);
  process.exit(1);
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening at port: ${process.env.PORT}`);
});
