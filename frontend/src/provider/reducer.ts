import { AppState } from 'provider/types';
import { Action } from 'provider/types';

export const reducer = (state: AppState, action: Action): AppState => {
    const { payload, type } = action;
    switch (type) {
        case 'SET_USER':
            return { ...state, user: payload };
        case 'SET_LISTS':
            return { ...state, lists: payload };
        case 'SET_SELECTED':
            return { ...state, selectedId: payload };
    }
};
