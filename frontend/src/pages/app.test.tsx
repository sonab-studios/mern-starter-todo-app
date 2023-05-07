/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen, fireEvent, act } from '@testing-library/react';

import * as api from 'api/toDoList';
import { Provider } from 'provider/Provider';
import { App } from 'pages/App';

afterEach(() => {
    jest.clearAllMocks();
});

test('shows dashboard after login', async () => {
    render(
        <Provider>
            <App />
        </Provider>,
    );

    const button = screen.getByRole('button', { name: 'Login' });

    const emailInput = screen.getByPlaceholderText('Email') as HTMLInputElement;
    const pwInput = screen.getByPlaceholderText('Password') as HTMLInputElement;

    expect(emailInput.value).toBe('');
    expect(pwInput.value).toBe('');

    fireEvent.change(emailInput, { target: { value: 'foo.bar@test.com' } });
    fireEvent.change(pwInput, { target: { value: 'Password!23' } });

    expect(emailInput.value).toBe('foo.bar@test.com');
    expect(pwInput.value).toBe('Password!23');

    jest.spyOn(api, 'login').mockResolvedValue({
        token: 'some-token',
        user: { email: 'foo.bar@test.com', _id: 'some-id' },
    });

    jest.spyOn(api, 'getAllList').mockResolvedValue([]);

    await act(() => {
        fireEvent.click(button);
    });

    const error = screen.getByText('List App');
    expect(error).toBeInTheDocument();
});
