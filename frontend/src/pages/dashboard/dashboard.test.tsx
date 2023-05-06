import React from 'react';
import { render, screen } from '@testing-library/react';
import { Dashboard } from 'pages/dashboard/Dashboard';

test('renders login page', () => {
    render(<Dashboard />);
    const loginElement = screen.getByText(/Dashboard/i);
    expect(loginElement).toBeInTheDocument();
});
