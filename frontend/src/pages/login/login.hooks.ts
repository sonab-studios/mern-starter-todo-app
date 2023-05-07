import React, { useState, useCallback } from 'react';

import { useLogin } from 'hooks/useLogin';

export const useLoginForm = () => {
    const { handleLogin: userLogin } = useLogin();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showErr, setShowErr] = useState(false);

    const handlePwChange = useCallback(
        ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(value);
            showErr && setShowErr(false);
        },
        [showErr, setShowErr, setPassword],
    );

    const handleEmailChange = useCallback(
        ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
            setEmail(value);
            showErr && setShowErr(false);
        },
        [showErr, setShowErr, setEmail],
    );

    const handleLogin = useCallback(async () => {
        const isAuth = await userLogin(email, password);
        !isAuth && setShowErr(true);
    }, [userLogin, setShowErr, email, password]);

    return {
        email,
        password,
        handleLogin,
        handlePwChange,
        handleEmailChange,
        showErr,
    };
};
