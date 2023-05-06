import { createContext, Dispatch } from 'react';

import { AppState, Action } from 'provider/types';

export const initState: AppState = {
    user: null,
    lists: [],
};

export const StateContext = createContext<AppState>(initState);
export const UpdaterContext = createContext<Dispatch<Action>>(() => {});