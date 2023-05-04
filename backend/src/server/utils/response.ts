import { Response } from 'express';

import {
    BAD_REQUEST,
    UNAUTHORIZED,
    FORBIDDEN,
    NOT_FOUND,
    INTERNAL_SERVER_ERROR,
} from '@common/consts';
import logger from '@common/logger';

export function sendErrorResponse(res: Response, e: unknown) {
    if (!(e instanceof Error)) {
        return res.status(INTERNAL_SERVER_ERROR).send();
    }

    logger.error(e.message);
    switch (e.message) {
        case 'User not found!':
        case 'List not found!':
        case 'List item not found!':
            return res.status(NOT_FOUND).send();
        case 'Incorrect password!':
            return res.status(UNAUTHORIZED).send();
        case 'Forbidden!':
            return res.status(FORBIDDEN).send();
        case 'Missing parameters!':
            return res.status(BAD_REQUEST).send();
        default:
            return res.status(INTERNAL_SERVER_ERROR).send();
    }
}
