import mongoose from 'mongoose';

import { seedDbDefaultUsers } from './db/utils/seedDb';
import { dbUri } from './common/config';
import logger from './common/logger';

(async () => {
    try {
        console.log('db uri', dbUri);
        await mongoose.connect(dbUri);

        logger.info('successfully connected to database!');
        seedDbDefaultUsers();
    } catch (error) {
        console.log(error);
        logger.error('Failed to start server!');
    }
})();
