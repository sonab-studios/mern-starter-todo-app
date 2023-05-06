import { List } from 'api/todoList.types';

export type User = {
    email: string;
    token: string;
};

export type AppState = {
    user: User | null;
    lists?: List[];
    selectedId?: string | null;
};

export type Action =
    | { payload: User | null; type: 'SET_USER' }
    | { payload: List[]; type: 'SET_LISTS' }
    | { payload: string | undefined; type: 'SET_SELECTED' };
