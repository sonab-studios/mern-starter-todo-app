import React from 'react';
import { Button, Icon, Input, Message } from 'semantic-ui-react';

import { useLoginForm } from 'pages/login/login.hooks';
import { Wrapper, FormWrapper } from 'pages/login/login.styles';

export const Login = () => {
    const {
        email,
        password,
        handleLogin,
        handlePwChange,
        handleEmailChange,
        showErr,
    } = useLoginForm();
    
    return (
        <Wrapper>
            <FormWrapper>
                <Input
                    value={email}
                    onChange={handleEmailChange}
                    placeholder='Email'
                    size='massive'
                />
                <Input
                    value={password}
                    onChange={handlePwChange}
                    placeholder='Password'
                    type='password'
                    size='massive'
                />
                <Button
                    onClick={handleLogin}
                    icon
                    labelPosition='right'
                    size='massive'
                >
                    Login
                    <Icon name='sign in' />
                </Button>
                {showErr ? (
                    <Message negative>
                        <p>Invalid credentials!</p>
                    </Message>
                ) : null}
            </FormWrapper>
        </Wrapper>
    );
};
