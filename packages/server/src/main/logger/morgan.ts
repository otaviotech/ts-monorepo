import morgan, { StreamOptions } from 'morgan';
import { winstonLogger } from './winston';

const stream: StreamOptions = {
  write: (message) => winstonLogger.http(message),
};

export const morganLogger = morgan('combined', { stream });
