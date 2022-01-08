/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */
const shell = require('shelljs');
const path = require('path');
const { handleShellOutput } = require('./utils');
const tsConfig = require('../tsconfig.json');

const { outDir } = tsConfig.compilerOptions;

const isDev = process.env.NODE_ENV !== 'production';

async function cleanOutDir() {
  console.log('Cleaning outDir...');

  const outDirPath = path.resolve(__dirname, '../', outDir);

  shell.rm('-r', outDirPath);
}

async function compileTS() {
  console.log('Compiling TypeScript...');
  handleShellOutput(shell.exec('npm run build:ts'));
}

async function compileApiDocs() {
  console.log('Compiling API Docs...');
  handleShellOutput(shell.exec('npm run build:docs'));
}

async function copyEnvFile() {
  console.log('Copying .env file...');

  const source = path.resolve(__dirname, '../.env');
  const dest = path.resolve(__dirname, '../build/.env');

  const exists = shell.test('-e', dest);

  if (exists) {
    handleShellOutput(shell.cp(source, dest));
  }
}

async function removeUnnecessaryOutput() {
  console.log('Removing unnecessary output');
  const testsOutputDir = path.resolve(__dirname, '../', outDir, 'test');

  const exists = shell.test('-e', testsOutputDir);

  if (exists) {
    handleShellOutput(shell.rm('-r', testsOutputDir));
  }
}

async function build() {
  await cleanOutDir();
  await compileTS();
  await compileApiDocs();
  await removeUnnecessaryOutput();

  if (isDev) {
    await copyEnvFile();
  }
}

build()
  .then(() => {
    console.log('Finished!');
    process.exit(0);
  })
  .catch(console.error);
