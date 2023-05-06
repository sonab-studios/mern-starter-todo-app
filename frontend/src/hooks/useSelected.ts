import { useCallback, useMemo } from 'react';

import { useAppUpdater } from 'provider/hooks';
import { useAppState } from 'provider/hooks';

export const useSelected = () => {
    const dispatch = useAppUpdater();
    const { lists, selectedId } = useAppState();

    const selected = useMemo(
        () => lists?.find((item) => item._id === selectedId),
        [lists, selectedId],
    );

    const reset = useCallback(() => {
        dispatch({ type: 'SET_SELECTED', payload: undefined });
    }, [dispatch])

    return {
        selected,
        reset,
    };
};
