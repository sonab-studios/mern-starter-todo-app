import React, { useState, useCallback } from 'react';

import { login } from 'api/toDoList';
import { useAppUpdater } from 'provider/hooks';

export const useLogin = () => {
    const dispatch = useAppUpdater();
    const [email, setEmail] = useState('foo.bar@test.com');
    const [password, setPassword] = useState('Password!23');
    const [showErr, setShowErr] = useState(false);

    const handleLogin = useCallback(
        (e: React.MouseEvent<HTMLElement>) => {
            console.log('handle login', email, password);
            (async () => {
                const data = await login(email, password);
                !data && setShowErr(true);

                const token = data?.token || '';
                dispatch({
                    type: 'SET_USER',
                    payload: data ? { email, token } : null,
                });

                window.localStorage.setItem(
                    `app-user`,
                    JSON.stringify({ email, token }),
                );
            })();
        },
        [dispatch, email, password, setShowErr],
    );

    const handlePwChange = useCallback(
        ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(value);
        },
        [setPassword],
    );

    const handleEmailChange = useCallback(
        ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
            setEmail(value);
        },
        [setEmail],
    );

    return {
        email,
        password,
        handleLogin,
        handlePwChange,
        handleEmailChange,
        showErr,
    };
};
