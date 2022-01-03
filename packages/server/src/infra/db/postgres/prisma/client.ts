import { PrismaClient as _PrismaClient } from '@prisma/client';
import { injectable } from 'inversify';

@injectable()
export class PrismaClient extends _PrismaClient {}
