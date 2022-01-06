/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */
const shell = require('shelljs');
const path = require('path');
const tsConfig = require('../tsconfig.json');

const isDev = process.env.NODE_ENV !== 'production';

async function cleanOutDir() {
  console.log('Cleaning outDir...');

  const { outDir } = tsConfig.compilerOptions;
  const outDirPath = path.resolve(__dirname, '../', outDir);

  shell.rm('-r', outDirPath);
}

async function compileTS() {
  console.log('Compiling TypeScript...');
  shell.exec('npm run build:ts');
}

async function compileApiDocs() {
  console.log('Compiling API Docs...');
  shell.exec('npm run build:docs');
}

async function copyEnvFile() {
  console.log('Copying .env file...');

  const source = path.resolve(__dirname, '../.env');
  const dest = path.resolve(__dirname, '../build/.env');

  shell.cp(source, dest);
}

async function build() {
  await cleanOutDir();
  await compileTS();
  await compileApiDocs();

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
