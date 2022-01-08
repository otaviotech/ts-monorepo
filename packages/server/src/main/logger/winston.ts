import { RewriteFrames } from '@sentry/integrations';
import winston from 'winston';
import SentryTransport from 'winston-transport-sentry-node';

import { AppEnv } from '@main/env';
import pkg from '../../../package.json';

const sentryTransports = ['warn', 'error'].map(
  (logLevel) =>
    new SentryTransport({
      sentry: {
        dsn: AppEnv.SENTRY_DSN,
        release: pkg.version,
        environment: AppEnv.NODE_ENV,
        integrations: [
          new RewriteFrames({
            root: AppEnv.PROJECT_ROOT,
          }),
        ],
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

function prodFormat() {
  const replaceError = ({ label, level, message, stack }) => ({
    label,
    level,
    message,
    stack,
  });
  const replacer = (key, value) =>
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    value instanceof Error ? replaceError(value) : value;
  return winston.format.combine(
    winston.format.errors({ stack: true, message: true }),
    winston.format.json({ replacer })
  );
}

function devFormat() {
  const formatMessage = (info) => `${info.level} ${info.message}`;
  const formatError = (info) =>
    `${info.level} ${info.message}\n\n${info.stack}\n`;
  const format = (info) =>
    info instanceof Error ? formatError(info) : formatMessage(info);
  return winston.format.combine(
    winston.format.colorize(),
    winston.format.printf(format)
  );
}

export const winstonLogger = winston.createLogger({
  level: 'debug',
  exitOnError: false,
  transports,
  format: AppEnv.NODE_ENV === 'production' ? prodFormat() : devFormat(),
});
