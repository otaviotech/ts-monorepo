import { Container } from 'inversify';

import { bindDataLayer } from './data';
import { bindPresentationLayer } from './presentation';

export const container = new Container();

bindDataLayer(container);
bindPresentationLayer(container);
