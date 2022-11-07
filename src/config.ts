import type { Config } from './types/Config';
import { Pool } from 'pg';
require('dotenv').config();

export const config: Config = {
  PORT: process.env.PORT || 9000,
}

export const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: <number | undefined>process.env.DB_PORT
});