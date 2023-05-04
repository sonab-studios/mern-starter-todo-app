/* eslint-disable @typescript-eslint/no-namespace */
import { startServer } from '@server/start';
import { UserModel } from '@db/types/user.types';

declare global {
    namespace Express {
        interface Request {
            token: string;
            user: UserModel;
        }
    }
}

(async () => {
    startServer();
})();
