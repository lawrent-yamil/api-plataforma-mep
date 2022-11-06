import type { Config } from './types/Config';
require('dotenv').config();

export const config: Config = {
  PORT: process.env.PORT || 9000,
}