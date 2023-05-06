import React, { useCallback } from 'react';

import { logout } from 'api/toDoList';
import { useAppUpdater } from 'provider/hooks';
import { useAppState } from 'provider/hooks';

export const useLogout = () => {
    const { user } = useAppState();
    const dispatch = useAppUpdater();

    const handleLogout = useCallback(
        (e: React.MouseEvent<HTMLElement>) => {
            if (!user?.token) return;

            (async () => {
                try {
                    await logout(user.token);
                } catch (e) {
                    // TODO
                }
                dispatch({
                    type: 'SET_USER',
                    payload: null,
                });

                window.localStorage.removeItem('app-user');
            })();
        },
        [user, dispatch],
    );

    return {
        handleLogout,
    };
};
