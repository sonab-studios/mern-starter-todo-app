import * as winston from 'winston';
import { logLevel } from '@common/config';

const logger = winston.createLogger({
    level: logLevel,
    format: winston.format.json(),
    transports: [new winston.transports.Console()],
});

export default logger;
