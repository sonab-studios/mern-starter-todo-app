import * as env from 'dotenv';
env.config();

const { DB_CONNECTION_URL, DB_SERVICE_NAME, DB_USER, DB_PASSWORD, LOG_LEVEL } =
    process.env;

const dbUri = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_CONNECTION_URL}/${DB_SERVICE_NAME}`;
const logLevel = LOG_LEVEL ?? 'info';

export { dbUri, logLevel };
