import dotenv from 'dotenv';
import { Container } from 'inversify';

import { bindDataLayer } from './data';
import { bindPresentationLayer } from './presentation';

dotenv.config();

export const container = new Container();

bindDataLayer(container);
bindPresentationLayer(container);
