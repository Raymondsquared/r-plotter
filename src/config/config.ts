import { config as dotEnvConfig } from 'dotenv';

import { Config } from './types/config';

let path;
switch (process.env.NODE_ENV) {
  case 'production':
    path = `${__dirname}/../../.env.production`;
    break;
  case 'staging':
    path = `${__dirname}/../../.env.staging`;
    break;
  case 'development':
    path = `${__dirname}/../../.env.development`;
    break;
  case 'local':
  default:
    path = `${__dirname}/../../.env.local`;
}
dotEnvConfig({ path: path });

const config: Config = {
  apiPort: parseInt(process.env.API_PORT) || 10000,
  workerPort: parseInt(process.env.WORKER_PORT) || 10010,
  url:
    process.env.URL || 'https://en.wikipedia.org/wiki/Women%27s_high_jump_world_record_progression',
};

export default config;
