import { Request, Response, NextFunction } from 'express';

import { UNAUTHORIZED } from '@common/consts';
import logger from '@common/logger';
import User from '@db/models/user.model';

export async function auth(req: Request, res: Response, next: NextFunction) {
    logger.info('Authenticating...');

    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) throw new Error();

        const user = await User.findUserByToken(token);
        if (!user) throw new Error();

        req.token = token;
        req.user = user;
        next();
    } catch (e) {
        res.status(UNAUTHORIZED).send({ error: 'Authentication failed!' });
    }
}
