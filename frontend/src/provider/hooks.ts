import { useCallback, useEffect, useReducer, useContext } from 'react';

import { addAuthorization } from 'api/toDoList';
import { reducer } from 'provider/reducer';
import { initState, StateContext, UpdaterContext } from 'provider/context';

import { getAllList } from 'api/toDoList';

export const useAppState = () => useContext(StateContext);
export const useAppUpdater = () => useContext(UpdaterContext);

export const useProvider = () => {
    const [state, dispatch] = useReducer(reducer, initState);

    const fetchLists = useCallback(async () => {
        const list = await getAllList();
        if (list.length > 0) {
            dispatch({ type: 'SET_LISTS', payload: list });
        }
    }, []);

    useEffect(() => {
        const user = window.localStorage.getItem('app-user');
        if (!user) return;

        const { email, token } = JSON.parse(user);
        if (email && token) {
            addAuthorization(token);

            dispatch({
                type: 'SET_USER',
                payload: { email, token },
            });
        }
    }, []);

    useEffect(() => {
        console.log('user updated', state.user);
    }, [state.user]);

    useEffect(() => {
        if (!state.user) return;
        
        (async () => {
            await fetchLists();
        })();
    }, [fetchLists, state.user]);

    useEffect(() => {
        if (!state.lists) return;

        if (state.lists.length > 0 && !state.selectedId) {
            dispatch({ type: 'SET_SELECTED', payload: state.lists[0]._id });
        }
    }, [state.lists, state.selectedId]);

    return {
        dispatch,
        state,
    };
};
