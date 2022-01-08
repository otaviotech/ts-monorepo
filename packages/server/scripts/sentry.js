/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */
const shell = require('shelljs');
const pkg = require('../package.json');
const tsConfig = require('../tsconfig.json');
const { handleShellOutput } = require('./utils');

async function generateRelease() {
  console.log(`Generating Sentry release: ${pkg.version}.`);
  const cmd = `sentry-cli releases new "${pkg.version}"`;
  handleShellOutput(shell.exec(cmd));
}

async function uploadSourceMaps() {
  console.log(`Uploading source maps to Sentry.`);
  const cmd = `sentry-cli releases files "${pkg.version}" upload-sourcemaps ${tsConfig.compilerOptions.outDir}`;
  handleShellOutput(shell.exec(cmd));
}

async function finalizeRelease() {
  console.log(`Finalizing Sentry release ${pkg.verson}.`);
  const cmd = `sentry-cli releases finalize "${pkg.version}"`;
  handleShellOutput(shell.exec(cmd));
}

async function run() {
  await generateRelease();
  await uploadSourceMaps();
  await finalizeRelease();
}

run()
  .then(() => {
    console.log('Finished.');
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
