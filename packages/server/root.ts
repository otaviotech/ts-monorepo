/* eslint-disable */

// This is necessary for Sentry.
// See: https://docs.sentry.io/platforms/node/typescript

// @ts-ignore
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface Global {
      __rootdir__: string;
    }
  }
}

global.__rootdir__ = __dirname || process.cwd();
