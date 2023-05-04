import express from 'express';

import logger from '@common/logger';
import { auth } from '@server/middleware/auth';
import {
    getList,
    getAllList,
    createList,
    editList,
    deleteList,
    addListItem,
    editListItem,
    deleteListItem,
} from '@server/handlers/list.handler';
import { sendErrorResponse } from '@server/utils/response';

const router: express.Router = express.Router();

router.post('/lists', auth, async (req, res) => {
    logger.info('create list');

    try {
        const { name } = req.body;
        const list = await createList(req.user, {
            name,
        });

        res.send({ list: list.toJSON() });
    } catch (e: unknown) {
        sendErrorResponse(res, e);
    }
});

router.post('/lists/:lid/items', auth, async (req, res) => {
    logger.info('create list item');

    try {
        const { title, details } = req.body;
        const list = await addListItem(req.user, req.params.lid, {
            title,
            details,
        });

        res.send({ list: list.toJSON() });
    } catch (e: unknown) {
        sendErrorResponse(res, e);
    }
});

router.patch('/lists/:lid', auth, async (req, res) => {
    logger.info('update list');

    try {
        const { name } = req.body;
        const list = await editList(req.user, req.params.lid, {
            name,
        });

        res.send({ list: list.toJSON() });
    } catch (e: unknown) {
        sendErrorResponse(res, e);
    }
});

router.patch('/lists/:lid/items/:iid', auth, async (req, res) => {
    logger.info('update list item');

    try {
        const { title, details } = req.body;

        const list = await editListItem(
            req.user,
            req.params.lid,
            req.params.iid,
            { title, details },
        );

        res.send({ list: list.toJSON() });
    } catch (e: unknown) {
        sendErrorResponse(res, e);
    }
});

router.delete('/lists/:lid', auth, async (req, res) => {
    logger.info('delete list');

    try {
        await deleteList(req.user, req.params.lid);

        res.send();
    } catch (e: unknown) {
        sendErrorResponse(res, e);
    }
});

router.delete('/lists/:lid/items/:iid', auth, async (req, res) => {
    logger.info('delete list item');

    try {
        await deleteListItem(req.user, req.params.lid, req.params.iid);

        res.send();
    } catch (e: unknown) {
        sendErrorResponse(res, e);
    }
});

router.get('/lists', auth, async (req, res) => {
    logger.info('get all lists');

    try {
        const lists = await getAllList(req.user);

        const data = lists?.map((list) => list.toJSON()) || [];

        res.send({ list: data });
    } catch (e: unknown) {
        sendErrorResponse(res, e);
    }
});

router.get('/list/:lid', auth, async (req, res) => {
    logger.info('get a single list');

    try {
        const list = await getList(req.user, req.params.lid);

        res.send({ list: list ? list.toJSON() : null });
    } catch (e: unknown) {
        sendErrorResponse(res, e);
    }
});

export default router;
