import * as env from 'dotenv';
env.config();

const {
    AUTH_SECRET_KEY,
    DB_CONNECTION_URL,
    DB_NAME,
    DB_USER,
    DB_PASSWORD,
    LOG_LEVEL,
    PORT,
    NODE_ENV,
} = process.env;

const nodeEnv = NODE_ENV ?? 'dev';
const authSecretKey = AUTH_SECRET_KEY ?? 'secret';
const dbUri = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_CONNECTION_URL}/${DB_NAME}`;
const logLevel = LOG_LEVEL ?? 'info';
const port = PORT ?? '8080';

export { authSecretKey, dbUri, nodeEnv, logLevel, port };
