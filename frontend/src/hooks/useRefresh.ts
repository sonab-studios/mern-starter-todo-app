import { useCallback } from 'react';

import { useAppUpdater } from 'provider/hooks';
import { getAllList } from 'api/toDoList';

export const useRefresh = () => {
    const dispatch = useAppUpdater();

    const refresh = useCallback(async () => {
        const list = await getAllList();
        dispatch({ type: 'SET_LISTS', payload: list });
    }, [dispatch]);

    return {
        refresh,
    };
};
