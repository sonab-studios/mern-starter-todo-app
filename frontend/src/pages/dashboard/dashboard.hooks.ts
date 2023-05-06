import React, { useCallback } from 'react';
import { ButtonProps } from 'semantic-ui-react';
import { logout } from 'api/toDoList';
import { useAppUpdater } from 'provider/hooks';
import { useAppState } from 'provider/hooks';

export const useDashboard = () => {
    const { user, lists, selectedId } = useAppState();
    const dispatch = useAppUpdater();

    const handleLogout = useCallback(
        (e: React.MouseEvent<HTMLElement>) => {
            if (!user?.token) return;

            (async () => {
                await logout(user.token);

                dispatch({
                    type: 'SET_USER',
                    payload: null,
                });
            })();
        },
        [user, dispatch],
    );

    const handleSelect = useCallback(
        (e: React.MouseEvent<HTMLElement>, data: ButtonProps) => {
            const selected = lists?.find((item) => item._id === data.id);

            if (selected) {
                dispatch({
                    type: 'SET_SELECTED',
                    payload: selected._id,
                });
            }
        },
        [dispatch, lists],
    );

    return {
        handleLogout,
        handleSelect,
        lists,
        selectedId,
    };
};
