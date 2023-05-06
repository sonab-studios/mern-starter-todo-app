import React from 'react';
import { render, screen } from '@testing-library/react';
import { Login } from 'pages/login/Login';

test('renders login page', () => {
    render(<Login />);
    const loginElement = screen.getByText(/Login/i);
    expect(loginElement).toBeInTheDocument();
});
