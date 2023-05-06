/* eslint-disable @typescript-eslint/no-namespace */
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import logger from '@common/logger';
import { dbUri, port } from '@common/config';
import userRouter from '@server/routers/user';
import listRouter from '@server/routers/list';

const app = express();

app.use(cors())
app.use(express.json());

app.use(userRouter);
app.use(listRouter);

export async function startServer() {
    try {
        await mongoose.connect(dbUri);
        logger.info('Successfully connected to database!');

        await app.listen(port);
        logger.info(`🚀 Server running on port ${port}`);
    } catch (error) {
        logger.error('Failed to start server!', error);
    }
}
