"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = exports.config = void 0;
const pg_1 = require("pg");
require('dotenv').config();
exports.config = {
    PORT: process.env.PORT || 9000,
};
exports.pool = new pg_1.Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});
