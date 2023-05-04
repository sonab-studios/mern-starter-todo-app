import express from 'express';

import logger from '@common/logger';
import { UserModel } from '@db/types/user.types';
import { auth } from '@server/middleware/auth';
import { userLogin, userLogout } from '@server/handlers/user.handler';
import { sendErrorResponse } from '@server/utils/response';

const router: express.Router = express.Router();

router.post('/users/login', async (req, res) => {
    logger.info('login user');

    try {
        const { email, password } = req.body;
        const { user, token } = await userLogin(email, password);

        res.send({ user, token });
    } catch (e: unknown) {
        sendErrorResponse(res, e);
    }
});

router.post('/users/logout', auth, async (req, res) => {
    logger.info('logout user');

    try {
        await userLogout(req.user as UserModel, req.token);

        res.send();
    } catch (e: unknown) {
        sendErrorResponse(res, e);
    }
});

export default router;
