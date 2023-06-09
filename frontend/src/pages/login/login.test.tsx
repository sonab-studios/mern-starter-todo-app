/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen, fireEvent, act } from '@testing-library/react';

import { Login } from 'pages/login/Login';
import * as api from 'api/toDoList';

afterEach(() => {
    jest.clearAllMocks();
});

test('renders login page', () => {
    render(<Login />);

    const button = screen.getByRole('button', { name: 'Login' });
    expect(button).toBeInTheDocument();

    const emailInput = screen.getByPlaceholderText('Email');
    const pwInput = screen.getByPlaceholderText('Password');

    expect(emailInput).toBeInTheDocument();
    expect(pwInput).toBeInTheDocument();
});

test('shows login error', async () => {
    render(<Login />);

    const button = screen.getByRole('button', { name: 'Login' });

    const emailInput = screen.getByPlaceholderText('Email') as HTMLInputElement;
    const pwInput = screen.getByPlaceholderText('Password') as HTMLInputElement;

    expect(emailInput.value).toBe('');
    expect(pwInput.value).toBe('');

    fireEvent.change(emailInput, { target: { value: 'foo.bar@test.com' } });
    fireEvent.change(pwInput, { target: { value: 'Password!23X' } });

    expect(emailInput.value).toBe('foo.bar@test.com');
    expect(pwInput.value).toBe('Password!23X');

    jest.spyOn(api, 'login').mockResolvedValue(null);
    await act(() => {
        fireEvent.click(button);
    });

    const error = screen.getByText('Invalid credentials!');
    expect(error).toBeInTheDocument();
});
