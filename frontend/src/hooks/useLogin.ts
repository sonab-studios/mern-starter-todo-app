import { useCallback } from 'react';

import { login } from 'api/toDoList';
import { useAppUpdater } from 'provider/hooks';

export const useLogin = () => {
    const dispatch = useAppUpdater();

    const handleLogin = useCallback(
        async (email: string, password: string) => {
            const data = await login(email, password);

            const token = data?.token || '';
            dispatch({
                type: 'SET_USER',
                payload: data ? { email, token } : null,
            });

            window.localStorage.setItem(
                `app-user`,
                JSON.stringify({ email, token }),
            );
            return !!data;
        },
        [dispatch],
    );

    return {
        handleLogin,
    };
};
