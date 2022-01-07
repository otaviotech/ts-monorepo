import winston from 'winston';
import SentryTransport from 'winston-transport-sentry-node';

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const level = () => {
  const env = process.env.NODE_ENV || 'development';
  const isDevelopment = env === 'development';
  return isDevelopment ? 'debug' : 'warn';
};

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
};

winston.addColors(colors);

const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`
  )
);

const sentryTransports = ['warn', 'error'].map(
  (logLevel) =>
    new SentryTransport({
      sentry: {
        dsn: process.env.SENTRY_DSN,
      },
      level: logLevel,
    })
);

const transports = [
  new winston.transports.Console(),
  new winston.transports.File({
    filename: 'logs/error.log',
    level: 'error',
  }),
  ...sentryTransports,
];

export const winstonLogger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports,
});
